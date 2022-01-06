import React, { useState } from 'react';
import './Dashboard.style.scss';

const Dashboard = () => {
  const [tabContent, setTabContent] = useState([{ id: 0, title: 'Home', active: true, content: null }]);

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        <h1 className="h3 mb-3 fw-normal">Todo List</h1>
        <p>Hello, thomijasir@gmail.com</p>
        <p>Todo list application will help you remind what todo you need have to done.</p>
        <div className="tab-component">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#home">
                ALL TASK
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#profile">
                ACTIVE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                COMPLETED
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="todo-content mb-5 mt-4">
                <div className="todo-item">
                  <div className="todo-box">
                    <input type="checkbox"></input>
                  </div>
                  <div className="todo-text">Todo Active</div>
                </div>
                <div className="todo-item done">
                  <div className="todo-box">
                    <input type="checkbox"></input>
                  </div>
                  <div className="todo-text">Todo Done</div>
                  <div className="todo-remove">
                    <i className="bi bi-x-square-fill"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade">Yolo</div>
            <div className="tab-pane fade">Homerun</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Add a Task" />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your task with anyone else.
              </small>
            </div>
          </div>
          <div className="col-md-3">
            <button className="w-100 btn btn-primary disabled" type="submit">
              Add <span className="spinner-border spinner-border-sm"></span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
