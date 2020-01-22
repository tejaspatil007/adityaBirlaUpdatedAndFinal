const uuidv4 = require('uuid/v4');
const connection = require('../controller/db');


user = (req, res) => {
    let uid = uuidv4();
    let obj = [
        uid,
        req.body.name,
        req.body.gender,
        req.body.age,
        req.body.maritalStatus,
        req.body.child,
        req.body.kids,
        req.body.profession
    ]
    let goalData = `INSERT INTO usertable(user_id,name,gender,age,maritalStatus,child,kids,profession) VALUES (?)`;
    connection.query(goalData, [obj], function (error, rows, field) {
            try{
                res.send({ userid: uid });

            }catch(error){
                res.send({success:false});
                return console.log("Error error!!!!",err);
            }
        }
    )
}

selectGoal = (req, res) => {
    let query = `SELECT * FROM  tablegoal`;
    connection.query(query, function (err, rows) {
            try{
                res.send({ data: rows });
            }
            catch(err){
                res.send({success:false});
                return console.log("Error error!!!!",err);
            }
        }
    )
}

addCustom = (req, res) => {
    let goalName = req.body.goalName;
    let goalQuery = 'SELECT goal, goal_id FROM tablegoal WHERE goal = ?';
    connection.query(goalQuery, [goalName],
        (err, rows, field) => {
            try{
                if (rows.length != 0) {
                            res.send({ "success": true, "goalId": rows[0].goal_id });
                        } else {
                            let  goalAnswer = `INSERT IGNORE INTO tablegoal SET goal = ?`; 
                            connection.query(goalAnswer, [goalName], function (error, rows, field) {
                                    try{
                                        res.send({ "success": true, "goalId": rows.insertId });
                                    }catch(error){
                                        res.send({ "success": false });
                                        return console.log("Error error!!!!",err);
                                    }
                                }
                            )
                        }
                    }
                    catch(err){
                        res.send({ "success": false });
                        return console.log("Error error!!!!",err);
                    }
        });
}

addUserGoal = (req, res) => {
    let userid = req.body.user_id;
    let user_goal = req.body.selectedgoals;
    let sqldata = [];
    for (let i = 0; i < user_goal.length; i++) {
        let add = [userid, user_goal[i].id, user_goal[i].type, user_goal[i].src];
        let otherGoal = [user_goal[i].type];
        sqldata.push(add);
    }
    console.log("=>", sqldata);
    let deleteQuery = `DELETE FROM userGoals WHERE EXISTS (SELECT * FROM userGoals WHERE user_id = ?)`; 
    connection.query(deleteQuery, [userid],
        function (error, rows, field) {
            try{
                let insertQuery =`INSERT INTO userGoals(user_id,goal_id,goals,src)  VALUES ?`;
                connection.query(insertQuery,[sqldata], function (error, rows, field) {
                        try{
                            res.send({ rows });
                        }catch(error){
                            res.send({success:false});
                            return console.log("Error error!!!!",err);
                        }
                    }
                )
            }catch(error) {
                res.send({success:false});
                return console.log("Error error!!!!",err);
        }
    })
}

getData = (req,res) => {
    let urid = req.params.id;
    let selectQuery = `SELECT usertable.user_id, usertable.name,usertable.age,userGoals.goal_id,userGoals.goals,userGoals.user_id 
                        FROM usertable INNER JOIN  userGoals ON  usertable.user_id = userGoals.user_id AND usertable.user_id= ?`; 
    connection.query(selectQuery, urid, function (err, rows, fields) {
        try{
            res.send(rows);
        }catch(err){
            res.send({success:false});
            return console.log("Error error!!!!",err);
        }
    })
}

answer = (req,res) => {
    let userid = req.body.user_id;
    let dtails_goal = req.body.goal_details;
    let ansdata = [];
    let resultdata = [];
    for (let i = 0; i < dtails_goal.length; i++) {
        let ansRes = [userid, dtails_goal[i].goal_id, dtails_goal[i].res];
        resultdata.push(ansRes);
        let questionans = dtails_goal[i].queans
        let queryString = `UPDATE userGoals SET result = ? where user_id = ? and goal_id = ?`;
        let values = [dtails_goal[i].res, userid, dtails_goal[i].goal_id];
        connection.query(queryString, values, function (error, rows, field) {
            try  {
                console.log("send result")
            }catch(error) {
                res.send({success:false});
                return console.log("Error error!!!!",err);
            }
        })
        for (let j = 0; j < questionans.length; j++) {
            let data = [userid, dtails_goal[i].goal_id, dtails_goal[i].goals, questionans[j].que_id, questionans[j].question, questionans[j].answer]
            ansdata.push(data);
        }
    }
    console.log("ansdata", ansdata);
    let ansQuery = `INSERT INTO anstable(user_id,goal_id,goals,que_id,question,answer) VALUES ?`
    connection.query(ansQuery, [ansdata], function (error, rows, field) {
            try{
                res.send({success:true});
            }catch(error){
                res.send({success:false});
            return console.log("Error error!!!!",err);
            }
        }
    )
}

getAnswer = (req, res) => {
    let urid = req.params.id;
    console.log("user id =>", urid);
    let getQuery = `SELECT * FROM userGoals WHERE user_id = ?`;
    connection.query(getQuery, [urid], function (err, rows) {
    if(err){
        console.log("function err =>", err)
    }
            try{
                let formGoals = {};
                let midGoals = [];   
                let longGoals = [];
                let shortGoals = [];
                let totalAmount = 0
                rows.forEach(element => {
                
                        console.log("element", element);
                        const data = JSON.parse(element.result);
                        console.log("data", data.afterYears);
                        totalAmount += parseInt(data.sipWithLumpsum)
                        console.log("sip->>",data.sipWithLumpsum)
                        if (data.afterYears < 3) {
                            shortGoals.push(element)
                        }
                        else if (data.afterYears > 2 && data.afterYears <= 5) {
                            midGoals.push(element);
                        }
                        else if (data.afterYears > 5) {
                            longGoals.push(element);
                    }
                    
                });
                formGoals = {
                    "shortGoals": shortGoals,
                    "midGoal": midGoals,
                    "longGoals": longGoals,
                    "totalAmount": totalAmount
                }
                res.send({ result: formGoals });
            }catch(err){
                res.send({success:false});
                // return console.log("Error error!!!!",err);
                
            }
        }
    )
}

module.exports = {
    createUser: user,
    createGoal: selectGoal,
    createCustom: addCustom,
    userGoal: addUserGoal,
    getUserData : getData,
    goalAnswer : answer,
    answerData : getAnswer
    }