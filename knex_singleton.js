const Knex = require('knex');
const knexConfig = require('./knexfile');

let knexInstance;
let environment; 
exports.setEvn =  (env) => {
    environment = env;
}

exports.getInstance =  () => {

    if(!knexConfig)
    {
        return;
    }
    if(!knexInstance){
        knexInstance = Knex(knexConfig[environment]);
    }
    return knexInstance;
}

