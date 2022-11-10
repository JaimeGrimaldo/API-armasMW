const express = require("express");
const mysql = require("mysql")
const app = express();
app.use(express.json())
var cors = require("cors");


const mysqlConnection = mysql.createConnection({
    host: 'database-jaimemysql.c6qsfre4unft.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '191214Grimaldo',
    database: 'mw_armas',
    port: 3306
});

mysqlConnection.connect(function(err) {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log("BD conectada.")
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get("/api/allArmas", cors(), async (req, res) => {
    try {
        console.log("Entra el GET");
        mysqlConnection.query("select * from armas",function(error, results, fields){
            if (error) {
                throw error;
            }
            res.json(results)
        })
    } catch (error) {
        console.log("ERROR");
        console.log(error);
    }
});



