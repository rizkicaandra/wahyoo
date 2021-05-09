const { Client, Account } = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class ClientController{

  static signup(req, res, next) {

    let { email, password } = req.body
    let startBalance = 500000
    let newClient = {}

    Client.create({ email, password })
    .then( client => {
      newClient.id = client.id
      newClient.email = client.email
      return Account.create({ balance: startBalance, ClientId: client.id})
    })
    .then( account => {
      newClient.balance = account.balance
      res.status(201).json(newClient)
    })
    .catch( err => {
      err.from = "Client Controller - Sign up"
      next(err)
    })
  }

  static login(req, res, next){

    let { email, password } = req.body
    let token = {}

    Client.findOne({
      where:{
        email
      }
    })
    .then( client => {
      if(!client) 
        throw { name: 'Custom', message: 'Invalid Email or Password', statusCode: 400 }
      const comparedPass = comparePassword(password, client.password)
      if(!comparedPass) 
        throw { name: 'Custom', message: 'Invalid Email or Password', statusCode: 400 }
      token.ClientId = client.id
      token.email = client.email
      return Account.findOne({
        where:{
          ClientId: client.id
        }
      })
    })
    .then( accountData => {
      token.AccountId = accountData.id
      const access_token = generateToken(token)
      res.status(200).json({ access_token })
    })
    .catch(err => {
      err.from = "Client Controller - login"
      next(err)
    })
  }
}

module.exports = ClientController