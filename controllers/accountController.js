const { Account, Client } = require('../models/index')

class AccountController{

  static checkBalance(req, res, next) {

    let { ClientId } = req.client

    Account.findOne({
      where:{
        ClientId
      },
      include:[{
        model: Client
      }]
    })
    .then( account => {
      res.status(200).json({ balance: account.balance })
    })
    .catch( err => {
      console.log(err, '<<<<<<<< ini pelakunya bisa gagal')
      err.from = "Account Controller - CheckBalance"
      next(err)
    })
  }
}

module.exports = AccountController