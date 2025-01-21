import { auth } from "@/lib/auth_confg";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CADASTRO DE USUÁRIO",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(auth);
    if (session?.user.hierarquia !== "ADM") {
      redirect("/");
    }
  return <>{children}</>;
}
