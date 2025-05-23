import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const construtoras = JSON.parse(data.construtora);
    if (!data.valorCd) {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/construtoras/${construtoras.id}`
      );
      const valorCd = await req.json().then((res) => {
        return res.valor_cert;
      });

      data.valorCd = valorCd;
    }

    const response = await fetch(
      "https://apinatoapp.redebrasilrp.com.br/cliente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    if (!response.ok) {
      throw new Error("Erro ao enviar o arquivo");
    }

    return NextResponse.json(
      { data: data, message: "Arquivo enviado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: error.status || 500 });
  }
}
