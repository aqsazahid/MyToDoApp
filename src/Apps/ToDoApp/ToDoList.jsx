import { useState, useEffect } from "react";
import React from 'react';
import { InputGroup, FormControl, Form, Card,Badge,Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import data from "./data.json";

function ToDoList() {
  const [toDoList, setToDoList] = useState(data);
  const [userInput, setUserInput] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [errors, setErrors] = useState(false);
  
  const status = [
    { value: '', label: 'Select task status' },
    { value: 'TODO', label: 'TODO' },
    { value: 'IN-PROGRESS', label: 'IN-PROGRESS' },
    { value: 'COMPLETED', label: 'COMPLETED' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setToDoList((prevTasks) =>
        prevTasks.map((task) =>
          task.status === 'IN-PROGRESS'
            ? { ...task, elapsedTime: task.elapsedTime + 1 }
            : task
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const updateInput = (event) => {
    const newValue = event.target.value;
    // newValue !== "" ? setDisabled(false) : setDisabled(true);
    setUserInput(newValue);
  }
  const addItem = () => {
    if (userInput !== "" && taskStatus !== "") {
      let copy = [...toDoList];
      copy.push({ id: toDoList.length + 1, task: userInput, status: "TODO" ,startTime: null, elapsedTime: 0});
      setToDoList(copy);
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const deleteItem = (item_id) => {
    let copy = [...toDoList];
    let updateList = copy.filter((item) => item.id !== item_id);
    setToDoList(updateList);
  }

  const editItem = (index) => {
    let editlistToDo = [...toDoList];
    let editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      const updatedTodos = [...editlistToDo];
      updatedTodos[index].task = editedTodo;
      setToDoList(updatedTodos)
    }
  }

  const startTask = (taskId) => {
    setToDoList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'IN-PROGRESS', startTime: Date.now() } : task
      )
    );
  };

  const completeTask = (taskId) => {
    setToDoList((prevTasks) => 
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'COMPLETED' } : task
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else {
      addItem();
      setUserInput("");
      setTaskStatus(status[0]);
    }
    setErrors(true);
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>
      <hr />
      <Form onSubmit={handleSubmit} noValidate validated={errors}>
        <Row>
          <Col md={{ span: 5 }}>
            <Form.Group controlId="inputField" className="mb-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="add task . . . "
                  size="lg"
                  value={userInput}
                  onChange={updateInput}
                  onKeyPress={handleKeyDown}
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                  className={`form-control ${errors.userInput ? 'is-invalid' : ''}`}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a task.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          {/* <Col md={{ span: 2 }}>
            <Form.Group controlId="inputtaskstatus" className="mb-3">
              <Form.Select
                value={taskStatus}
                onChange={handleSelectStatus}
                required
                className={`form-control ${errors.taskStatus ? 'is-invalid' : ''}`}
              >
                {status.map((item) => {
                  return (
                    <option value={item.value} key={item.value}>{item.label}</option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select status.
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}
          <Col>
            <InputGroup className="mb-3">
              <Button
                variant="dark"
                className="mt-2"
                type="submit"
              >
                ADD
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <Row>
        {toDoList.map((item, index) => {
          return (
            <Col md={{ span: 4 }}>
              <Card className="mb-3">
                <div key={index} >
                  <Card.Body>
                    <Card.Title>{item.task}</Card.Title>
                    <Card.Text>
                      {item.status === 'TODO' && (
                        <p>status: <Badge bg="primary"> {item.status}</Badge></p>
                      )}
                      {item.status === 'IN-PROGRESS' && (
                        <p>status: <Badge bg="warning"> {item.status}</Badge></p>
                      )}
                      {item.status === 'COMPLETED' && (
                        <p>status: <Badge bg="success"> {item.status}</Badge></p>
                      )}
                      <Button style={{ marginRight: "10px" }}
                        variant="outline-danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                      <Button style={{ marginRight: "10px" }} variant="outline-info" onClick={() => editItem(index)}>Edit</Button>
                      {/* <Button onClick={() => moveToNextStatus(item, index)} className={`btn ${item.status === 'TODO' ? "btn-primary" : item.status === 'IN-PROGRESS' ? 'btn-warning' : 'btn-success'}`}>{item.status === "TODO" ? "Start Task" : item.status === "IN-PROGRESS" ? 'Move to Complete' : 'Completed'}</Button> */}
                      {item.status === 'IN-PROGRESS' && (
                        <div>
                          <p className="mt-2">Timer: {formatTime(item.elapsedTime)} seconds</p>
                          <Button variant="warning" onClick={() => completeTask(item.id)}>Complete Task</Button>
                        </div>
                      )}
                      {item.status === 'COMPLETED' && (
                        <div>
                          <p className="mt-2 mb-0"><span className="fw-bolder">Task completed in</span>: {formatTime(item.elapsedTime)} seconds</p>
                        </div>
                      )}
                      {item.status === 'TODO' && (
                        <Button variant="info" onClick={() => startTask(item.id)}>Start Task</Button>
                      )}
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ToDoList;

