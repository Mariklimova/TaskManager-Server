import express from 'express';
import { buildResponse } from '../helper/buildResponse';
import { createUserApi, authUserEmail } from '../service/api.service';
import { createToken } from '../helper/jwt';

const routeApi = express.Router();

routeApi.post('/reg', async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUserApi(name, surname, email, pwd);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

routeApi.post('/auth', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await authUserEmail(email, pwd);
    const token = createToken(data);
    buildResponse(200, token, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});
export default routeApi;
