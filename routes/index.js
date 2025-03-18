const UserRoutes = require('./user_routes')


exports.endpoints = [
    { method: 'GET', path: '/user', config: UserRoutes.get }
]
