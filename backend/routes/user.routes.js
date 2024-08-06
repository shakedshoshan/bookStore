import express from 'express';
import { User } from '../models/userModel.js';

const userRouter = express.Router();


// new user when sign up
userRouter.post('/', async (request, response) => {
  const check=await User.findOne({name:request.body.name})
  
    try {
      if(!check){
        response.json("exist")
        return response.status(400).send({ message: 'User already exists' });
      }

      if (
        !request.body.name,
        !request.body.password
      ) {
        return response.status(400).send({
          message: 'Send all required fields: name or password',
        });
      }
      const newUser = {
        name: request.body.name,
        password: request.body.password,
      };
  
      const user = await User.create(newUser);
  
      return response.status(201).send(user);
    } catch (error) {


      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // login user when sign in
  userRouter.get('/', async (request, response) => {
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
  
      return response.json("exist")
    } catch (error) {
      console.error('Error in user registration:', error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  });

  // //get all league
  // userRouter.get('/', async (req, res) => {
  //   try {
  //     const users = await User.find({});
  //     return res.status(200).json({
  //       count: users.length,
  //       data: users});
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(500).send({massage:error.message});
  //   }
  // });

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