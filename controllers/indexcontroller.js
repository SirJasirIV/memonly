const session = require("express-session");
const { Router } = require("express");
const indexRouter = Router();
const pool = require("../db/pool");
const { user } = require("pg/lib/defaults");

function buildMsg(req, res) {
     res.render("message")
}

async function postMsg(req,res) {
    const { message } = req.body;
    await pool.query(
        "INSERT INTO messages (text, user_id) VALUES ($1, $2)",
        [message, req.session.userId]
    )
    return res.redirect("/home")
}

async function switchHome(req, res) {
    console.log("HOME ROUTE HIT");
    const result = await pool.query(`
    SELECT
    messages.text,
    messages.created_at,
    users.username
    FROM messages
    JOIN users
    ON messages.user_id = users.id;
`)
let isMember = false;
if (req.session.userId) {
   const permission = await pool.query("SELECT * FROM users WHERE id = $1", [req.session.userId])
   const userPerm = permission.rows[0]
   isMember = userPerm.member
}
    res.render("home", {messages: result.rows, isMember})
}

module.exports = {
    buildMsg,
    postMsg,
    switchHome,
}