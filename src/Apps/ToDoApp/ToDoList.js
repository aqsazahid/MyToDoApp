import { useState,useEffect } from "react";
import { InputGroup, FormControl,Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import data from "./data.json";

function ToDoList () {
  const [ toDoList, setToDoList ] = useState(data);
  const [userInput, setUserInput] = useState(''); 
  // const [disabled,setDisabled] = useState(true);
  const [taskStatus,setTaskStatus] = useState('');
  const [errors, setErrors] = useState(false);
  const status = [
    { value: '', label: 'Select task status' },
    { value: 'option1', label: 'TODO' },
    { value: 'option2', label: 'IN-PROGRESS' },
    { value: 'option3', label: 'COMPLETED' }
  ];

  // useEffect(() => {
  //   userInput && taskStatus !== "" ? setDisabled(false) : setDisabled(true);
  // }, [disabled,userInput,taskStatus]);
  // // Set a user input value
  const updateInput = (event) => {
    const newValue = event.target.value;
    // newValue !== "" ? setDisabled(false) : setDisabled(true);
    setUserInput(newValue);
  }
  const addItem = () => {
    debugger
    if(userInput !== "" && taskStatus !== "") {
      let copy = [...toDoList];
      // copy.push({id: toDoList.length + 1, task: userInput, complete: false });
      if(taskStatus ===  'TODO') {
        copy.push({id: toDoList.length + 1, task: userInput, complete: false, inprogress:false, todo:true });
      }
      if(taskStatus ===  'IN-PROGRESS') {
        copy.push({id: toDoList.length + 1, task: userInput, complete: false, inprogress:true,todo:false });
      }
      if(taskStatus ===  'COMPLETED') {
        copy.push({id: toDoList.length + 1, task: userInput, complete: true, inprogress:false, todo:false });
      }
      setToDoList(copy);
      // setUserInput("");
    }
  }

  const deleteItem = (item_id) => {
    let copy  = [...toDoList];
    let updateList =copy.filter((item) => item.id !== item_id);
    setToDoList(updateList);
  }

  const editItem = (index) =>  {
    let editlistToDo = [...toDoList];
    let editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      const updatedTodos = [...editlistToDo];
      updatedTodos[index].task = editedTodo;
      setToDoList(updatedTodos)
    }
  }

  const moveToNextStatus = (index) =>  {
    let editlistToDo = [...toDoList];
    
    // let editedTodo = prompt('Edit the todo:');
    // if (editedTodo !== null && editedTodo.trim() !== '') {
    //   const updatedTodos = [...editlistToDo];
    //   updatedTodos[index].task = editedTodo;
    //   setToDoList(updatedTodos)
    // }
  }



  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      addItem()
    }
  }

  const handleSelectStatus = (e) => {
    debugger
    setTaskStatus(e.target.value)
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
    }
    setErrors(true);
  };

  return (
    <Container>
      <Row
        style = {{
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
              <Form.Select value={taskStatus} onChange={handleSelectStatus} label="Agree to terms and conditions" aria-label="Default select example" 
              required
              className={`form-control ${errors.taskStatus ? 'is-invalid' : ''}`}
              >
                {/* <option value="" disabled>Select an option</option> */}
                {status.map((item, index) => {
                  return (
                    <option value={item.label} key={item.value}>{item.label}</option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                  Please set status.
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
            <Col md={{ span: 6}}>
            <ListGroup>
                  <div key = {index} > 
                    <ListGroup.Item
                        variant="dark"
                        action
                        style={{display:"flex",justifyContent:'space-between'
                      }}
                    >
                      {item.task}
                        <span>
                          <Button style={{marginRight:"10px"}}
                            variant = "light" onClick={() => deleteItem(item.id)}>Delete</Button>
                          <Button style={{marginRight:"10px"}} variant = "light" onClick={() => editItem(index)}>Edit</Button>
                          <Button onClick={() => moveToNextStatus(index)} className={`btn ${item.complete ? 'btn-success' : 'btn-primary'}`}>{item.todo ? "Move to In-Progress" : item.inprogress ? 'Move to Complete' : 'Completed'}</Button>
                        </span>
                    </ListGroup.Item>
                  </div>
            </ListGroup>
          </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ToDoList;
