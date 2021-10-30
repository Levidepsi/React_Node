// export const createPostValidator  = (req, res, next) => {
//   // title
//    req.check('title', 'Write a title').notEmpty()
//    req.check('title', 'Title must be 4 between 4 to 150 characters ').isLength({
//       min:4,
//       max: 150
//     })
//     // body
//    req.check('body', 'Write a body').notEmpty()
//    req.check('title', 'body must be 4 between 4 to 2000 characters ').isLength({
//       min:4,
//       max: 2000
//     })
//     // checkerrors
//     const errors = req.validationErrors()
//     // if error show the frist one as they happen
//     if(errors){
//       const firstError = errors.map(error => error.message)[0]
//       return res.status(404).json({error: firstError})
//     }
//     next()
// }
