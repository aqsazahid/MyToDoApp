import { useState, useCallback } from "react";
import React from 'react';
import ReactDOM from "react-dom/client";
import  ChildCallBack from "./ChildCallBack";
import Container from "react-bootstrap/Container";

const IndexCallBack = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  //child component re render even todo not change
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <>
        <Container className="pt-5">
            <ChildCallBack todos={todos} addTodo={addTodo} />
            <hr />
            <div>
                Count: {count}
                <button onClick={increment}>+</button>
            </div>
        </Container>
    </>
  );
};

export default IndexCallBack;