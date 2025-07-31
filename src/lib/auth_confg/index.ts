import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const auth: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "123 de olivera 4"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          const dados = {
            username: credentials.email,
            password: credentials.password
          };
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth`,
            {
              method: "POST",
              body: JSON.stringify(dados),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );

          const retorno = await res.json();

          const { token, user } = retorno;

          const {
            id,
            nome,
            construtora,
            telefone,
            empreendimento,
            hierarquia,
            cargo,
            reset_password,
            Financeira,
            termos
          } = await user;

          const response = {
            jwt: token,
            id: id,
            name: nome,
            construtora: construtora,
            telefone: telefone,
            empreendimento: empreendimento,
            hierarquia: hierarquia,
            cargo: cargo,
            reset_password: reset_password,
            Financeira: Financeira,
            termos: termos
          };
          // console.log(response);

          if (!token || !id || !nome) {
            throw new Error("Usuário e senha incorreto");
            return null;
          }
          return response;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout"
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60 // 3 hours
  },
  callbacks: {
    jwt: async ({
      token,
      user
    }: {
      token: JWT;
      user: any;
    }): Promise<any | null> => {
      const isSignIn = !!user;

      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = 3 * 60 * 60; // 4 hours
      const dateExpirationInSeconds =
        actualDateInSeconds + tokenExpirationInSeconds;

      if (isSignIn) {
        if (!user?.jwt || !user?.id || !user?.name) {
          return null;
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.construtora = user.construtora;
        token.telefone = user.telefone;
        token.empreendimento = user.empreendimento;
        token.hierarquia = user.hierarquia;
        token.cargo = user.cargo;
        token.reset_password = user.reset_password;
        token.Financeira = user.Financeira;
        token.termos = user.termos;

        token.expiration = dateExpirationInSeconds;
      } else {
        if (!token?.expiration) {
          return null;
        }
      }

      return token as unknown as JWT;
    },
    session: async ({
      session,
      token
    }: {
      session: any;
      token: JWT;
    }): Promise<any | null> => {
      if (!token?.jwt || !token?.id || !token?.name || !token?.expiration) {
        return null;
      }

      session.user = {
        id: token.id as number,
        name: token.name as string,
        construtora: token.construtora as any[],
        telefone: token.telefone as string,
        empreendimento: token.empreendimento as any[],
        hierarquia: token.hierarquia as string,
        cargo: token.cargo as string,
        reset_password: token.reset_password as boolean,
        Financeira: token.Financeira as any[],
        termos: token.termos as boolean
      };

      session.token = token.jwt as string;
      session.expiration = token.expiration as number;
      return session;
    }
  }
};
