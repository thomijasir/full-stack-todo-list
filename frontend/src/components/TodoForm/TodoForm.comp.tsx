import React, { FC } from 'react';
import './TodoForm.style.scss';

interface IProps {
  submitted: React.FormEventHandler<HTMLFormElement>;
}

const TabContent: FC<IProps> = ({ submitted }) => {
  return (
    <form onSubmit={submitted} className="form-todo">
      <div className="row">
        <div className="col-md-9">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Add a Task" />
            <small className="form-text text-muted">We'll never share your task with anyone else.</small>
          </div>
        </div>
        <div className="col-md-3">
          <button className="w-100 btn btn-primary" type="submit">
            Add <span className="spinner-border spinner-border-sm"></span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TabContent;
