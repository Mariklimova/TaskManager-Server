import pool from '../db';
import { iTask } from '../interfaces/interface';

async function createTaskDB(task: string, user_id: string): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql: string = 'insert into tasks (task,user_id) values ($1,$2) returning *';
    const { rows } = await client.query(sql, [task, user_id]);
    await client.query('commit');
    return rows;
  } catch (error: any) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

async function getAllTaskDB(): Promise<iTask[]> {
  const client = await pool.connect();
  const sql: string = 'select * from tasks';
  const { rows } = await client.query(sql);
  return rows;
}

async function updateTaskDB(id: string, task: string, user_id: string): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql: string = 'UPDATE tasks SET task = $1,user_id = $2 WHERE id = $3 returning *';
    const { rows } = await client.query(sql, [task, user_id, id]);
    await client.query('commit');
    return rows;
  } catch (error: any) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

async function deleteTaskDB(id: string): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql: string = 'DELETE FROM tasks WHERE id = $1 returning *';
    const { rows } = await client.query(sql, [id]);
    await client.query('commit');
    return rows;
  } catch (error: any) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

async function getByIdTaskDB(id: string): Promise<iTask[]> {
  const client = await pool.connect();
  const sql: string = 'select * from tasks where id = $1';
  const { rows } = await client.query(sql, [id]);
  return rows;
}

async function updateTaskOnResDB(id: string, body: iTask): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql1: string = 'SELECT * FROM tasks WHERE id = $1';
    const oldObj: iTask[] = (await client.query(sql1, [id])).rows;
    const newObj: iTask = { ...oldObj[0], ...body };
    const sql2: string = 'UPDATE tasks SET task = $1,user_id = $2 WHERE id = $3 returning *';
    const { rows } = (await client.query(sql2, [newObj.task, newObj.user_id, id]));
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  } finally {
    client.release();
  }
}

export { createTaskDB, getAllTaskDB, updateTaskDB, deleteTaskDB, getByIdTaskDB, updateTaskOnResDB };
