const { Client } = require('../models/index')

function authorize(req, res, next){

  try{
    Client.findOne({
      where:{
        id: req.client.ClientId
      }
    })
    .then( clientData => {
      if(clientData){
        next()
      } else {
        throw {
          name : 'Custom',
          message : 'Not Authorized',
          statusCode : 401
        }
      } 
    })
    .catch( err => {
      err.from = 'Authorize'
			next(err)
    })
  }catch(err){
    next(err)
  }
}

module.exports = authorize