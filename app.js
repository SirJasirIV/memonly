require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./db/pool");
const authRouter = require("./routes/authrouter");
const session = require("express-session");
const indexRouter = require("./routes/indexrouter")

async function testDB() {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows)
};
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use("/", indexRouter);
app.get("/test", (req, res) => {
    res.send(req.session.userId?.toString() || "Nobody logged in");
});
app.use("/", authRouter)
testDB();
app.listen("3000", () => {
    console.log("Server going well!")
}); 

