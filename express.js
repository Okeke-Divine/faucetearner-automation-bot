const express = require("express")
const { mineLogic } = require("./mineLogic")

const app = express()

const PORT = process.env.PORT || 4000

app.get("/", (req,res) => {
  mineLogic(res)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})