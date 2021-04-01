import { React, useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Paginate from './paginate.js';
import axios from 'axios';
import useAjax from '../../useAjax.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

function ToDo() {
  const [request, response] = useAjax();
  const [list, setList] = useState([]);
  const [data, setData] = useState();


  useEffect(() => {
    request({ url: 'https://api-js401.herokuapp.com/api/v1/todo' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]); 

  useEffect(() => {
    setData(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const addItem = (item) => {
    let options = {
      url: todoAPI,
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      data: item
    }

    request(options);
  }

/*   const getItem = (item) => {
    let options = {
      url: todoAPI,
      method: 'get',
      mode: 'cors',
    }
    request(options);
  }
 */


/*   const addItem = async (item) => {
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
  } */



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getItem]);


  return (
    <>
      <header>
        <h2>
          {console.log(list, 'LISTTTTTTTTTTTTTTTTTTTTTTTTTT')}
          To do List Manager, there are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm addItem={addItem} />
          <Paginate />
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
