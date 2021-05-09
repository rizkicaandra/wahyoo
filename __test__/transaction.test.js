const request = require('supertest');
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Client, Account, Transaction, sequelize } = require('../models/index')

let access_token = ''
let ClientId = 0
let AccountId = 0

beforeAll((done) => {
  let email = 'eky@mail.com'
  let password = '1234567'

  Client.create({ email, password })
    .then( client => {
      return Account.create({ balance: 500000, ClientId: client.id})
    })
    .then( account => {
      console.log(account,"ini accountnya WOI")
      ClientId = account.ClientId
      AccountId = account.id
      access_token = generateToken({
        ClientId,
        email,
        AccountId
      })
      done()
    })
    .catch( err => {
      done(err)
    })
})

afterAll((done) => {
  Client.destroy({ where: {} })
    .then(data => {
      return Account.destroy({ where: {}})
    })
    .then(data => {
      return Transaction.destroy({ where: {}})
    })
    .then(data => {
      sequelize.close()
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe('POST /transaction/deposit', function(){
  it('return status 201 with object data', function(done){
    
    const body = {
      amount: "100000"
    }

    request(app)
    .post('/transactions/deposit')
    .set('access_token',access_token)
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('Balance')

      expect(typeof res.body).toEqual('object')
      expect(typeof res.body.message).toEqual('string')
      expect(typeof res.body.Balance).toEqual('number')
      done()
    })
  }),
  it('return status 401 when deposit money without access token', function(done){

    const body = {
      amount: "100000"
    }
  
    request(app)
      .post('/transactions/deposit')
      // .set('access_token',access_token)
      .send(body)
      .end((err, res) => {
        if(err){
          done(err)
        }
  
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
    }),
  it('return status 400 when deposit money but required field is not inputed', function(done){

    const body = {
      amount: ""
    }
  
    request(app)
    .post('/transactions/deposit')
    .set('access_token',access_token)
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }
  
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(Array.isArray(res.body.message)).toEqual(true)
      done()
    })
  })
})

describe('POST /transaction/withdraw', function(){
  it('return status 201 with object data', function(done){
    
    const body = {
      amount: "100000"
    }

    request(app)
    .post('/transactions/withdraw')
    .set('access_token',access_token)
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('Balance')

      expect(typeof res.body).toEqual('object')
      expect(typeof res.body.message).toEqual('string')
      expect(typeof res.body.Balance).toEqual('number')
      done()
    })
  }),
  it('return status 401 when withdraw money without access token', function(done){

    const body = {
      amount: "100000"
    }
  
    request(app)
      .post('/transactions/withdraw')
      // .set('access_token',access_token)
      .send(body)
      .end((err, res) => {
        if(err){
          done(err)
        }
  
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
    }),
  it('return status 400 when withdraw money but required field is not inputed', function(done){

    const body = {
      amount: ""
    }
  
    request(app)
    .post('/transactions/withdraw')
    .set('access_token',access_token)
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }
  
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(Array.isArray(res.body.message)).toEqual(true)
      done()
    })
  })
})

describe('GET /transactions', function(){
  it('return status 201 with object data', function(done){
    
    const body = {
      amount: "100000"
    }

    request(app)
    .get('/transactions/')
    .set('access_token',access_token)
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('transactionData')

      expect(Array.isArray(res.body.transactionData)).toEqual(true)
      expect(res.body.transactionData[0]).toHaveProperty('category')
      expect(res.body.transactionData[0]).toHaveProperty('amount')
      expect(res.body.transactionData[0]).toHaveProperty('balanceHistory')
      expect(res.body.transactionData[0]).toHaveProperty('ClientId')
      expect(res.body.transactionData[0]).toHaveProperty('AccountId')
      expect(res.body.transactionData[0]).toHaveProperty('createdAt')
      expect(res.body.transactionData[0]).toHaveProperty('updatedAt')
      done()
    })
  }),
  it('return status 401 when display transaction data without access token', function(done){

    const body = {
      amount: "100000"
    }
  
    request(app)
      .post('/transactions')
      // .set('access_token',access_token)
      .send(body)
      .end((err, res) => {
        if(err){
          done(err)
        }
  
        expect(res.status).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
    })
})
