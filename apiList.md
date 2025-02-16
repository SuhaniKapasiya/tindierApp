# TinderApp APIs
## authRoute
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password api

## connectionRequestRouter
- POST /request/send/intersted/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/request/received
- GET /user/feed -Gets you the profiles pf other users on platform


status: ignore,interested,accepeted,rejected




