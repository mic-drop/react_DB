const UserService = require('../service/user_service');

// http://localhost:3000/user/1
exports.get = async (request) => {
    const id = Number.parseInt(request.params.id, 10);
    const user = await UserService.findById(id);
    return user;
}
