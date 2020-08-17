const https = require('https')
const CURRENCY_ENDPOINT = `https://api.ratesapi.io/api/latest`

exports.getAll = async function (req, res) {
  try {
    const result = await getCurrency()
    res.status(400).json({ result })
  } catch (err) {
    res
      .status(500)
      .json({ message: `There was an error at processQuery: ${err.stack}` })
  }
}

exports.getCurrencyByCountry = async function (req, res) {
  try {
    let { country } = req.params
    let baseQuery = req.query.base

    // check if country exists
    if (country === undefined) {
      res.status(404).send('Missing country')
      return
    }
    country = country.trim().toUpperCase()

    // get rates from country
    let result = await getCurrency(
      baseQuery !== undefined ? `?base=${baseQuery.trim().toUpperCase()}` : ''
    )
    let { base, rates } = result

    // filter rates
    if (rates) {
      rates = rates[country]
    } else {
      res.status(404).send('Invalid Params')
      return
    }

    res.status(200).json({ base, country, rates })
  } catch (err) {
    res
      .status(500)
      .json({ message: `There was an error at processQuery: ${err.stack}` })
  }
}

const getCurrency = (param = '') => {
  return new Promise((resolve, reject) => {
    https
      .get(CURRENCY_ENDPOINT + param, resp => {
        let data = ''

        resp.on('data', chunk => {
          data += chunk
        })

        resp.on('end', () => {
          try {
            const result = JSON.parse(data)
            resolve(result)
          } catch (err) {
            reject(err)
          }
        })
      })
      .on('error', err => {
        reject('Error: ' + err.message)
      })
  })
}
