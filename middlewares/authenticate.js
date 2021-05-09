const {verify} = require('../helpers/jwt.js')

function authenticate(req,res,next){
  try{
    const token = req.headers.access_token
    const decode = verify(token, process.env.JWT_SECRET)

    req.client = decode
    console.log(req.client)

    next()
  } catch(err){
    next(err)
  }
}

module.exports = authenticate