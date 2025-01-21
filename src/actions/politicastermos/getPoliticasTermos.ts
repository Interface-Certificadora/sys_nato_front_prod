export default async function getLastPoliticaTermo() {

    return await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/get-infos/termos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())

}
