import { Response } from 'express';
import { iTask, iUser } from '../interfaces/interface';

type messageType = iTask | iTask[] | iUser | iUser[] | string;

function buildResponse(status:number, message:messageType, res:Response) {
  res.status(status);
  res.send(message);
}

export { buildResponse };
