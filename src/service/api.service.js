const bcript = require('bcrypt');
const { createUserApiDB,getUserByEmailDB } = require('../repository/api.repository')

const saltround = 3;


async function createUserApi(name, surname, email, pwd) {
    const findEmail = await getUserByEmailDB(email)
    if (findEmail.length) throw new Error('this email found')
   const hashPwd = await bcript.hash(pwd,saltround)
    const data = await createUserApiDB(name, surname, email, hashPwd)
    if (!data.length) throw new Error('data not saved')
    return data
}



module.exports = { createUserApi }