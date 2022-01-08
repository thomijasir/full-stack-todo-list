import { useState, useEffect, useMemo, FormEvent } from 'react';
import TabContent from '../../components/TabContent/TabContent.comp';
import TodoForm from '../../components/TodoForm/TodoForm.comp';
import TodoList from '../../components/TodoList/TodoList.comp';
import { ITodoList, ITabContentList } from '../../interfaces/General';
import './Dashboard.style.scss';

const Dashboard = () => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [tabContent, setTabContent] = useState<ITabContentList[]>([]);
  const todoListCompeted = useMemo(() => todoList.filter((item) => item.done === true), [todoList]);
  const todoListActive = useMemo(() => todoList.filter((item) => item.done === false), [todoList]);

  useEffect(() => {
    setTabContent([
      { id: 0, title: 'ALL', active: true, content: <TodoList todoContent={todoList} completed={handleTodoCompleted} remove={handleTodoRemove} /> },
      { id: 1, title: 'ACTIVE', active: false, content: <TodoList todoContent={todoListActive} completed={handleTodoCompleted} remove={handleTodoRemove} /> },
      { id: 2, title: 'COMPLETED', active: false, content: <TodoList todoContent={todoListCompeted} completed={handleTodoCompleted} remove={handleTodoRemove} /> }
    ]);
  }, [todoList]);

  const handleTodoCompleted = (id: number) => () => {
    const selectedTodo = todoList.map((item) => {
      return {
        ...item,
        done: item.id === id ? true : item.done
      };
    });
    setTodoList(selectedTodo);
  };

  const handleTodoRemove = (id: number) => () => {
    const removeTodo = todoList.filter((item) => item.id !== id);
    setTodoList(removeTodo);
  };

  const handleChangeTab = (id: number) => () => {
    const updateTabs = tabContent.map((item) => {
      return {
        ...item,
        active: item.id === id
      };
    });
    setTabContent(updateTabs);
  };

  const handleAddNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInput = e.currentTarget.querySelector('input')?.value || '';
    const newTodo = [...todoList];
    newTodo.push({
      id: Math.floor(Math.random() * 10000),
      title: getInput,
      done: false
    });
    setTodoList(newTodo);
    e.currentTarget.reset();
  };

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        <h1 className="h3 mb-3 fw-normal">Todo List</h1>
        <p>Hello, thomijasir@gmail.com</p>
        <p>Todo list application will help you remind what todo you need have to done.</p>
        <TabContent contentList={tabContent} handleChangeTab={handleChangeTab} />
        <TodoForm submitted={handleAddNewTodo} />
      </main>
    </div>
  );
};

export default Dashboard;
