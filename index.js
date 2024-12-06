const express = require("express")
const app = express()
const cors = require("cors")
const pool = require('./db')

//middlewares
app.use(cors())
app.use(express.json())


//ROUTES

//create a todo

app.post("/todos", async (req,res)=>{
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo_list(description) VALUES($1)",[description])

        res.json({
            "message" : "new todo saved"
        })
    } catch (error) {
        console.error(error.message)
    }

})

// get all todos
app.get("/todos", async (req,res)=>{
    try {
        const getTodos = await pool.query("SELECT * FROM todo_list")
        res.json(getTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get specific todo
app.get("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params
        const getSpecificTodo = await pool.query("SELECT * FROM todo_list WHERE id = ($1)",[id])
        res.json(getSpecificTodo.rows)
    } catch (error) {
        console.error(error.message)
    }
})


// Update todo
app.put("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query("UPDATE todo_list SET description = ($1) WHERE id = ($2)",[description,id])
        res.json({
            "message" : "Todo Updated"
        })
    } catch (error) {
        console.error(error)
    }
})

// delete a specific todo
app.delete("/todos/:id", async (req,res)=>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo_list WHERE id = ($1)",[id])
        res.json({
            "message" : "Todo deleted"
        })
    } catch (error) {
        console.error(error)
    }
})


//Server setup
app.listen(5000,()=>{
    console.log("Server started on port 5000")
})