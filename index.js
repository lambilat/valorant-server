
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

console.log("Welcome")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");



app.use('*', (req, res) => {
  (async () => {
    console.log("Trying to Connect AWS Database.")
    const client = new DynamoDBClient({ region: "ap-southeast-1" });
    const command = new ListTablesCommand({});
    try {
      console.log("AWS Database Connected.")
      const results = await client.send(command);
      console.log(results.TableNames.join("\n"));
      res.json({ msg: results.TableNames.join("\n") }).end()
    } catch (err) {
      console.log("AWS Database Failed.")
      console.error(err);
    }
  })();

})



app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
