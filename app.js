const express=require('express');
const app=express();
const port = 4000;
const customer=require('./router/customer');
const item=require('./router/Items');
const user=require('./router/user');


app.use(express.json())

app.use('/customer',customer)
app.use('/item',item)
app.use('/user',user)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})