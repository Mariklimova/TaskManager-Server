import bcript from 'bcrypt';
import { createUserApiDB, getUserByEmailDB } from '../repository/api.repository';

const saltround = 3;

async function createUserApi(name, surname, email, pwd) {
  const findEmail = await getUserByEmailDB(email);

  if (findEmail.length) throw new Error('this email alredy exist');

  const hashPwd = await bcript.hash(pwd, saltround);
  const user = await createUserApiDB(name, surname, email, hashPwd);
  if (!user.length) throw new Error('data not saved');
  return user;
}

async function authUserEmail(email, pwd) {
  const findEmail = await getUserByEmailDB(email);
  if (!findEmail.length) throw new Error('wrong email');
  const comparePwd = await bcript.compare(pwd, findEmail[0].pwd);
  if (!comparePwd) throw new Error('wrong password');
  return findEmail;
}

export { createUserApi, authUserEmail };
