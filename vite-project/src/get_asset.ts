const api_url = "https://canva-api-dev-gomes.xiclet.com.br/api/assets/1";

export async function getAsset() {
  const req = await fetch(api_url, {
    method: "GET",
    headers: {
      Authorization: "Bearer RFNGR2RmZzkzNDVuZXJlcnQ=",
    },
  });

  const res = await req.json();

  return res;
}
