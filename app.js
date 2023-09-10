const express = require('express');
const app = express();
const { node_todos } = require("./modal/index.js")
const port = 3000;


//database connection
require("./modal/index.js")

// telling the nodejs to set view-engine to ejs
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", async (req, res) => {
    const allNotes = await node_todos.findAll()
    res.render("index", {
        node_todos: allNotes
    });
})

app.get("/create", (req, res) => {
    res.render("create");
})

app.post("/create", async (req, res) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const tag = req.body.tag

        await node_todos.create({
            title: title,
            tag: tag,
            description: description
        })
        const script = `
        <script>
            alert("Note added");
            window.location.href = "/";
        </script>
        `;
        res.send(script);
    } catch (err) {
        console.log(err);
    }
})


//See More
app.get("/note/:id", async (req, res) => {
    const { id } = req.params
    const note = await node_todos.findAll({
        where: {
            id: id
        }
    })
    res.render("seeMore.ejs", {
        note: note
    })
}
)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

