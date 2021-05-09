const router = require('express').Router()
const ClientController = require('../controllers/clientController')
const AccountController = require('../controllers/accountController')
const TransactionController = require('../controllers/transactionController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.post('/signup', ClientController.signup)
router.post('/login', ClientController.login)
router.use(authenticate)
router.get('/account', AccountController.checkBalance)
router.use(authorize)
router.get('/transactions', TransactionController.showTransactions)
router.post('/transactions/deposit', TransactionController.deposit)
router.post('/transactions/withdraw', TransactionController.withdraw)

module.exports = router