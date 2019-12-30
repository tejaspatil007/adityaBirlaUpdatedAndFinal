const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'NewDB'
})

connection.connect(function (error) {
    if (error) {
        console.log(error)
    }
    else {
        console.log('Mysql connected...');
    }
})

//////////// create tables /////////////////////
/////user table///////
let userdetails = `CREATE TABLE IF NOT EXISTS usertable(
    user_id varchar(50) PRIMARY KEY,
    name varchar(20) NOT NULL,
    gender varchar(20) NOT NULL,
    age int(11) NOT NULL,
    maritalStatus varchar(20),
    child varchar(20),
    kids int(11), 
    profession varchar(30) NOT NULL
    )`;

connection.query(userdetails, function (err, results, fields) {
    if (err) {
        console.log(err);

    }
    else {
        console.log("1st table created");
    }
});

//////goals table/////////
let goals = `CREATE TABLE IF NOT EXISTS tablegoal(
    goal_id int(11) PRIMARY KEY AUTO_INCREMENT,
    goal varchar(30) UNIQUE NOT NULL
)`

connection.query(goals, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("2nd table created")
    }
})

///////// user goals tables//////
let usergoals = `CREATE TABLE IF NOT EXISTS userGoals(
    usergoal_id int(11) PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(50),
    goal_id int(11),
    goals varchar(50) NOT NULL,
    src varchar(200) ,
    result varchar(200) NULL,
    FOREIGN KEY(goal_id) REFERENCES tablegoal(goal_id),
    FOREIGN KEY(user_id) REFERENCES usertable(user_id)
)`
connection.query(usergoals, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("3nd table created")
    }
})

/////////// anser table/////////
let answertable = `CREATE TABLE IF NOT EXISTS anstable(
    goalAns_id int(11) PRIMARY KEY AUTO_INCREMENT ,
    user_id varchar(50) ,
    goal_id int(30) ,
    goals varchar(50),
    que_id int(10),
    question varchar(200),
    answer varchar(50),
    FOREIGN KEY(user_id) REFERENCES usertable(user_id),
    FOREIGN KEY(goal_id) REFERENCES tablegoal(goal_id)
    )`
connection.query(answertable, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("4nd table created")
    }
})

//////////// create tables /////////////////////

/////  store user details and send uuid ///////////////
app.post("/details", function (req, res) {
    console.log(req.body);
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
    console.log("obj", obj);
    connection.query(`INSERT INTO 
                        usertable(user_id,name,gender,age,maritalStatus,child,kids,profession)  
                    VALUES (?)`,
        [obj], function (error, rows, field) {
            if (error) {
                // console.log(error);
                // throw(error);
                throw (error)
            }
            else {
                // console.log(row[0].user_id);
                console.log(uid);
                res.send({ userid: uid });
            }
        })
    // connection.end();    
})
///////  store user details and send uuid ///////////////

////////// strore goals ///////////////
let ugoal = [
    ["Self Development"],
    ["Starting Business"],
    ["Bike"],
    ["Marriage"],
    ["Honeymoon"],
    ["Wealth Creation"],
    ["Holiday"],
    ["Car"],
    ["Child’s Education"],
    ["Child’s Marriage"],
    ["Follow Passion"],
    ["World Tour"],
    ["Dream Home"],
    ["Retirement"],
    ["Philanthropy"]
]
connection.query("INSERT IGNORE INTO tablegoal(goal) Values ?", [ugoal], function (error, rows, field) {
    if (error) {
        throw (error);
    }
    else {
        // res.send(rows);
        console.log(rows);
    }
})

////////// strore goals ///////////////

///////// get goals ////////////////////
app.get("/getgoals", function (req, res) {
    connection.query(`SELECT 
                        *
                    FROM 
                        tablegoal`,
        function (err, rows) {
            // console.log(rows);
            if (err) {
                throw (err);
                // console.log(err)
            }
            else {
                res.send({ data: rows });
                console.log("data", data);
            }
            // connection.end();    
        })
})
///////// get goals ////////////////////


////////// strore user goals //////////////////////
app.post("/usergoals", function (req, res) {
    // console.log(req.body);
    let userid = req.body.user_id;
    // console.log(userid);
    let user_goal = req.body.selectedgoals;
    // console.log(user_goal);
    let sqldata = [];
    // let othergoal = [];
    console.log("*", user_goal.length);
    for (let i = 0; i < user_goal.length; i++) {
        let add = [userid, user_goal[i].id, user_goal[i].type, user_goal[i].src];
        // let dataObj = {
        //     user_id: userid,
        //     goals: user_goal[i].type,
        //     goal_id: user_goal[i].id,
        //     src: user_goal[i].src
        // }
        // sqldata.push(dataObj);
        // let goal = [user_goal[i].type];
        // console.log(goal);
        console.log("usergoal", user_goal[i]);
        console.log("goalid", user_goal[i].id);
        console.log("=", add);
        sqldata.push(add);
        // othergoal.push(goal);
    }
    console.log("=>", sqldata);
    // connection.query(`INSERT INTO 
    //                     userGoals(user_id,goal_id,goals,src) 
    //                 VALUES ?`,
    //     [sqldata], function (error, rows, field) {
    //         if (error) {
    //             throw (error);
    //         }
    //         else {
    //             // console.log({userid:uid});
    //             console.log(rows);
    //             res.send({ rows });
    //         }
    //     })

    connection.query(`DELETE FROM userGoals
                        WHERE EXISTS (SELECT * FROM userGoals WHERE user_id = ?)`,[userid],
        function (error, rows, field) {
            console.log("sqlquer1",this.sql);

            if (error) {
                throw (error)
            }
            else {
                console.log(rows);
                connection.query(`INSERT INTO 
                        userGoals(user_id,goal_id,goals,src) 
                    VALUES ?`,
                    [sqldata], function (error, rows, field) {
                        console.log("sqlquer2",this.sql);
                        if (error) {
                            throw (error);
                        }
                        else {
                            // console.log({userid:uid});
                            console.log(rows);
                            res.send({ rows });
                        }
                    })
            }
        }
    )

    // connection.query(`REPLACE INTO 
    //                       userGoals SET  ?`,
    //     sqldata, function (error, rows, field) {
    //         if (error) {
    //             throw (error);
    //         }
    //         else {
    //             res.send({ rows });
    //         }
    //     })

    // connection.end();    
    //         // console.log({userid:uid});
    //         console.log(rows);
    //         // res.send({rows});
    // }
})
// connection.end();

