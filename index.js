
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

console.log("Welcome")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

(async () => {
  console.log("Trying to Connect AWS Database.")
  const client = new DynamoDBClient({ region: "ap-southeast-1" });
  const command = new ListTablesCommand({});
  try {
    console.log("AWS Database Connected.")
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.log("AWS Database Failed.")
    console.error(err);
  }
})();



app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
