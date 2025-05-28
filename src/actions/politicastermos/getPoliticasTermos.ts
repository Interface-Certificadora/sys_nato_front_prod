'use server'
export default async function getLastPoliticaTermo() {

    return await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/get-infos/termos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 10
        }
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error("Erro ao buscar políticas de termos:", error);
            return null;
        });
}