////////// strore user goals //////////////////////

///////////// get user goals filter by uuid /////////////////////
app.get("/getusergoal/:id", function (req, res) {
    // console.log(req.params.id);
    // let urid = req.params.id;
    let urid = req.params.id;
    console.log(urid);
    connection.query(`SELECT usertable.user_id, usertable.name,usertable.age,userGoals.goal_id,userGoals.goals,userGoals.user_id 
                    FROM 
                       usertable 
                    INNER JOIN 
                       userGoals
                    ON 
                    usertable.user_id = userGoals.user_id AND usertable.user_id= ?`, urid, function (err, rows, fields) {
        if (err) {
            throw (err);
        }
        else {
            res.send(rows);
            console.log("rows", rows);
            console.log(fields)
        }

    })
})
///////////// get user goals filter by uuid /////////////////////

/////////////store user answers //////////////////////
app.post("/goalsanswer", function (req, res) {
    // console.log(req.body);
    let userid = req.body.user_id;
    // console.log("userid",userid);
    let dtails_goal = req.body.goal_details;
    console.log("detailgoal", dtails_goal);
    let ansdata = [];
    let resultdata = [];
    for (let i = 0; i < dtails_goal.length; i++) {
        // let data = [userid,dtails_goal[i].goal_id,dtails_goal[i].goals,dtails_goal[i].queans];

        let ansRes = [userid, dtails_goal[i].goal_id, dtails_goal[i].res];
        // console.log(ansRes);

        resultdata.push(ansRes);
        // console.log("resultdata", resultdata);

        let questionans = dtails_goal[i].queans
        // console.log("=>", questionans);
        // console.log("=>",data);
        let queryString = `UPDATE userGoals SET result = ? where user_id = ? and goal_id = ?`;
        let values = [dtails_goal[i].res, userid, dtails_goal[i].goal_id];
        console.log("Values are ", values);
        connection.query(queryString, values, function (error, rows, field) {
            if (error) {
                throw (error);
            }
            else {
                console.log("send result")
            }
        })
        // console.log("query",queryString);
        for (let j = 0; j < questionans.length; j++) {
            let data = [userid, dtails_goal[i].goal_id, dtails_goal[i].goals, questionans[j].que_id, questionans[j].question, questionans[j].answer]
            // console.log("=>", data);
            ansdata.push(data);
        }
    }
    console.log("ansdata", ansdata);
    connection.query(`INSERT INTO 
                            anstable(user_id,goal_id,goals,que_id,question,answer)
                         VALUES ?`,
        [ansdata], function (error, rows, field) {
            if (error) {
                throw (error);
            }
            else {
                res.send({ data: userid });
            }
            // connection.end();
        })
    //          connection.query(`UPDATE INTO 
    //                             userGoals SET result = ? 
    //                             `,[resultdata],function(error, rows, field){
    //                                 if(error){
    //                                     throw (error);
    //                                 }
    //                                 else{
    //                                     console.log("send result")
    //                                 }
    //                             })   
})
/////////////store user answers //////////////////////

///////////// get answers /////////////////
app.get("/getanswers/:id", function (req, res) {
    let urid = req.params.id;
    connection.query(`SELECT 
                        * 
                    FROM 
                        userGoals
                    WHERE 
                        user_id = ?`,
        [urid], function (err, rows) {
            if (err) {
                // connection.end();
                throw (err);
            }
            else {
                // connection.end();
                let formGoals = {};
                let midGoals =[];
                let longGoals=[];
                let shortGoals=[];
                let totalAmount = 0
                rows.forEach(element => {
                    console.log("element",element);
                    const data = JSON.parse(element.result);
                    console.log("data",data.age);
                    totalAmount += parseInt(data.amt)
                    if(data.age < 3){
                        shortGoals.push(element)
                    }
                    else if(data.age > 2 && data.age <= 5){
                        midGoals.push(element);
                    }
                    else if(data.age > 5){
                        longGoals.push(element);
                    }
                    
                   
                });
                
                console.log('shortGoals',shortGoals)

                formGoals =  {
                    "shortGoals" : shortGoals,
                    "midGoal" :midGoals,
                    "longGoals" : longGoals,
                    "totalAmount" : totalAmount
                }
                // formGoals.push({"shortGoal":shortGoals},
                // {"midGoal":midGoals},
                // {"longGoals":longGoals})
                console.log("formGoals",JSON.stringify(formGoals));
                // connection.end();
                res.send({ result:formGoals });
            }
        })
    
})
//////////// get answers //////////////////

app.listen(3000);
