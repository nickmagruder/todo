import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
/* import { propTypes } from 'react-bootstrap/esm/Image'; */

function TodoList({ list, handleComplete, handleDelete }) {

  const styles = {
    pill: {
      cursor: "pointer",
    },
  };


  return (
    <>
      {list.map((item) => (
        <Toast key={item._id} onClose={() => handleDelete(item._id)}>
          <Toast.Header>
            <Badge
              pill
              style={styles.pill}
              variant={item.complete ? "danger" : "success"}
              onClick={() => handleComplete(item._id)}
            >
              {!item.complete ? "Pending" : "Complete"}
            </Badge>
            <strong className="mr-auto">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            {item.text}
      difficulty: {item.difficulty}
          </Toast.Body>
        </Toast>
      ))}
    </>
  )
}



export default TodoList;

{/*  return (
      <ul>
        {list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => handleComplete(item._id)}>
              <p>{item.assignee}</p>
              <p>{item.text}</p>
              <p>Difficulty: {item.difficulty}</p>
              <button type="button">X</button>
              <toast key=(item._id)
            </span>
          </li>
        ))}
      </ul>
    );
  }  */}