const router = require('express').Router()

const currency = require('./../controllers/currency-controller')

router.get('/all', currency.getAll)
router.get('/:country', currency.getCurrencyByCountry)

module.exports = router
