import React, { FC } from 'react';
import { ITodoList } from '../../interfaces/General';
import './TodoList.style.scss';

interface IProps {
  todoContent: ITodoList[];
  completed: Function;
  remove: Function;
}

const TodoList: FC<IProps> = ({ todoContent, completed, remove }) => {
  return (
    <div className="todo-content mb-5 mt-4">
      {todoContent.map((item) => (
        <div className={`todo-item ${item.done ? 'done' : ''}`} key={item.id}>
          <div className="todo-box">
            <input type="checkbox" checked={item.done} disabled={item.done} onChange={completed(item.id)}></input>
          </div>
          <div className="todo-text">{item.title}</div>
          <div className="todo-remove">
            <i className="bi bi-x-square-fill" onClick={remove(item.id)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
