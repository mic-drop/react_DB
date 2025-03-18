const UserController = require('./user_routes');

exports.get = {
    handler: UserController.get
}
