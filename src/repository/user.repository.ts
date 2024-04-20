import pool from '../db';
import { iUser } from '../interfaces/interface';

async function createUserDB(name: string, surname: string, email: string, pwd: string): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql: string = 'insert into users (name,surname,email,pwd) values ($1,$2,$3,$4) returning *';
    const { rows } = await client.query(sql, [name, surname, email, pwd]);
    await client.query('commit');
    return rows;
  } catch (error: any) {
    await client.query('rollback');
    return []
  } finally {
    client.release();
  }
}

async function getAllUserDB(): Promise<iUser[]> {
  const client = await pool.connect();
  const sql: string = 'select * from users';
  const { rows } = await client.query(sql);
  return rows;
}

async function getUserByIdDB(id: string): Promise<iUser[]> {
  const client = await pool.connect();
  const sql: string = 'select * from users where id = $1';
  const { rows } = await client.query(sql, [id]);
  return rows;
}

async function updateUserDB(id: string, name: string, surname: string, email: string, pwd: string): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql: string = 'update users set name = $1,surname = $2,email = $3,pwd = $4 where id = $5 returning *';
    const { rows } = await client.query(sql, [name, surname, email, pwd, id]);
    await client.query('commit');
    return rows;
  } catch (error: any) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

async function getUserEmailDB(email: string): Promise<iUser[]> {
  const client = await pool.connect();
  const sql: string = 'select * from users where email = $1';
  const { rows } = await client.query(sql, [email]);
  return rows;
}

async function deleteUserDB(id: string): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql: string = 'delete from users where id = $1 returning *';
    const { rows } = await client.query(sql, [id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

async function updateUserOnResDB(id: string, body: iUser): Promise<iUser[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql1: string = 'SELECT * FROM users WHERE id = $1';
    const oldObj: iUser[] = (await client.query(sql1, [id])).rows;
    const newObj: iUser = { ...oldObj[0], ...body };
    const sql2: string = 'UPDATE users SET name = $1,surname = $2,email = $3,pwd = $4 WHERE id = $5 returning *';
    const { rows } = await client.query(sql2, [newObj.name, newObj.surname, newObj.email, newObj.pwd, id]);
    await client.query('commit');
    return rows;
  } catch (error: any) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

export { createUserDB, getAllUserDB, getUserByIdDB, updateUserDB, getUserEmailDB, deleteUserDB, updateUserOnResDB };
