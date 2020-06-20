const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const ejs=require('ejs')
app.set('view engine','ejs');
app.get('/',function(req,res)
{
 res.render("form")
});
app.listen(3000);
console.log("Server is running at port 3000");