const data = [
  {
    id: 1,
    task: "Buy groceries",
    completed: false,
    category: "Personal",
  },
  {
    id: 2,
    task: "Finish homework",
    completed: false,
    category: "Education",
  },
  {
    id: 3,
    task: "Call mom",
    completed: false,
    category: "Personal",
  },
  {
    id: 4,
    task: "Go for a run",
    completed: true,
    category: "Health",
  },
  {
    id: 5,
    task: "Read a book",
    completed: false,
    category: "Leisure",
  },
  {
    id: 6,
    task: "Write blog post",
    completed: false,
    category: "Work",
  },
  {
    id: 7,
    task: "Clean the house",
    completed: false,
    category: "Home",
  },
  {
    id: 8,
    task: "Plan weekend trip",
    completed: true,
    category: "Personal",
  },
  {
    id: 9,
    task: "Attend meeting",
    completed: false,
    category: "Work",
  },
  {
    id: 10,
    task: "Practice guitar",
    completed: false,
    category: "Hobby",
  },
];

export const getTodos = () =>
  new Promise((r) => setTimeout(() => r(data), 3000));
export const updateTodoStatus = (updatedTodo) =>
  new Promise((r) => setTimeout(() => r(updatedTodo), 500));

export const createTodo = (createdTodo) =>
  new Promise((r) => setTimeout(() => r(createdTodo), 500));

export const deleteTodo = (deleteTodo) =>
  new Promise((r) => setTimeout(() => r(deleteTodo), 500));
