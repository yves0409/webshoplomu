import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
//import jwt from "jsonwebtoken";

//Route : POST /api/users/login
//What it does: fAuth user & getting a token
//Who : Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //if there is a usere and the passwords match this will be returned (id,name,email,etc)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Route : POST /api/users
//What it does: Register new user
//Who : Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Route : GET /api/users/profile
//What it does: get a users profile
//Who : Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id, //userInfo passed to the data in the userReducer 'USER_LOGIN_SUCCES'
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    console.log("user found");
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//Route : PUT /api/users/profile
//What it does: Udates a users profile
//Who : Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //req.user._id is the logged in user

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//Route : GET /api/users
//What it does: get all users
//Who : Private-ADMIN
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//Route : DELETE /api/users/:id
//What it does: delete a user
//Who : Private-ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Route : GET /api/users/:id
//What it does: Get user by Id
//Who : Private-ADMIN
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Route : PUT /api/users/:i
//What it does: Udate a user
//Who : Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //req.user._id is the logged in user

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.isAdmin =
      req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      console.log("GOOGLE LOGIN RESPONSE", response);
      const { email_verified, name, email } = response.payload;
      console.log("=====>", response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const { _id, name, email, isAdmin } = user;
            return res.json({
              _id,
              name,
              email,
              isAdmin,
              token: generateToken(user._id),
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                return res.status(400).json({
                  error: "User signup failed with google",
                });
              }

              const { _id, name, email, isAdmin } = data;
              return res.json({
                _id,
                name,
                email,
                isAdmin,
                token: generateToken(user._id),
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again",
        });
      }
    });
});

const facebookLogin = asyncHandler(async (req, res) => {
  console.log("FACEBOOK LOGIN REQ BODY", req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())

    .then((response) => {
      const { email, name } = response;
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          const { _id, email, name, isAdmin } = user;
          return res.json({
            _id,
            email,
            name,
            isAdmin,
            token: generateToken(user._id),
          });
        } else {
          let password = email + process.env.JWT_SECRET;
          user = new User({ name, email, password });
          user.save((err, data) => {
            if (err) {
              console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
              return res.status(400).json({
                error: "User signup failed with facebook",
              });
            }

            const { _id, email, name, isAdmin } = data;
            return res.json({
              _id,
              email,
              name,
              isAdmin,
              token: generateToken(user._id),
            });
          });
        }
      });
    })
    .catch((error) => {
      res.json({
        error: "Facebook login failed. Try later",
      });
    });
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  googleLogin,
  facebookLogin,
};
