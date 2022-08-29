const express=require('express');
const app=express();
const port = 4000;
const customer=require('./router/customer');


app.use(express.json())

// app.use('/customer',customer)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})