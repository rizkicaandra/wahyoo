const { Client, Account, Transaction } = require('../models/index')

class TransactionController{

  static deposit(req, res, next) {
    let { amount } = req.body
    let { ClientId, AccountId } = req.client
    let updateBalance = 0

    Account.findOne({
      where:{
        id: AccountId
      }
    })
    .then( accountData => {
      updateBalance = Number(accountData.balance) + Number(amount)

      return Account.update({ balance: updateBalance},{
        where:{
          id: AccountId
        },
        returning: true
      },)
    })
    .then( updatedAccount => {
      return Transaction.create({
        category: 'Deposit',
        amount,
        balanceHistory: updatedAccount[1][0].balance,
        ClientId,
        AccountId
      })
    })
    .then( transactionData => {
      res.status(201).json({ 
        message: "Deposit success",
        Balance: transactionData.balanceHistory
      })
    })
    .catch( err => {
      err.from = 'TransactionController - deposit'
			next(err)
    })
  }

  static withdraw(req, res, next) {
    let { amount } = req.body
    let { ClientId, AccountId } = req.client
    let updateBalance = 0

    Account.findOne({
      where:{
        id: AccountId
      }
    })
    .then( accountData => {
      if( accountData.balance < amount ){
        throw { name: 'Custom', message: 'Balance is not enough', statusCode: 400 }
      }
      
      updateBalance = Number(accountData.balance) - Number(amount)

      return Account.update({ balance: updateBalance},{
        where:{
          id: AccountId
        },
        returning: true
      },)
    })
    .then( updatedAccount => {

      return Transaction.create({
        category: 'Withdraw',
        amount,
        balanceHistory: updatedAccount[1][0].balance,
        ClientId,
        AccountId
      })
    })
    .then( transactionData => {
      res.status(201).json({
        message: "Withdraw success",
        Balance: transactionData.balanceHistory
      })
    })
    .catch( err => {
      err.from = 'TransactionController - withdraw'
			next(err)
    })
  }

  static showTransactions(req, res, next){

    let { ClientId, AccountId } = req.client
    console.log(req.client);
    Transaction.findAll({
      where:{
       ClientId,
       AccountId
      }
    })
    .then( transactionData => {
      res.status(200).json({ transactionData })
    })
    .catch( err => {
      err.from = 'TransactionController - showTransactions'
			next(err)
    })
  }
}

module.exports = TransactionController