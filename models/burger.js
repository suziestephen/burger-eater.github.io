// Import the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js');

const burger = {
    selectAll(cb) {
        orm.selectAll('burgers', (res)=>cb(res))
    },
    insertOne(tableInput, colInput, cb) {
        orm.create('burgers', tableInput, colInput, (res) => cb(res))
    },
    updateOne(table, objColVals, id, cb) {
        orm.update('burgers', table, objColVals, id, (res) => cb(res))
    },
    delete(condition, cb) {
        orm.delete('burgers', condition, (res) => cb(res));
      },
    
};

// Export the database functions for the controller (burgerController.js).
module.exports = burger;
