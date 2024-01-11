function IsValidUserId(req, _res, next) {
  const { id } = req.params;
  if (typeof id != 'number' && typeof id != 'string') throw new Error('type id not valid');
  if (isNaN(id)) throw new Error('id not number');
  if (id <= 0) throw new Error(' id <= 0');
  next();
}



function IsValidUser(req, _res, next) {

  const { name, surname, email, pwd } = req.body;

  if (typeof name != 'string') throw new Error('type name not valid');
  if (typeof surname != 'string') throw new Error('type surname not valid');
  if (typeof email != 'string') throw new Error('type email not valid');
  if (typeof pwd != 'string') throw new Error('type password not valid');
  if (!isNaN(name)) throw new Error('name not string');
  if (!isNaN(surname)) throw new Error('surname not string');
  if (!/^\w+\@\w+\.[a-z]{2,5}/gm.test(email)) throw new Error('email not valid');
  if (!/^\w{8,}$/gm.test(pwd)) throw new Error('password not valid');

  next();
}

module.exports = { IsValidUser, IsValidUserId };
