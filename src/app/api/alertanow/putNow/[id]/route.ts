import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await request.json();

        
        const req = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/now/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if(!req.ok){
                throw new Error("Erro ao criar alerta!")
            }
            const retorno = await req.json();

            return  NextResponse.json(
                {
                    message: "Alerta criado com sucesso",
                    data: { response: retorno.data },
                },
                { status: 200 }
            );
            
    } catch (err) {
        console.error(err)
        throw new Error("Erro ao criar alerta!")
       }
    
}