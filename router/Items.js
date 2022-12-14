const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../config/db.config');

const connection = mysql.createConnection(db.database);
connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        var customertable = "CREATE TABLE IF NOT EXISTS item(id varchar(255) PRIMARY KEY,name varchar(255), description varchar(255), qty varchar(255), price varchar(255))"
        connection.query(customertable, (error, result) => {
            console.log("Connect database");
        })
    }
})

router.get('/', (req, res) => {
    const query = "SELECT * FROM item"
    connection.query(query, (error, row) => {
        if (error) {
            res.send("No Item")
        } else {
            res.send(row)
        }
    })
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.email;
    const qty = req.body.city;
    const price = req.body.number;

    const query = "INSERT INTO item (id,name,description,qty,price) values (?,?,?,?,?)"
    connection.query(query, [id, name, description, qty, price], (error) => {
        if (error) {
            res.send("Item Alrady Saved..!")
        } else {
            res.send("Item Save Sucsess..!")
        }
    })
    console.log(req.body);
})

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.email;
    const qty = req.body.city;
    const price = req.body.number;

    var query = "UPDATE item SET name=?, description=?, qty=?, price=? WHERE id=?";
    connection.query(query, [name, description, qty, price, id], (error, row) => {
        if (error) throw error;
        res.send(row)
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    var query = "DELETE FROM item WHERE id=?";
    connection.query(query, [id], (error, row) => {
        if (error) {
            res.send("Item Not Found")
        } else {
            res.send("Item Delete")
            res.send(row)
        }
    })
})

router.get('/:id',(res,req)=>{
    const id=req.params.id
    var query="SELECT * FROM item WHERE id=?";

    connection.query(query[id],(error,row)=>{
        if(error){
            res.send("Item Not Found")
        }else{
            res.send(row)
        }
    })
})

module.exports = router