const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../config/db.config');

const connection = mysql.createConnection(db.database);
connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        var customertable = "CREATE TABLE IF NOT EXISTS customer(id varchar(255) PRIMARY KEY,name varchar(255), email varchar(255), city varchar(255), number varchar(255))"
        connection.query(customertable, (error, result) => {
            console.log("Connect database");
        })
    }
})

router.get('/', (req, res) => {
    const query = "SELECT * FROM customer"
    connection.query(query, (error, row) => {
        if (error) {
            res.send("No Customer")
        } else {
            res.send(row)
        }
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const city = req.body.city;
    const number = req.body.number;

    const query = "INSERT INTO customer (id,name,email,city,number) values (?,?,?,?,?)"
    connection.query(query, [id, name, email, city, number], (error) => {
        if (error) {
            res.send("Customer Alrady Saved..!")
        } else {
            res.send("Customer Save Sucsess..!")
        }
    })
    console.log(req.body);
})

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const city = req.body.city;
    const number = req.body.number;

    var query = "UPDATE customer SET name=?, email=?, city=?, number=? WHERE id=?";
    connection.query(query, [name, email, city, number, id], (error, row) => {
        if (error) throw error;
        res.send(row)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    var query = "DELETE FROM customer WHERE id=?";
    connection.query(query, [id], (error, row) => {
        if (error) {
            res.send("Customer Not Found")
        } else {
            res.send("Customer Delete")
            res.send(row)
        }
    })
})

router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM customer WHERE id=?";

    connection.query(query[id],(error,row)=>{
        if(error){
            res.send("Customer Not Found")
        }else{
            res.send(row)
        }
    })
})

module.exports = router