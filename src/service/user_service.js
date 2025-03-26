const User = require('../model/user.js');
const Repository = require('../persistence/repository/repository');

const internals = {
    userRepo: new Repository(User)
}

exports.findById = async (id) => {
    const user = await internals.userRepo.findById(id);
    return user;
}

exports.findAll = async () => {
    const user = await internals.userRepo.findAll();
    return user;
}

exports.add = async (user) => {
    const addedUser = await internals.userRepo.create(user);

    return addedUser.id;
}

exports.delete = async (id) => {
    const deletedRows = await internals.userRepo.delete(id);

    return deletedRows;
}
