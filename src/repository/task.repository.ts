import pool from '../db';

async function createTaskDB(task, user_id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'insert into tasks (task,user_id) values ($1,$2) returning *';
    const { rows } = await client.query(sql, [task, user_id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

async function getAllTaskDB() {
  const client = await pool.connect();
  const sql = 'select * from tasks';
  const { rows } = await client.query(sql);
  return rows;
}

async function updateTaskDB(id, task, user_id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'UPDATE tasks SET task = $1,user_id = $2 WHERE id = $3 returning *';
    const { rows } = await client.query(sql, [task, user_id, id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

async function deleteTaskDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'DELETE FROM tasks WHERE id = $1 returning *';
    const { rows } = await client.query(sql, [id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

async function getByIdTaskDB(id) {
  const client = await pool.connect();
  const sql = 'select * from tasks where id = $1';
  const { rows } = await client.query(sql, [id]);
  return rows;
}

async function updateTaskOnResDB(id, body) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql1 = 'SELECT * FROM tasks WHERE id = $1';
    const oldObj = (await client.query(sql1, [id])).rows;
    console.log(oldObj);
    console.log(body);
    const newObj = { ...oldObj[0], ...body };
    const sql2 = 'UPDATE tasks SET task = $1,user_id = $2 WHERE id = $3 returning *';
    const result = (await client.query(sql2, [newObj.task, newObj.user_id, id])).rows;
    console.log(result);
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

export { createTaskDB, getAllTaskDB, updateTaskDB, deleteTaskDB, getByIdTaskDB, updateTaskOnResDB };
