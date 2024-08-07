import express from 'express';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import cookieParser from 'cookie-parser';
// import cookieJwtAuth from "../../middleware/jwtAuth.js"


const userRouter = express.Router();

// verify token validity
userRouter.get('/token', async (req, res) => {
  //const token = req['Authorization']?.split(' ')[1] || '';
  const token = req.body.token;
  console.log(token);
  try{
    const decoded = jwt.verify(token, process.env.jwtSecret);
    res.status(200).send({data: decoded}); 
    res.json({ message: 'Token is valid' });
  }catch(e){
    res.status(401).json({ message: 'Token is not valid' });
  }
})


// new user when sign up
userRouter.post('/signup', async (request, response) => {
  try {
    const { name, password } = request.body;

    // Check if required fields are present
    if (!name || !password) {
      return response.status(400).json({
        message: 'Send all required fields: name and password',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return response.status(400).json({ message: 'Username is unavailable' });
    }

    // Create new user
    const newUser = await User.create({ name, password });

    return response.status(201).json("success");
  } catch (error) {
    console.error('Error in user signup:', error);
    return response.status(500).json({ message: 'Internal server error' });
  }
});

  // login user
  userRouter.post('/login', async (request, response) => {
    try {
      const { name, password } = request.body;
  
      // Check if required fields are present
      if (!name || !password) {
        return response.status(400).json({
          message: 'Send all required fields: name and password',
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ name, password });
      if (!existingUser) {
        return response.status(400).json({ message: 'User Not exists' });
      }
  
      // Create JWT
      const token = jwt.sign({ name: existingUser.name }, process.env.jwtSecret, { expiresIn: '2h' });
      console.log(token);

      response.cookie("userData", token); 

  
      // Set JWT as an HTTP-only cookie (before sending response)
      response.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {path:"/",  httpOnly: true, maxAge: 60 * 60 })
      );
  
      // Send successful login response
      return response.json("exist");
    } catch (error) {
      console.error('Error in user registration:', error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  });
  
  //get all league
  userRouter.get('/allUsers', async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({
        count: users.length,
        data: users});
    } catch (error) {
      console.error(error.message);
      res.status(500).send({massage:error.message});
    }
  });

  //get one book
  userRouter.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ message: 'user not found' });
      return res.status(200).send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });

// Route for Update a user
userRouter.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await User.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a user
userRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// userRouter.post("/",async(req,res)=>{
//   const {name,password} = req.body

//   try{
//       const check = await User.findOne({name:name})

//       if(check){
//           res.json("exist")
//       }
//       else{
//           res.json("notexist")
//       }

//   }
//   catch(e){
//       res.json("fail")
//   }

// })


userRouter.post("/signup",async(req,res)=>{
  const{name,password}=req.body

  const data={
      name:name,
      password:password
  }

  try{
      const check=await User.findOne({name:name})

      if(check){
          res.json("exist")
      }
      else{
          res.json("notexist")
          await collection.insertMany([data])
      }

  }
  catch(e){
      res.json("fail")
  }
a
})


export default userRouter;