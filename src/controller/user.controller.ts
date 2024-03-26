import express from 'express';
import { createUser, getAllUser, getUserById, updateUser, deleteUser, updateUserOnRes } from '../service/user.service';
import { buildResponse } from '../helper/buildResponse';
import { IsValidUser, IsValidUserId } from '../helper/validation';

const route = express.Router();

route.post('/', IsValidUser, async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUser(name, surname, email, pwd);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllUser();
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.put('/:id', IsValidUserId, IsValidUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data = await updateUser(id, name, surname, email, pwd);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.delete('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.patch('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await updateUserOnRes(id, body);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

export default route;
