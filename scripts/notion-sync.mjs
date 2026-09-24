const databaseUrl =
  `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`;

console.log("Database ID:", process.env.NOTION_DATABASE_ID);
console.log("Database URL:", databaseUrl);

const databaseResponse = await fetch(databaseUrl, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
    "Notion-Version": "2025-09-03"
  }
});

console.log("Database response status:", databaseResponse.status);

if (!databaseResponse.ok) {
  const error = await databaseResponse.text();
  console.error("Database response:", error);

  throw new Error(
    `Notion database API error ${databaseResponse.status}: ${error}`
  );
}

const database = await databaseResponse.json();

console.log("Database:", database.id);
console.log("Data sources:", JSON.stringify(database.data_sources, null, 2));

const dataSourceId = database.data_sources[0].id;

const queryUrl =
  `https://api.notion.com/v1/data_sources/${dataSourceId}/query`;

console.log("Data source ID:", dataSourceId);
console.log("Query URL:", queryUrl);

const response = await fetch(queryUrl, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
    "Notion-Version": "2025-09-03",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({})
});

console.log("Query response status:", response.status);

if (!response.ok) {
  const error = await response.text();
  console.error("Query response:", error);

  throw new Error(`Notion API error ${response.status}: ${error}`);
}

const data = await response.json();

console.log(`Found ${data.results.length} links`);

for (const page of data.results) {
  console.log(JSON.stringify(page, null, 2));
}