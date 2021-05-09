if(process.env.NODE_ENV != 'production')
  require('dotenv').config()
const request = require('supertest');
const app = require('../app')
const { Client, Account, sequelize } = require('../models/index')

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

describe('POST /signup', function(){
  it('return status 201 with data ', function(done){

    let body = {
      email : 'eky@mail.com',
      password : '1234567',
    }

    request(app)
    .post('/signup')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('email')
      expect(res.body).toHaveProperty('balance')
      expect(typeof res.body.id).toEqual('number')
      expect(typeof res.body.email).toEqual('string')
      expect(typeof res.body.balance).toEqual('number')
      done()
    })
  })

  it('return status 400 when password is less than 6 character', function(done){

    let body = {
      email: 'admin@mail.com',
      password: '54321',
    }

    request(app)
    .post('/signup')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('object')
      done()
    })
  })

  it('return status 400 when email is registered', function(done){

    let body = {
      email: 'eky@mail.com',
      password: '1234567',
    }

    request(app)
    .post('/signup')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('string')
      done()
    })
  })
  
  it('return status 400 when email and password are not filled', function(done){

    let body = {
      email: '',
      password: '',
    }

    request(app)
    .post('/signup')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('object')
      done()
    })
  })
})

describe('POST /login', function(){
  it('return status 200 with access_token', function(done){

    let body = {
      email : 'eky@mail.com',
      password : '1234567',
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('access_token')
      expect(typeof res.body.access_token).toEqual('string')
      done()
    })
  })

  it('return status 400 when password is wrong', function(done){

    let body = {
      email: 'eky@mail.com',
      password: '7654321',
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('string')
      done()
    })
  })

  it('return status 400 when email is not registered', function(done){

    let body = {
      email: 'asd@mail.com',
      password: '1234567',
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('string')
      done()
    })
  })
  
  it('return status 400 when email and password are not filled', function(done){

    let body = {
      email: '',
      password: '',
    }

    request(app)
    .post('/login')
    .send(body)
    .end((err, res) => {
      if(err){
        done(err)
      }

      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message')
      expect(typeof res.body.message).toEqual('string')
      done()
    })
  })
})