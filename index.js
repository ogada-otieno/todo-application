// const BASE_URL = 'https://new-todo-json-server-vercel.vercel.app/todos/';
const BASE_URL = 'http://localhost:8001/todos';

const createForm = document.getElementById('create-form'); // grab our form for creating new todo
const createTitleInput = document.getElementById('create-title'); // input field for entering todo title
const updateForm = document.getElementById('update-form'); // grab our form for updating todo
const updateTitleInput = document.getElementById('update-title'); // input field for updating todo title
const todosSection = document.getElementById('todos-section'); // section for displaying all todos
const singleTodoSection = document.getElementById('single-todo-section'); // section for displaying single todo item

