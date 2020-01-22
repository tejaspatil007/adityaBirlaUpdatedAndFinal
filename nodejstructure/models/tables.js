var createTable = require('./usertable');

module.exports  =(app)=>{
    createTable.useradd();
    createTable.goals();
    createTable.userGoal();
    createTable.answer();
    createTable.goaldata();
}