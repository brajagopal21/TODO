import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/todos");
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId: 5,
        }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const editTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
        todo: updatedTodo,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={() => addTodo()}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
            <button
              onClick={() => editTodo(todo.id, prompt("Enter updated todo:"))}
            >
              Edit
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
