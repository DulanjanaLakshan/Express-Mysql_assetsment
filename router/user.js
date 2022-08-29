const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../config/db.config');

const connection = mysql.createConnection(db.database);
connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        var customertable = "CREATE TABLE IF NOT EXISTS user(id varchar(255) PRIMARY KEY,name varchar(255), address varchar(255), age varchar(255), phone varchar(255))"
        connection.query(customertable, (error, result) => {
            console.log("Connect database");
        })
    }
})

router.get('/', (req, res) => {
    const query = "SELECT * FROM user"
    connection.query(query, (error, row) => {
        if (error) {
            res.send("No User")
        } else {
            res.send(row)
        }
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.email;
    const age = req.body.city;
    const phone = req.body.number;

    const query = "INSERT INTO user (id,name,address,age,phone) values (?,?,?,?,?)"
    connection.query(query, [id, name, address, age, phone], (error) => {
        if (error) {
            res.send("User Alrady Saved..!")
        } else {
            res.send("User Save Sucsess..!")
        }
    })
    console.log(req.body);
})

router.put('/', (req, res) => {
    const id = req.body.id;  
    const name = req.body.name;
    const address = req.body.email;
    const age = req.body.city;
    const phone = req.body.number;

    var query = "UPDATE user SET name=?, address=?, age=?, phone=? WHERE id=?";
    connection.query(query, [name, address, age, phone, id], (error, row) => {
        if (error) throw error;
        res.send(row)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    var query = "DELETE FROM user WHERE id=?";
    connection.query(query, [id], (error, row) => {
        if (error) {
            res.send("user Not Found")
        } else {
            res.send("user Delete")
            res.send(row)
        }
    })
})

router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM user WHERE id=?";

    connection.query(query[id],(error,row)=>{
        if(error){
            res.send("user Not Found")
        }else{
            res.send(row)
        }
    })
})

module.exports = router47