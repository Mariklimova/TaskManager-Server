const { createUserDB, getAllUserDB, getUserByIdDB, updateUserDB, getUserEmailDB,deleteUserDB } = require('../repository/user.repository')

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserEmailDB(email);
    if (foundUser.length) throw new Error('user already exists');
    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error('data do not create');
    return data
}
async function getAllUser() {
    const data = await getAllUserDB();
    if (!data.length) throw new Error('data is empty');
    return data
}

async function getUserById(id) {
    const data = await getUserByIdDB(id);
    if (!data.length) throw new Error('id not found');
    return data
}

async function updateUser(id, name, surname, email, pwd) {
    const data = await updateUserDB(id, name, surname, email, pwd);
    if (!data.length) throw new Error('data do not create');
    return data
}

async function deleteUser(id) {
    const data = await deleteUserDB(id);
    if (!data.length) throw new Error('id not found');
    return data
}





module.exports = { createUser, getAllUser, getAllUser, getUserById, updateUser, deleteUser }