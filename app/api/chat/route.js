export async function POST(req) {
  const body = await req.json();

  const response = await fetch(process.env.DATABRICKS_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DATABRICKS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: body.message
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}