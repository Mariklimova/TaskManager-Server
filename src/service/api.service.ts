import bcript from 'bcrypt';
import { createUserApiDB, getUserByEmailDB } from '../repository/api.repository';
import { iUser } from '../interfaces/interface';

const saltround = 3;

async function createUserApi(name:string, surname:string, email:string, pwd:string):Promise<iUser[]> {
  const findEmail:iUser[] = await getUserByEmailDB(email);

  if (findEmail.length) throw new Error('this email alredy exist');

  const hashPwd = await bcript.hash(pwd, saltround);
  const user:iUser[] = await createUserApiDB(name, surname, email, hashPwd);
  if (!user.length) throw new Error('data not saved');
  return user;
}

async function authUserEmail(email:string, pwd:string):Promise<iUser[]> {
  const findEmail:iUser[] = await getUserByEmailDB(email);
  if (!findEmail.length) throw new Error('wrong email');
  const comparePwd:boolean = await bcript.compare(pwd, findEmail[0].pwd);
  if (!comparePwd) throw new Error('wrong password');
  return findEmail;
}

export { createUserApi, authUserEmail };
