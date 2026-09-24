const response = await fetch(
  `https://api.notion.com/v1/data_sources/${process.env.NOTION_DATABASE_ID}/query`,
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  }
);

if (!response.ok) {
  const error = await response.text();
  throw new Error(`Notion API error ${response.status}: ${error}`);
}

const data = await response.json();

console.log(`Found ${data.results.length} links`);

for (const page of data.results) {
  console.log(JSON.stringify(page, null, 2));
}