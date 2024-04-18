import express, { Request, Response } from 'express';
import { buildResponse } from '../helper/buildResponse';
import { createUserApi, authUserEmail } from '../service/api.service';
import { createToken } from '../helper/jwt';
import { iUser } from '../interfaces/interface';

const routeApi = express.Router();

routeApi.post('/reg', async (req:Request, res:Response) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data:iUser[] = await createUserApi(name, surname, email, pwd);
    buildResponse(200, data, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});

routeApi.post('/auth', async (req:Request, res:Response) => {
  try {
    const { email, pwd } = req.body;
    const data:iUser[] = await authUserEmail(email, pwd);
    const token:string = createToken(data);
    buildResponse(200, token, res);
  } catch (error: any) {
    buildResponse(404, error.message, res);
  }
});
export default routeApi;
