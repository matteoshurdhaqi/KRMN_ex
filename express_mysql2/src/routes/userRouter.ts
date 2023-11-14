import express, { Router } from "express";
import db from "../db"
import { UserEntity, createUser, deleteUser, getAllUsers, getByNameSurname, getOneUser, updateUser } from "../db/userDao";

const router = Router();

//delete
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error '})
  }
})

//update
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedUser = { ...req.body}
    //destructuring to return a obj inst arr of obj
    const result = await updateUser(updatedUser, id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error '})
  }
})

//create user
router.post('/create', async (req, res) => {
  try {
    const newUser = {...req.body};
    const result = await createUser(newUser)
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error '})
  }
})


router.get('/:firstname/:lastname', async (req, res) => {
  try {
    const firstname = req.params.firstname;
    const lastname = req.params.lastname;
    //destructuring to return a obj inst arr of obj
    const [user] = await getByNameSurname(firstname, lastname);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error '})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    //destructuring to return a obj inst arr of obj
    const [user] = await getOneUser(id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error '})
  }
})
// /api/users/
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error '})
  }
})



export default router;