const express = require('express')
const { createUser, getAllUser, getUserById, updateUser,deleteUser } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');

const route = express.Router();

route.post('/', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (error) {
        buildResponse(404, error.message, res)
    }
})

route.get('/', async (req, res) => {
    try {
        const data = await getAllUser();
        buildResponse(200, data, res)
    } catch (error) {
        buildResponse(404, error.message, res)
    }
})

route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);
        buildResponse(200, data, res)
    } catch (error) {
        buildResponse(404, error.message, res)
    }
})

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = await updateUser(id, name, surname, email, pwd);
        buildResponse(200, data, res)
    } catch (error) {
        buildResponse(404, error.message, res)
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUser(id);
        buildResponse(200, data, res)
    } catch (error) {
        buildResponse(404, error.message, res)
    }
})



module.exports = route;