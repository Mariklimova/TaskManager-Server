import express, { Request, Response } from 'express';
import { createTask, getAllTask, updateTask, deleteTask, getByIdTask, updateTaskOnRes } from '../service/task.service';
import { buildResponse } from '../helper/buildResponse';
import { iTask } from '../interfaces/interface';

const route = express.Router();

route.post('/', async (req: Request, res: Response) => {
  try {
    const { task, user_id } = req.body;
    const data: iTask[] = await createTask(task, user_id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/', async (_req:Request, res:Response) => {
  try {
    const data:iTask[] = await getAllTask();
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.put('/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const data:iTask[] = await updateTask(id, task, user_id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.delete('/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const data:iTask[] = await deleteTask(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const data:iTask[] = await getByIdTask(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.patch('/:id', async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const body:iTask = req.body;
    const data:iTask[] = await updateTaskOnRes(id, body);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

export default route;
