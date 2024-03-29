import pool from '../db';

async function createUserDB(name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'insert into users (name,surname,email,pwd) values ($1,$2,$3,$4) returning *';
    const { rows } = await client.query(sql, [name, surname, email, pwd]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

async function getAllUserDB() {
  const client = await pool.connect();
  const sql = 'select * from users';
  const { rows } = await client.query(sql);
  return rows;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = 'select * from users where id = $1';
  const { rows } = await client.query(sql, [id]);
  return rows;
}

async function updateUserDB(id, name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'update users set name = $1,surname = $2,email = $3,pwd = $4 where id = $5 returning *';
    const { rows } = await client.query(sql, [name, surname, email, pwd, id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

async function getUserEmailDB(email) {
  const client = await pool.connect();
  const sql = 'select * from users where email = $1';
  const { rows } = await client.query(sql, [email]);
  return rows;
}

async function deleteUserDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'delete from users where id = $1 returning *';
    const { rows } = await client.query(sql, [id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

async function updateUserOnResDB(id, body) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql1 = 'SELECT * FROM users WHERE id = $1';
    const oldObj = (await client.query(sql1, [id])).rows;
    const newObj = { ...oldObj[0], ...body };
    const sql2 = 'UPDATE users SET name = $1,surname = $2,email = $3,pwd = $4 WHERE id = $5 returning *';
    const { rows } = await client.query(sql2, [newObj.name, newObj.surname, newObj.email, newObj.pwd, id]);
    await client.query('commit');
    return rows;
  } catch (error) {
    await client.query('rollback');
    return [];
  }
}

export { createUserDB, getAllUserDB, getUserByIdDB, updateUserDB, getUserEmailDB, deleteUserDB, updateUserOnResDB };
