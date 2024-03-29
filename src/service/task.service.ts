import { createTaskDB, getAllTaskDB, updateTaskDB, deleteTaskDB, getByIdTaskDB, updateTaskOnResDB } from '../repository/task.repository';

async function createTask(task, user_id) {
  const data = await createTaskDB(task, user_id);
  if (!data.length) throw new Error('data do not create');
  return data;
}

async function getAllTask() {
  const data = await getAllTaskDB();
  if (!data.length) throw new Error('The database is empty');
  return data;
}

async function updateTask(id, task, user_id) {
  const data = await updateTaskDB(id, task, user_id);
  if (!data.length) throw new Error('Data is not changed');
  return data;
}

async function deleteTask(id) {
  const data = await deleteTaskDB(id);
  if (!data.length) throw new Error('Data is not deleted');
  return data;
}

async function getByIdTask(id) {
  const data = await getByIdTaskDB(id);
  if (!data.length) throw new Error('Not found ID');
  return data;
}

async function updateTaskOnRes(id, body) {
  const data = await updateTaskOnResDB(id, body);
  if (!data.length) throw new Error('Data is not changed');
  return data;
}
export { createTask, getAllTask, updateTask, deleteTask, getByIdTask, updateTaskOnRes };
