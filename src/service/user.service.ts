import { iUser } from '../interfaces/interface';
import {  createUserDB,  getAllUserDB,  getUserByIdDB,  updateUserDB,  getUserEmailDB,  deleteUserDB,  updateUserOnResDB} from '../repository/user.repository';

async function createUser(name:string, surname:string, email:string, pwd:string):Promise<iUser[]> {
  const foundUser:iUser[] = await getUserEmailDB(email);
  if (foundUser.length) throw new Error('user already exists');
  const data:iUser[] = await createUserDB(name, surname, email, pwd);
  if (!data.length) throw new Error('data do not create');
  return data;
}
async function getAllUser():Promise<iUser[]> {
  const data:iUser[] = await getAllUserDB();
  if (!data.length) throw new Error('database is empty');
  return data;
}

async function getUserById(id:string):Promise<iUser[]> {
  const data:iUser[] = await getUserByIdDB(id);
  if (!data.length) throw new Error('id not found');
  return data;
}

async function updateUser(id:string, name:string, surname, email, pwd):Promise<iUser[]> {
  const data:iUser[] = await updateUserDB(id, name, surname, email, pwd);
  if (!data.length) throw new Error('Data is not changed');
  return data;
}

async function deleteUser(id:string):Promise<iUser[]> {
  const data:iUser[] = await deleteUserDB(id);
  if (!data.length) throw new Error('Data is not deleted');
  return data;
}

async function updateUserOnRes(id:string, body:iUser):Promise<iUser[]> {
  const data:iUser[] = await updateUserOnResDB(id, body);
  if (!data.length) throw new Error('id not found, data is not changed');
  return data;
}

export { createUser, getAllUser, getUserById, updateUser, deleteUser, updateUserOnRes };
