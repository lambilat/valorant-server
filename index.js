
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

function backup(){
  (async () => {
    const client = new DynamoDBClient({
      region: process.env.MY_REGION,
      credentials:{
              accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
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
}





app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('*', (req, res) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  console.log(today.toUTCString());
  res.json({ msg: 'WELCOME!' }).end()
})


app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
