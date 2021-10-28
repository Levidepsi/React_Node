import User from "../models/user.js";

export const userById = (req, res, id, next) => {
    User.findById(id).exec((err, user) => {
      if(err || !user) {
        return res.status(400).json({
          error: 'User not Found'
        })
      }
      req.profile = user
      next()
    })
}

export const hasAuthorization = (req, res, next) => {
  const authorized= req.profile && req.auth && req.profile._id === req.auth._id

  if(!authorized) {
    return res.status(403).json({
      message: 'User is not authorized to perfom this action'
    })
  }
}