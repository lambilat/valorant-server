
//require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

(async () => {
  const client = new DynamoDBClient({
    region: "ap-southeast-1",
    credentials:{
            accessKeyId: "AKIASVJKYFN7CQ6OVI4V",
            secretAccessKey: "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"
        }
   });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log(results.TableNames.join("\n"));
  } catch (err) {
    console.error(err);
  }
})();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('*', (req, res) => {
  res.json({ msg: 'WELCOME!' }).end()
})


app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
