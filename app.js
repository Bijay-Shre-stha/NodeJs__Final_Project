const express = require('express');
const app = express();
const port = 3000;


//database connection
require("./modal/index.js")

// telling the nodejs to set view-engine to ejs
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/create",(req,res)=>{
    res.render("create");
})







app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

