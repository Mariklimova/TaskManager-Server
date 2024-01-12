const { createTaskDB,getAllTaskDB,updateTaskDB,deleteTaskDB,getByIdTaskDB} = require('../repository/task.repository');


async function createTask(task, user_id) {
    const data = await createTaskDB(task, user_id);
    if (!data.length) throw new Error('data do not create');
    return data
}

async function getAllTask(task, user_id) {
    const data = await getAllTaskDB(task, user_id);
    if (!data.length) throw new Error('data do not create');
    return data
}

async function updateTask(id,task, user_id) {
    const data = await updateTaskDB(id,task, user_id);
    if (!data.length) throw new Error('data do not create');
    return data
}

async function deleteTask(id) {
    const data = await deleteTaskDB(id);
    if (!data.length) throw new Error('data do not create');
    return data
}

async function getByIdTask(id) {
    const data = await getByIdTaskDB(id);
    if (!data.length) throw new Error('data do not create');
    return data
}

module.exports = { createTask,getAllTask,updateTask,deleteTask,getByIdTask}