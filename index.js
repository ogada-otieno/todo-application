// const BASE_URL = 'https://new-todo-json-server-vercel.vercel.app/todos/';
const BASE_URL = 'http://localhost:8001/todos';

const createForm = document.getElementById('create-form'); // grab our form for creating new todo
const createTitleInput = document.getElementById('create-title'); // input field for entering todo title
const updateForm = document.getElementById('update-form'); // grab our form for updating todo
const updateTitleInput = document.getElementById('update-title'); // input field for updating todo title
const todosSection = document.getElementById('todos-section'); // section for displaying all todos
const singleTodoSection = document.getElementById('single-todo-section'); // section for displaying single todo item

document.addEventListener('DOMContentLoaded', () => {
  // VIEW ALL TODOS fetchAndDisplayTodos()
  // synchronous functions
  //   let myName = 'rodgers ogada';
  //   console.log(`my name is ${myName}`);
  // asynchronous functions

  // METHODS:--> GET, POST, PUT, PATCH, DELETE

  // PUT --> updates the whole dataset
  // PATCH --> updates only the specified attribute in out data

  async function fetchAndDisplayTodos() {
    //   end result ==> PROMISE
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {},
    });

    //   check if the request was successful
    if (response.ok) {
      // return a list of todos from our API
      const result = await response.json();
      console.log('data:', result);
      // create 'ul' element for holding each todo item
      let ul = document.createElement('ul');

      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
        const li = document.createElement('li');
        li.innerText = result[i].title;

        //   create a button that will load more details about the todo
        const viewMoreButton = document.createElement('button');
        viewMoreButton.innerText = 'View More Details';
        viewMoreButton.addEventListener('click', () => {
          fetchAndDisplaySingleTodo(result[i]);
        });

        //   create a button that will delete a todo
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Todo';
        deleteButton.addEventListener('click', () => {
          console.log(`todo ID: ${result[i].id} was clicked for deletion!`);
          deleteSingleTodo(result[i].id);
        });

        li.appendChild(viewMoreButton);
        li.appendChild(deleteButton);

        ul.appendChild(li);
      }
      //   console.log(ul);
      todosSection.appendChild(ul);
      //   console.log(todosSection);
    }
  }

  async function fetchAndDisplaySingleTodo(todoItem) {
    // alert(`todo ID: ${todoItemId} was clicked for viewing more details!`);
    const response = await fetch(`${BASE_URL}/${todoItem.id}`, {
      method: 'GET',
    });

    if (response.ok) {
      const result = await response.json();
      console.log('result:', result);

      // displaying the single todo items details on click
      singleTodoSection.innerText = JSON.stringify(result, null, 2);
      singleTodoSection.style.border = '2px solid red';
      singleTodoSection.style.padding = '2rem'; // equivalent to 32px
      singleTodoSection.style.margin = '1rem'; // equivalent to 16px

      // prepare our form for updating the todo item
      updateTitleInput.value = result.title;

      updateForm.onsubmit = async (event) => {
        event.preventDefault();
        const updatedTitle = updateTitleInput.value;
        console.log('updated title:', updatedTitle);

        await fetchAndUpdateTodo({
          // spread operator
          ...todoItem,
          title: updatedTitle,
        });
      };
    }
  }

  // update an existing todo

  async function fetchAndUpdateTodo(todoItem) {
    const response = await fetch(`${BASE_URL}/${todoItem.id}`, {
      method: 'PATCH',
      body: JSON.stringify(todoItem),
    });

    if (response.ok) {
      const result = await response.json();
      alert('Updated successfully!');
    } else {
      alert('An error occured!');
    }
  }

  async function deleteSingleTodo(todoItemId) {
    const response = await fetch(`${BASE_URL}/${todoItemId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert(`todo ID: ${todoItemId} was clicked and deleted`);
    } else {
      alert(`Failed to delete todo`);
    }
  }

  async function createTodo() {
    const newTodo = { title: createTitleInput.value, completed: false };
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      const result = await response.json();
      alert(`Todo created successfully: ${JSON.stringify(result, null, 2)}`);
    } else {
      alert('An error occured');
    }
  }

  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createTodo();
  });

  fetchAndDisplayTodos();
});
