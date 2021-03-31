import { React, useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';
/* import { v4 as uuidv4 } from 'uuid'; */

import './todo.scss';


const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

function ToDo() {
  const [list, setList] = useState([]);


  const addItem = async (item) => {
    try {
      let request = await axios({
        method: 'post',
        url: todoAPI,
        data: item 
      })
      getItem();
      return request;
    }
    catch (e) {
      console.warn(e.message);
    }
  }



  const getItem = async () => {
    try {
      let request = await axios({
        method: 'get',
        url: todoAPI
      })
      let todos = request.data.results;
      setList(todos);
    }
    catch (e) {
      console.warn(e.message);
    }
  }


  const toggleComplete = async (id) => {
    let newValue = list.filter((list) => list._id === id)[0];

    if (newValue._id) {
      let request = await axios({
        method: 'put',
        url: `${todoAPI}/${id}`,
        data: { complete: true }
      })
      getItem();
      return request;
    };
  };

  const deleteItem = async (id) => {
    try {
      let request = await axios({
        method: 'delete',
        url: `${todoAPI}/${id}`,
      })
      getItem();
      return request;
    }
    catch (e) {
      console.warn(e.message);
    }
  }

  useEffect(() => {
    getItem();
  }, []);


  return (
    <>
      <header>
        <h2>
          To do List Manager, there are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm addItem={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={deleteItem}
          />
        </div>
      </section>
    </>
  );
}


export default ToDo;
