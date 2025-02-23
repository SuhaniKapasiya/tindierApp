
- JS object vs JSON(difference)
- add the express.json middleware to your app 
- Make your signup API dynamic to recive data form the end user
- user.findOne with duplicate email Ida , which  object  returned 
- API - get user by email
- APi - Feed API -GET/feed -get all the users from the databse 
- Create Delete User API   
- Difference between PATCH and PUT
- API - Update USER  
- Explore Mongoose Documention for Model methods 
- what are option in a Model findOneAndUpdate method , explore more it 
- API - Update the User  with emailId 


- Explore schematype options from the documention
- add required, unique , lowercase, min, minlength ,trim
- Add default
- Create custom validation funtion for gender
- Improve the DB schema - PUT all appropriate validation on each field in Schema
- Add timestamps to the userschema
- Add API level validation on Patch req & Signup post api
- DATA Sanitizing - Add API validation for each field 
- Install validator
- Explore validator Libary funtion and use validator funcs for password ,email,photoURL
- NEVER TRUST req.body

- Validate data in Signup API using helper fun
- Install bcrypt package
- Create PasswordHash using bcryp.hash & save user is  encrypted password 
- Create login API
- Compare password and throw errors if email or password is invalid 


- Install cookie-parser
- just send dummy cookie to user
- create GER /profile API and check if you get the cookie back
- Install Jsonwebtoken
- In login API,after email and password validation,create a JWT token and send user in  cookie
- read the cookie inside your profile API and find the looged in user
- userAuth Middleware
- Add the userAuth middleware in profile API and a sendConnectionreq API
- Set the expiry od JWT token and cookies to 7 days 
- Create user Schema methos  to getJWR()
- Create user Schema methos  to comparepassword(passwordInputByUser)

- Explore tinder APIs
- Explore Data inside tinder api
- create api a List all API can think of in Dev TInder
- Group multiple routes unser respective router 
- Read documentaion for express.Router
- Create routes folder for managing auth ,profile, request roters
- Create authRouter,profileRouter,request
- Import these routers in app.js 
- Create POST/logout API
- Create PATCH /profile/edit
- Create PATCH  /profile/password API => forgot password API
- Make sure you validate all data in every POST , PATCH apis

- Create Connection request Schema
- Send Connection Request API
- Proper validation of Data 
- Think about all corner cases 
- $or query $and query in mongoose
- Schema.pre("save") funtion
- Read more about indexes in MongoDB
- why do we need index in DB?
- What is the advantages and disadvantages of creating index?
- Read this artical about compound index => On mongodb Website
- why we should not create lots of indexes in db  
- ALways Think about CORNER CASES


- Write code with proper validations for POST /request/review/:status/:requestId