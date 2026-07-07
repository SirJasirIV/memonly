const { get } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { rows } = require("pg/lib/defaults");

function getSignUp(req, res) {
    res.render("form");
};
async function postSignUp(req, res){
    console.log(req.body)
 const { firstName, secondName, username, password } = req.body;
 if (!firstName || !secondName || !username || !password) {
    return res.send("All fields are required");
} else if (password.length < 6) {
    return res.send("Password must be at least 6 characters");
};
 const hashedPass = await bcrypt.hash(password, 10);
 await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, secondName, username, password]
 );
 res.send("Form received!");
 console.log(hashedPass);
}
function getLogin(req, res) {
    res.render("login");
}
async function postLogin(req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
        if (!user) {
    return res.send("User not found");
    }
   const match = await bcrypt.compare(password, user.password)
   if (match) {
    console.log("YOU LOGGED IN!!");
    return res.send("YOU LOGGED INNNN!")
   } else if (!match) {
    return res.send("Password Incorrect!")
   }
   
};

module.exports = {
    getSignUp,
    postSignUp,
    getLogin,
    postLogin, 
};