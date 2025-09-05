import * as lancedb from "@lancedb/lancedb";

const S3_PATH = "s3://<BUCKET_NAME>/coderabbit/data/kb";

const main = async () => {
  console.log(`\nConnecting to lancedb s3 object store using path: ${S3_PATH}`);
  const db = await lancedb.connect(S3_PATH);

  const tables = await db.tableNames();

  if (tables.length === 0) {
    console.log("No tables found");
    return;
  }

  for (const table of tables) {
    console.log(`Table: ${table}`);

    if (!table.startsWith("learning")) {
      continue;
    }

    console.log(`-----Learnings table found: ${table} -----`);

    const tbl = await db.openTable(table);
    const data = await tbl.query().limit(10).toArray();

    console.log("Data", data);
  }
};

main().catch(console.error);
