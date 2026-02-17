export async function POST(req) {
  const { message } = await req.json();

  const response = await fetch(
    `${process.env.DATABRICKS_HOST}/serving-endpoints/${process.env.DATABRICKS_ENDPOINT}/invocations`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DATABRICKS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataframe_split: {
          columns: ["question"],
          data: [[message]]
        }
      }),
    }
  );

  const data = await response.json();

  return Response.json({
    answer: data?.predictions?.[0]?.answer || "No answer returned"
  });
}