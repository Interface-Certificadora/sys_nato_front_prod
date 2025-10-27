import type { ConfigRoutes } from "@/types/route";
import { NextRequest } from "next/server";

/**
 * Cache de regex compiladas para melhor performance
 * Evita recompilar regex a cada requisição
 */
const regexCache = new Map<string, RegExp>();

/**
 * Converte uma rota com parâmetros dinâmicos em regex compilada
 * Exemplo: "/usuarios/:id" => /^\/usuarios\/[^/]+$/
 * @param route - Rota a ser convertida
 * @returns RegExp compilada e cacheada
 */
function routeToRegex(route: string): RegExp {
  if (regexCache.has(route)) {
    return regexCache.get(route)!;
  }

  // Substitui parâmetros dinâmicos (:param) por regex que aceita qualquer valor exceto /
  const pattern = `^${route.replace(/:\w+/g, "[^/]+")}$`;
  const regex = new RegExp(pattern);

  regexCache.set(route, regex);
  return regex;
}

/**
 * Verifica se o pathname corresponde a alguma das rotas fornecidas
 * @param routes - Array de rotas a verificar
 * @param pathname - Pathname da requisição
 * @returns true se houver correspondência
 */
function matchRoute(routes: string[], pathname: string): boolean {
  // Early return se não há rotas
  if (routes.length === 0) {
    return false;
  }

  // Primeiro verifica correspondência exata (mais rápido)
  if (routes.includes(pathname)) {
    return true;
  }

  // Depois verifica com regex (para rotas dinâmicas)
  return routes.some((route) => {
    // Se não tem parâmetro dinâmico e não é correspondência exata, pula
    if (!route.includes(":")) {
      return false;
    }

    const regex = routeToRegex(route);
    return regex.test(pathname);
  });
}

/**
 * Função responsável por fazer um match de rotas, retornando se a rota é pública, privada ou bloqueada
 *
 * Otimizada com:
 * - Cache de regex compiladas
 * - Verificação de correspondência exata antes de regex
 * - Early returns para melhor performance
 *
 * @param route - Configuração de rotas da aplicação
 * @param req - Requisição Next.js
 * @returns Objeto indicando o tipo de rota
 */
export const createRouteMatch = (
  route: ConfigRoutes,
  req: NextRequest
): {
  isBlockRoute: boolean;
  isPlublicRoute: boolean;
  isPrivateRoute: boolean;
} => {
  const { publicRoutes, privateRoutes, blockRoutes } = route;
  const pathname = req.nextUrl.pathname;

  return {
    isBlockRoute: matchRoute(blockRoutes, pathname),
    isPlublicRoute: matchRoute(publicRoutes, pathname),
    isPrivateRoute: matchRoute(privateRoutes, pathname),
  };
};
