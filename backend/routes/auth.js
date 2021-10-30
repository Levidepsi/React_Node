import express from 'express'
import { check } from 'express-validator'
import { signup, signin, signout,  } from '../controllers/auth.js'



const router = express.Router()

router.post('/signup',[
  check('name', "Name is required").notEmpty(),
  check('email', "Email must be 3 to 32 characters")
  .matches(/.+\@.+\..+/)
  .withMessage("Email must be contain @")
  .isLength({
    min: 4, max: 2000
  }),
  check('password', "Password is required").notEmpty(),
  check('password').isLength({min: 6}).withMessage('Password must contain atleast 6 characters').matches(/\d/),
], signup)

router.post('/signin', signin )

router.get('/signout', signout )



export default router