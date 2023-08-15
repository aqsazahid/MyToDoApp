import { useState, useEffect } from "react";
import { InputGroup, FormControl, Form, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import data from "./data.json";

function ToDoList() {
  const [toDoList, setToDoList] = useState(data);
  const [userInput, setUserInput] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [errors, setErrors] = useState(false);
  const [timer, setTimer] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);

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
    debugger
    if (userInput !== "" && taskStatus !== "") {
      let copy = [...toDoList];
      // copy.push({id: toDoList.length + 1, task: userInput, complete: false });
      // if (taskStatus === 'TODO') {
        copy.push({ id: toDoList.length + 1, task: userInput, complete: false, inprogress: false, todo: true, status: "todo" ,startTime: null, elapsedTime: 0});
      // }
      // if (taskStatus === 'IN-PROGRESS') {
      //   copy.push({ id: toDoList.length + 1, task: userInput, complete: false, inprogress: true, todo: false, status: "in-progress" });
      // }
      // if (taskStatus === 'COMPLETED') {
      //   copy.push({ id: toDoList.length + 1, task: userInput, complete: true, inprogress: false, todo: false, status: "completed" });
      // }
      setToDoList(copy);
    }
  }

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

  const moveToNextStatus = (item, index) => {
    debugger
    // if(item.todo) {
    //   item.inprogress = true;
    // }
    // item.todo ? item.inprogress = true
    let copy = [...toDoList];
    if (item.status === 'todo') {
      copy[index].todo = false;
      copy[index].inprogress = true;
      copy[index].complete = false;
      copy[index].status = "in-progress";
      setToDoList(copy);
      setTaskStatus(item.status);
      
    }
    else if (item.status === 'in-progress') {
      copy[index].todo = false;
      copy[index].inprogress = false;
      copy[index].complete = true;
      copy[index].status = "completed";
      setToDoList(copy);
      setTaskStatus(item.status);
    }

    // let editlistToDo = [...toDoList];

    // let editedTodo = prompt('Edit the todo:');
    // if (editedTodo !== null && editedTodo.trim() !== '') {
    //   const updatedTodos = [...editlistToDo];
    //   updatedTodos[index].task = editedTodo;
    //   setToDoList(updatedTodos)
    // }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  const handleSelectStatus = (e) => {
    setTaskStatus(e.target.value)
  }

  const handleSubmit = (e) => {
    debugger
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
          <Col md={{ span: 2 }}>
            <Form.Group controlId="inputtaskstatus" className="mb-3">
              <Form.Select
                value={taskStatus}
                onChange={handleSelectStatus}
                required
                // isInvalid={!!errors.status}
                className={`form-control ${errors.taskStatus ? 'is-invalid' : ''}`}
              >
                {/* <option value="" disabled>Select an option</option> */}
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
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <Button
                variant="dark"
                className="mt-2"
                // disabled={errors}
                type="submit"
              // onClick={() => addItem()}
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
              <Card>
                <div key={index} >
                  <Card.Body>
                    <Card.Title>Name: {item.task}</Card.Title>
                    <Card.Text>
                      <p>Status: {item.status}</p>
                      <Button style={{ marginRight: "10px" }}
                        variant="light" onClick={() => deleteItem(item.id)}>Delete</Button>
                      <Button style={{ marginRight: "10px" }} variant="light" onClick={() => editItem(index)}>Edit</Button>
                      <Button onClick={() => moveToNextStatus(item, index)} className={`btn ${item.todo ? "btn-primary" : item.inprogress ? 'btn-warning' : 'btn-success'}`}>{item.todo ? "Move to In-Progress" : item.inprogress ? 'Move to Complete' : 'Completed'}</Button>
                      <p><p>Timer: {timer} seconds</p></p>
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

