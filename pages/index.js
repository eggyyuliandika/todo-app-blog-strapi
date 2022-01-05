import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";
export default function Home() {
  const [todos, setTodos] = useState([]);
  // console.log(todos);
  // useEffect(async () => {
  //   const result = await axios.get("http://localhost:1337/api/todos");
  //   setTodos(result?.data);
  // }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await axios.get("http://localhost:1337/api/todos");
      setTodos(result?.data?.data);
    }
    fetchMyAPI();
  }, []);

  const addTodo = async (todoText) => {
    if (todoText && todoText.length > 0) {
      const result = await axios.post("http://localhost:1337/api/todos", {
        todoText: todoText,
      });
      setTodos([...todos, result?.data?.data]);
    }
  };

  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete("http://localhost:1337/api/todos/:id");
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };

  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const result = await axios.put("http://localhost:1337/api/todos/:id", {
        todoText: newTodoText,
      });
      const moddedTodos = todos.map((_todo) => {
        if (_todo.id === todo.id) {
          return result?.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };

  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}
