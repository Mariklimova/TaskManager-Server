import express from 'express';
import { createTask, getAllTask, updateTask, deleteTask, getByIdTask, updateTaskOnRes } from '../service/task.service';
import { buildResponse } from '../helper/buildResponse';
import { IsValidUser, IsValidUserId } from '../helper/validation';

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const { task, user_id } = req.body;
    const data = await createTask(task, user_id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllTask();
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const data = await updateTask(id, task, user_id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTask(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getByIdTask(id);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await updateTaskOnRes(id, body);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

export default route;
