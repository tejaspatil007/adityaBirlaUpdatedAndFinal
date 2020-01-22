const connection = require('../controller/db');

module.exports =  {
    useradd: () =>  {
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
            } else {
                console.log("1st table created");
            }
        });
    },
    
    goals:()=> {
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
    },

    userGoal:()=> {
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
    },

    answer:()=> {
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
    },
    goaldata : function(){
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
        
    }
}

