import "../App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "../components/TodoForm/TodoForm";
import { TodoList } from "../components/TodoList/TodoList";
import { Header } from "../components/Header/Header";

import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);

  // function to fetch all todos from BE
  useEffect(() => {
    // Function to fetch todos
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-todos");
        setTodos(response.data); // Update the todos state with fetched data
      } catch (error) {
        console.error("There was an error fetching the todos:", error);
      }
    };
  
    fetchTodos();
  }, []);

  function addTodo(title) {
    const newTodo = {
      id: crypto.randomUUID(), // Generate a UUID for the new todo item
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);

    axios.post("http://localhost:8000/create-todo", newTodo).catch((error) => {
      console.error("There was an error adding the todo: ", error);
    });
  }


  function toggleTodo(id, status) {
    axios
      .put(`http://localhost:8000/todos/update-todo/${todo_id}`, { completed })
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed };
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error updating the todo: ", error.response);
      });
  }

  function deleteTodo(id) {
    axios
      .delete(`http://localhost:8000/delete-todo/${todo_id}`)
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the todo: ", error);
      });
  }

  return (
    <>  
      <Header />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos = {todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default Todo;