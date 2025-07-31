import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./constants/app-routes";
import { createRouteMatch } from "./lib/route";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token")?.value;
  const { pathname } = req.nextUrl;

  // Redirecionamento de /home para /
  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const { isPlublicRoute, isPrivateRoute, isBlockRoute } = createRouteMatch(
    APP_ROUTES,
    req
  );

  // Se não tem sessão
  if (!session) {
    // Permite acesso a rotas públicas
    if (isPlublicRoute) {
      return NextResponse.next();
    }
    // Redireciona para login se tentar acessar rota privada ou bloqueada
    if (isPrivateRoute || isBlockRoute || pathname === "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Se tem sessão, permite acesso
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico|public|.*\\..*).*)"
};
