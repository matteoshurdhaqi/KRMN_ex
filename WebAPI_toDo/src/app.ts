import { log } from 'console';
import express from 'express';

const app = express();
app.use(express.json());
const PORT = 3000;

interface Task{
    id: number;
    name: string;
    completed: boolean;
}

let tasks: Task[] = [
    {
        id: 0,
        name: 'Dormire',
        completed: false,
    },
    {
        id: 2,
        name: 'Card',
        completed: true,
    },
    {
        id: 3,
        name: 'Card',
        completed: false,
    }
];
// GET todos?completed=true
app.get('/todos', (req, res) => {
    const completed = req.query.completed;
    if(completed) {
        return res.send(tasks)
    }
    const taskTodo = tasks.filter(task => !task.completed);
    return res.send(taskTodo);
})
// GET todos
app.get('/todos', (req, res) => {
    const taskTodo = tasks.filter(task => !task.completed);
    return res.send(taskTodo);
})
// GET todos/id
app.get('/todos/:id', (req, res) =>{
    const id = Number(req.params.id);
    const searchedTask = tasks.find(task => task.id === id);
    !searchedTask ? res.status(404).send({Error: 'Task not found'}) : res.send(searchedTask);
})

// POST todos
app.post('/todos', (req, res)=>{
    const body = req.body;
    let id = 0;
    const lastTask = tasks[tasks.length - 1];
    
    if(lastTask){
        id = lastTask.id + 1;
    }

    const newTask: Task = {
        id,
        name: body.name,
        completed: false,
    }

    tasks.push(newTask);
    return res.send(newTask)
})

// POST/id
app.post('/todos/:id/complete', (req, res) =>{
    const id = Number(req.params.id);
    const searchedTask = tasks.findIndex(task => task.id === id);
    if(!tasks[searchedTask]) return res.status(404).send({Error: 'Task not found'}); 
    if(tasks[searchedTask].completed) return res.status(409).send({Error: 'Task already done'});
    tasks[searchedTask].completed = true;
    return res.send(tasks[searchedTask]);
})


app.listen(PORT, () => {
    console.log('🚀 Server started at http://localhost:3000');
});