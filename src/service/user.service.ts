import {  createUserDB,  getAllUserDB,  getUserByIdDB,  updateUserDB,  getUserEmailDB,  deleteUserDB,  updateUserOnResDB} from '../repository/user.repository';

async function createUser(name, surname, email, pwd) {
  const foundUser = await getUserEmailDB(email);
  if (foundUser.length) throw new Error('user already exists');
  const data = await createUserDB(name, surname, email, pwd);
  if (!data.length) throw new Error('data do not create');
  return data;
}
async function getAllUser() {
  const data = await getAllUserDB();
  if (!data.length) throw new Error('database is empty');
  return data;
}

async function getUserById(id) {
  const data = await getUserByIdDB(id);
  if (!data.length) throw new Error('id not found');
  return data;
}

async function updateUser(id, name, surname, email, pwd) {
  const data = await updateUserDB(id, name, surname, email, pwd);
  if (!data.length) throw new Error('Data is not changed');
  return data;
}

async function deleteUser(id) {
  const data = await deleteUserDB(id);
  if (!data.length) throw new Error('Data is not deleted');
  return data;
}

async function updateUserOnRes(id, body) {
  const data = await updateUserOnResDB(id, body);
  if (!data.length) throw new Error('id not found, data is not changed');
  return data;
}

export { createUser, getAllUser, getUserById, updateUser, deleteUser, updateUserOnRes };
