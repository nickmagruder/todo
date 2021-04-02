import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
/* import Paginate from './paginate.js'; */
import axios from 'axios';
import useAjax from '../../hooks/useAjax.js';
import AuthProvider from '../context/AuthProvider';
import Login from '../auth/Login';
import Auth from '../auth/Auth';
import Header from '../../components/header/header';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {
  const [request, response] = useAjax();
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);


  /*   useEffect(() => {
      console.log('response updated', response);
      response.results && setData(response.results);
      // setData(response.results);
    }, [response]); */


  useEffect(() => {
    setData(response);
  }, [response]);



  const addItem = (item) => {
    let options = {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      data: item,
    };
    request(options);
  };



  const deleteItem = id => {
    const url = `${todoAPI}/${id}`;
    const options = {
      url: url,
      method: 'delete',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    };
    request(options);
  };

  const getItems = async () => {
    try {
      let request = await axios({
        method: 'get',
        url: todoAPI,
      });
      let todos = request.data.results;
      setList(todos);
    }
    catch (e) {
      console.warn(e.message);
    }
  };



  const toggleComplete = async (id) => {
    let newValue = list.filter((list) => list._id === id)[0];

    if (newValue._id) {
      let request = await axios({
        method: 'put',
        url: `${todoAPI}/${id}`,
        data: { complete: true },
      });
      getItems();
      return request;
    }
  };


  /*   useEffect(() => { getItems(); }, []); */

  useEffect(() => {
    getItems();
  }, [toggleComplete, deleteItem]);


  return (
    <>
      <AuthProvider>
        <Header />
        <Auth capability="read">
          <p>You are authorized!!</p>

          <div>
            <h2>
              To do List Manager, there are {list.filter(item => !item.complete).length} Items To Complete
            </h2>
          </div>

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
        </Auth>
      </AuthProvider>
    </>
  );
}


/* export default ToDo; */