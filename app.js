const express = require('express');
const app = express();
const port = 3000;


//database connection
require("./modal/index")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get("/", (req, resp)=>{
    resp.send("Hello world");
})








app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

