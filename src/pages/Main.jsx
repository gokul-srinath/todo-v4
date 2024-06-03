import React, { useState } from "react";
import ListTodos from "../components/ListTodos";
import Modal from "../components/Modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodoStatus,
} from "../data/todo";

const Main = () => {
  const [categories, setCategories] = useState("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const query = useQuery("todos", getTodos);

  const mutation = useMutation("updateTodoStatus", updateTodoStatus, {
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData("todos", (oldTodos) =>
        oldTodos.map((oldTodo) =>
          oldTodo.id === updatedTodo.id
            ? { ...oldTodo, completed: updatedTodo.completed }
            : oldTodo
        )
      );
    },
  });

  const createMutation = useMutation("createTodo", createTodo, {
    onSuccess: (createdTodo) => {
      queryClient.setQueryData("todos", (oldTodos) => {
        return [...oldTodos, createdTodo];
      });
    },
  });

  const deleteMutation = useMutation("deleteTodo", deleteTodo, {
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData("todos", (oldTodos) => {
        return oldTodos.filter((oldTodo) => oldTodo.id !== deletedTodo.id);
      });
    },
  });

  const toggleMark = (todo) => {
    // todo.completed = !todo.completed;
    mutation.mutate({ ...todo, completed: !todo.completed });
  };

  const deleteHandler = (todo) => {
    deleteMutation.mutate(todo);
  };

  const [todo, setTodo] = useState({
    task: "",
    category: "",
    completed: false,
  });

  const createTask = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const selectHandler = (e) => {
    setCategories(e.target.value);
  };

  const changeHandler = (e) => {
    const key = e.target.name;
    if (key === "completed") {
      setTodo({ ...todo, [key]: Boolean(e.target.value) });
      return;
    }
    setTodo({ ...todo, [key]: e.target.value });
  };

  const createTodoHandler = (e) => {
    e.preventDefault();

    createMutation.mutate({
      ...todo,
      id: Math.floor(Math.random() * (1000 - 300 + 1)) + 300,
    });
    closeModal();
    setTodo({
      task: "",
      category: "",
      completed: false,
    });
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setTodo({
      task: "",
      category: "",
      completed: false,
    });
  };

  return (
    <>
      <header>
        <h3>Todos:</h3>
        <div className="buttons">
          <button onClick={createTask}>Create Task</button>
          {/* <button onClick={() => setCategories(!categories)}>{categories ? 'back' : 'categories'}</button> */}
          <select
            className="select categories"
            onChange={selectHandler}
            value={categories}
          >
            <option value={"todos"}>todos</option>
            <option value={"category"}>categories</option>
            <option value={"completed"}>status</option>
          </select>
        </div>
      </header>
      <ListTodos categories={categories} {...query} toggleMark={toggleMark} deleteHandler={deleteHandler}/>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={createTodoHandler}>
          <h3>Create Todo:</h3>
          <div className="input-container">
            <label htmlFor="task">Task:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={todo["task"]}
              onChange={changeHandler}
            />
          </div>
          <div className="input-container">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={todo["category"]}
              onChange={changeHandler}
            />
          </div>
          <div className="input-container">
            <label htmlFor="status">Completed:</label>
            <select
              id="status"
              name="completed"
              onChange={changeHandler}
              value={todo["completed"]}
            >
              <option defaultValue={false} value={false}>
                pending
              </option>
              <option value={true}>completed</option>
            </select>
          </div>
          <div className="buttons">
            <button type="submit">Create Todo</button>
            <button onClick={clearHandler}>clear</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Main;
