const express = require("express");
const router = express.Router();
const { signUp, updateUserData, getUserData, login, deleteUser } = require("./user.controller");
const { tokenVerificationMiddleware } = require("../utils/auth");


const LoginUser = async (req, res) => { 
  try {
    const outValue = await login(req) 
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' })
  }
}

const PostUser = async (req, res) => {
  try {
    const outValue = await signUp(req.body);
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const PatchUsers = async (req, res) => {
  try {
    const outValue = await updateUserData(req);
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating users" });
  }
};

const DeleteUser = async (req, res) => { 
  try {
    const outValue = await deleteUser(req) 
    res.status(outValue.code).json(outValue.value)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error deleting user' })
  }
}

const GetUser = async (req, res) => {
  try {
    const outValue = await getUserData(req);
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting user data" });
  }
}

router.post("/login", LoginUser)
router.post("/", PostUser);
router.patch("/", tokenVerificationMiddleware, PatchUsers);
router.delete("/", tokenVerificationMiddleware, DeleteUser)
router.get("/",  GetUser);
module.exports = router;
