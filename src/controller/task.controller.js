const express = require('express');
const { createTask, getAllTask, updateTask, deleteTask, getByIdTask, updateTaskOnRes } = require('../service/task.service');
const { buildResponse } = require('../helper/buildResponse');
const { IsValidUser, IsValidUserId } = require('../helper/validation');

const route = express.Router();

route.post('/', IsValidUser, async (req, res) => {
  try {
    const { task, user_id } = req.body;
    const data = await createTask(task, user_id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllTask();
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.put('/:id', IsValidUserId, IsValidUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const data = await updateTask(id, task, user_id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.delete('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTask(id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.get('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getByIdTask(id);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

route.patch('/:id', IsValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await updateTaskOnRes(id, body);
    buildResponse(200, data, res);
  } catch (error) {
    buildResponse(404, error.message, res);
  }
});

module.exports = route;
