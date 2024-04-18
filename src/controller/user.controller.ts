import express, { Request, Response } from 'express';
import { createUser, getAllUser, getUserById, updateUser, deleteUser, updateUserOnRes } from '../service/user.service';
import { buildResponse } from '../helper/buildResponse';
import { IsValidUser, IsValidUserId } from '../helper/validation';
import { iUser } from '../interfaces/interface';

const route = express.Router();

route.post('/', IsValidUser, async (req: Request, res: Response) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data: iUser[] = await createUser(name, surname, email, pwd);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/', async (_req:Request, res:Response) => {
  try {
    const data: iUser[] = await getAllUser();
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/:id', IsValidUserId, async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const data: iUser[] = await getUserById(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.put('/:id', IsValidUserId, IsValidUser, async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data: iUser[] = await updateUser(id, name, surname, email, pwd);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.delete('/:id', IsValidUserId, async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const data: iUser[] = await deleteUser(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.patch('/:id', IsValidUserId, async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const body: iUser = req.body;
    const data: iUser[] = await updateUserOnRes(id, body);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

export default route;
