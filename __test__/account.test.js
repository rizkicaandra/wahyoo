const request = require('supertest');
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Client, Account, sequelize } = require('../models/index')

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
      sequelize.close()
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe('GET /account', function(){
  it('return status 200 with balance data', function(done){

    request(app)
    .get('/account')
    .set('access_token', access_token)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('balance')
      expect(typeof res.body).toEqual('object')
      expect(typeof res.body.balance).toEqual('number')
      done()
    })
  }),
  it('Access account without login, return status 401', function(done){

    request(app)
    .get('/account')
    // .set('access_token', access_token)
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