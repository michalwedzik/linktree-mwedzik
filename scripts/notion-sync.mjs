const databaseResponse = await fetch(
  `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`,
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2025-09-03"
    }
  }
);

if (!databaseResponse.ok) {
  const error = await databaseResponse.text();
  throw new Error(
    `Notion database API error ${databaseResponse.status}: ${error}`
  );
}

const database = await databaseResponse.json();

console.log("Database:", database.id);
console.log("Data sources:", database.data_sources);

const dataSourceId = database.data_sources[0].id;

const response = await fetch(
  `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
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