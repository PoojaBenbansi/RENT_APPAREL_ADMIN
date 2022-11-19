import React, { Fragment } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Col, Row } from 'react-bootstrap';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentTodos: [],
      pageNumbers: [],
      currentPage: 1,
      todosPerPage: 6,
    };
  }

  componentDidMount() {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    axios
      .get(
        'https://jsonplaceholder.typicode.com/todos?_limit=84',
        requestOptions
      )
      .then((res) => {
        const todos = res.data;
        //get page count
        const pageNumbers = [];
        const { todosPerPage } = this.state;
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }
        //Get current todos
        const currentTodos = todos.slice(0, todosPerPage);
        this.setState({
          pageNumbers,
          todos,
          currentTodos,
        });
      });
  }

  handleClick = (event) => {
    const currentPage = Number(event.target.id);
    const { todos, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    this.setState({
      currentPage,
      currentTodos,
    });
  };

  render() {
    const {
      todos,
      currentTodos,
      pageNumbers,
      currentPage,
      todosPerPage,
    } = this.state;
    return (
      <Fragment>
        <Row className='task-sec'>
          <Col md='8'>
            <h3>Tasks</h3>
            <Table className='task-table'>
              <thead>
                <tr>
                  <th>USER ID</th>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>COMPLETED</th>
                </tr>
              </thead>
              <tbody className='task-table-body'>
                {currentTodos.map((todo) => {
                  return (
                    <tr>
                      <td>{todo.userId}</td>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>
                        <Button
                          variant={
                            todo.completed === true
                              ? 'outline-primary active'
                              : 'outline-primary'
                          }
                        >
                          {todo.completed === true ? 'True' : 'False'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col md='3'>
            <p>
              Showing {(currentPage - 1) * todosPerPage + 1} to{' '}
              {(currentPage - 1) * todosPerPage + currentTodos.length} of{' '}
              {todos.length} elemrnts
            </p>
          </Col>
          <Col md='9' className='pagination'>
            <p>Page:</p>
            <Pagination className='ml-3'>
              {pageNumbers.map((number) => {
                return (
                  <>
                    <Pagination.Item
                      key={number}
                      id={number}
                      active={currentPage === number ? true : false}
                      onClick={this.handleClick}
                    >
                      {number}
                    </Pagination.Item>
                  </>
                );
              })}
            </Pagination>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Tasks;
