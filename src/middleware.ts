import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./constants/app-routes";
import { createRouteMatch } from "./lib/route";

export async function middleware(req: NextRequest) {
  const cookiesAll = req.cookies.getAll();
  const filtro = cookiesAll.filter((cookie) =>
    cookie.name.includes("next-auth.session-token")
  );
  const session = filtro[0]?.value;

  const { pathname } = req.nextUrl;

  const { isPlublicRoute, isPrivateRoute, isBlockRoute } = createRouteMatch(
    APP_ROUTES,
    req
  );

  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPrivateRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    if (isBlockRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (isPlublicRoute) {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: "/((?!_next|favicon.ico|public|.*\\..*).*)"
};
