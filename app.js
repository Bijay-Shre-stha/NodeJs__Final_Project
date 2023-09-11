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
})

//Delete
app.get("/delete/:id", async (req, res) => {
    const { id } = req.params
    await node_todos.destroy({
        where: {
            id: id
        }
    })
    const script = `
    <script>
        alert("Note Deleted");
        window.location.href = "/";
    </script>
    `;
    res.send(script);
})

//edit
app.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const note = await node_todos.findByPk(id); // Assuming you have a 'findByPk' method for finding a single note by its primary key.
    res.render('edit', { note: note });
});

app.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const note = await node_todos.findByPk(id); // Assuming you have a 'findByPk' method for finding a single note by its primary key.
    res.render('edit', { note: note });
});

app.post("/edit/:id", async (req, res) => {
    const { id } = req.params; // Fix typo here
    try {
        const title = req.body.title;
        const description = req.body.description;
        const tag = req.body.tag;

        await node_todos.update(
            {
                title: title,
                tag: tag,
                description: description
            },
            {
                where: { id: id }
            }
        );

        const script = `
        <script>
            alert("Note updated");
            window.location.href = "/";
        </script>
        `;
        res.send(script);
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

