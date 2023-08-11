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
  const [disabled,setDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const [taskStatus,setTaskStatus] = useState(['In-Progress','Completed']);

  useEffect(() => {
    userInput !== "" ? setDisabled(false) : setDisabled(true);
  }, [disabled,userInput]);
  // Set a user input value
  const updateInput = (event) => {
    const newValue = event.target.value;
    newValue !== "" ? setDisabled(false) : setDisabled(true);
    setUserInput(newValue);
  }
  const addItem = () => {
    if(userInput !== "") {
      let copy = [...toDoList];
      copy.push({id: toDoList.length + 1, task: userInput, complete: false });
      setToDoList(copy);
      setUserInput("");
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

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      addItem()
    }
  }

  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setShowError(true);
    } else {
      setShowError(false);
      // Handle form submission
    }
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
      <Form onSubmit={handleSubmit} validated={showError}>
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
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={{ span: 2 }}>
            <Form.Group controlId="inputtaskstatus" className="mb-3">
              <Form.Select aria-label="Default select example" required>
                <option>Task status</option>
                {taskStatus.map((item, index) => {
                  return (
                    <option value="1">{item}</option>
                  );
                })}
              </Form.Select>
              {/* <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback> */}
            </Form.Group>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <Button
                variant="dark"
                className="mt-2"
                // disabled={disabled}
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
                          <Button onClick={() => editItem(index)} className={`btn ${item.complete ? 'btn-success' : 'btn-primary'}`}>{item.complete ? 'Completed' : 'Move To Complete'}</Button>
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
