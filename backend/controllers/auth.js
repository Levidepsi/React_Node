import User from "../models/user.js";
import { validationResult } from "express-validator"
import expressJwt from 'express-jwt'

import userToken from "../userToken.js";

export const signup = async(req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const userExist = await User.findOne({email: req.body.email})
  if(userExist) {
    res.status(403).json(({error: 'Email Already in use'}))
  }
  const user = await new User(req.body)

  await user.save()
  res.status(200).json({message: "Signup success. Please Login!"})
}

export const signin = async(req, res) => {
  const {email, password} = req.body
       
  const user = await User.findOne({email})
  console.log(user)

  if(user && (await user.matchPassword(password))) {
         res.json({
                _id: user._id,
                name: user.name,
                email: user.email, 
                token: userToken(user._id)
         })
  } else {
         res.status(401)
         throw new Error('Invalid email or password')
  }
  
   
}

export const signout = (req, res) => {
  res.cookie('userToken', '')
  return res.json({message: 'Signout success'})
}   

export const requireSignin =  expressJwt({
  secret: `${process.env.JWT_SECRET}`,
  algorithms: ['HS256'],
  userProperty: 'auth'
})
  