import React, { useState } from "react";

function ToDoForm() {
    const [tasks, setTasks] = useState([
        { text: "Pickup Kids", completed: false },
        { text: "Buy Groceries", completed: false },
        { text: "Take Jimmy To practice", completed: false },
        { text: "Drop Jimmy off after practice", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");

    function handleInputs(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask !== "") {
            setTasks(tasks => [...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function completeTask(index) {
        setTasks(tasks =>
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function setShowAll() {
        setFilter("all");
    }

    function setShowCompleted() {
        setFilter("completed");
    }

    function setShowNonCompleted() {
        setFilter("non-completed");
    }

    return (
        <div className="toDoItems">
            <h1 className="to-do-tracker">To-Do List</h1>

            <div>
                <input type="text" placeholder="Enter A Task" value={newTask} onChange={handleInputs} />
                <button className="add-btn" onClick={addTask}>Add Task</button>
                <button className="filter-btn" onClick={setShowAll}>Show All</button>
                <button className="filter-btn" onClick={setShowCompleted}>Show Completed</button>
                <button className="filter-btn" onClick={setShowNonCompleted}>Show Non-Completed</button>
            </div>
            <ol>
                {tasks
                    .filter(task => 
                        filter === "all" || 
                        (filter === "completed" && task.completed) || 
                        (filter === "non-completed" && !task.completed)
                    )
                    .map((task, index) => 
                    <li key={index}>
                        <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button className="comp-btn" onClick={() => completeTask(index)}>Done</button>
                        <button className="del-btn" onClick={() => deleteTask(index)}>Delete</button>
                    </li>)}
            </ol>
    </div>
);
}

export default ToDoForm;