const express = require('express')
const router = require('express').Router()
const currencyRouter = require('./routes/currency-route')
const PORT = process.env.PORT || 3000

const app = express()

app.use('/', currencyRouter)
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`)
})
