import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./constants/app-routes";
import { createRouteMatch } from "./lib/route";

/**
 * Obtém o token de sessão dos cookies
 * Suporta ambientes de desenvolvimento (http) e produção (https)
 */
function getSessionToken(req: NextRequest): string | undefined {
  return (
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value
  );
}

/**
 * Middleware de autenticação e roteamento
 *
 * Responsável por:
 * - Validar sessões de usuário
 * - Redirecionar usuários não autenticados
 * - Bloquear rotas depreciadas
 * - Gerenciar acesso a rotas públicas/privadas
 *
 * Otimizado com:
 * - Edge Runtime para melhor performance
 * - Early returns para reduzir processamento
 * - Cache de verificação de rotas (via createRouteMatch)
 * - Suporte a ambientes http/https
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Early return: Redireciona /home para / (rota depreciada)
  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Obtém token de sessão
  const sessionToken = getSessionToken(req);
  const hasSession = !!sessionToken;

  // Verifica tipo de rota
  const { isPlublicRoute, isPrivateRoute, isBlockRoute } = createRouteMatch(
    APP_ROUTES,
    req
  );

  // Bloqueia rotas depreciadas independente de autenticação
  if (isBlockRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se tem sessão, permite acesso a todas as rotas (exceto bloqueadas)
  if (hasSession) {
    return NextResponse.next();
  }

  // Se não tem sessão e é rota pública, permite acesso
  if (isPlublicRoute) {
    return NextResponse.next();
  }

  // Se não tem sessão e tenta acessar rota privada ou raiz, redireciona para login
  if (isPrivateRoute || pathname === "/") {
    const loginUrl = new URL("/login", req.url);
    // Adiciona pathname como query param para redirecionar após login (opcional)
    if (pathname !== "/") {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Fallback: permite acesso (para rotas não mapeadas)
  return NextResponse.next();
}

/**
 * Configuração do matcher do middleware
 * - Ignora arquivos estáticos (_next, favicon, etc)
 * - Ignora arquivos com extensão (js, css, images, etc)
 * - Processa todas as outras rotas
 */
export const config = {
  matcher: "/((?!_next|favicon.ico|public|.*\\..*).*)"
};

/**
 * Usa Edge Runtime para melhor performance
 * O middleware será executado no Edge, mais próximo do usuário
 */
// export const runtime = "edge";
