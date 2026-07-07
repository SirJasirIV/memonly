require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./db/pool");
const authRouter = require("./routes/authrouter");

async function testDB() {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows)
};
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Members only!")
})
app.use("/", authRouter)
testDB();
app.listen("3000", () => {
    console.log("Server going well!")
}); 

