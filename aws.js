import * as lancedb from '@lancedb/lancedb';
import { LanceSchema } from '@lancedb/lancedb/embedding';
import { Utf8 } from 'apache-arrow';

const S3_PATH = "s3://<BUCKET_NAME>/test/coderabbit/data"

const main = async () => {
  console.log(`\nConnecting to lancedb s3 object store using path: ${S3_PATH}`)
  const db = await lancedb.connect(S3_PATH);

  const schema = LanceSchema({
    text: new Utf8()
  });

  const table = await db.createEmptyTable('test', schema, {
    storageOptions: {
      new_table_enable_v2_manifest_paths: "true"
    },
    mode: 'create',
    existOk: true,
  })

  await table.mergeInsert("text").whenNotMatchedInsertAll()
    .execute([{
      text: "Hello World"
    }])

  const data = await table.query().toArray()
  console.log("Table data: ", data)
}

const logAwsEnvVariables = () => {
  console.log("AWS related environment variables:");
  Object.keys(process.env)
    .filter(key => key.startsWith('AWS_'))
    .forEach(key => {
      console.log(`${key}=${process.env[key]}`);
    });
};

logAwsEnvVariables()
main().catch(console.error);
