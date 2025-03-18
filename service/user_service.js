const User = require('../model/user')
const Repository = require('../repository/repository.js')

const internals = {
    userRepo: new Repository(User)
}

exports.findById = async (id) => {
    const user = await userRepo.findById(id);
    return user;
}

exports.findAll = async () => {
    const user = await userRepo.findAll();
    return user;
}

exports.add = async (user) => {
    const user = await userRepo.add(user);

    return user.id;
}

exports.delete = async (id) => {
    const id = await userRepo.delete(id);

    return id;
}
