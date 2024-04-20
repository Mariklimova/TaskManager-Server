import { iTask } from '../interfaces/interface';
import { createTaskDB, getAllTaskDB, updateTaskDB, deleteTaskDB, getByIdTaskDB, updateTaskOnResDB } from '../repository/task.repository';

async function createTask(task:string, user_id:string):Promise<iTask[]> {
  const data:iTask[] = await createTaskDB(task, user_id);
  if (!data.length) throw new Error('data do not create');
  return data;
}

async function getAllTask():Promise<iTask[]> {
  const data:iTask[] = await getAllTaskDB();
  if (!data.length) throw new Error('The database is empty');
  return data;
}

async function updateTask(id:string, task:string, user_id:string):Promise<iTask[]> {
  const data:iTask[] = await updateTaskDB(id, task, user_id);
  if (!data.length) throw new Error('Data is not changed');
  return data;
}

async function deleteTask(id:string):Promise<iTask[]> {
  const data:iTask[] = await deleteTaskDB(id);
  if (!data.length) throw new Error('Data is not deleted');
  return data;
}

async function getByIdTask(id:string):Promise<iTask[]> {
  const data:iTask[] = await getByIdTaskDB(id);
  if (!data.length) throw new Error('Not found ID');
  return data;
}

async function updateTaskOnRes(id:string, body:iTask):Promise<iTask[]> {
  const data:iTask[] = await updateTaskOnResDB(id, body);
  if (!data.length) throw new Error('Data is not changed');
  return data;
}
export { createTask, getAllTask, updateTask, deleteTask, getByIdTask, updateTaskOnRes };
