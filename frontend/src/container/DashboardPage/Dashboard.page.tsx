import { useState, useEffect, useMemo, FormEvent } from 'react';
import useStorage from '../../hooks/useStorage';
import useApi from '../../hooks/useApi';
import TabContent from '../../components/TabContent/TabContent.comp';
import TodoForm from '../../components/TodoForm/TodoForm.comp';
import TodoList from '../../components/TodoList/TodoList.comp';
import { ITodoList, ITabContentList } from '../../interfaces/General';
import { ME } from '../../constants';
import './Dashboard.style.scss';

const Dashboard = () => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [tabContent, setTabContent] = useState<ITabContentList[]>([]);
  const [identity] = useStorage(ME, '');
  const loadsTodo = useApi('GET', 'todos');
  const createTodo = useApi('POST', 'todo');
  const removeTodo = useApi('DELETE', 'todo');
  const updateTodo = useApi('PATCH', 'todo');
  const todoListCompeted = useMemo(() => todoList.filter((item) => item.done === true), [todoList]);
  const todoListActive = useMemo(() => todoList.filter((item) => item.done === false), [todoList]);

  useEffect(() => {
    loadsTodo
      .onFetch()
      ?.then((res) => {
        const todoFromApi = res.data.data.todos.map((item: any) => ({
          ...item,
          id: item._id,
          done: item.done === 'true'
        }));
        setTodoList(todoFromApi);
      })
      .catch(() => {
        setTodoList([]);
      });
  }, []);

  useEffect(() => {
    setTabContent([
      {
        id: 0,
        title: 'ALL',
        active: true,
        content: (
          <TodoList
            todoContent={todoList}
            completed={handleTodoCompleted}
            remove={handleTodoRemove}
          />
        )
      },
      {
        id: 1,
        title: 'ACTIVE',
        active: false,
        content: (
          <TodoList
            todoContent={todoListActive}
            completed={handleTodoCompleted}
            remove={handleTodoRemove}
          />
        )
      },
      {
        id: 2,
        title: 'COMPLETED',
        active: false,
        content: (
          <TodoList
            todoContent={todoListCompeted}
            completed={handleTodoCompleted}
            remove={handleTodoRemove}
          />
        )
      }
    ]);
  }, [todoList]);

  const handleTodoCompleted = (id: string) => () => {
    updateTodo.onFetch({ done: true }, id)?.then(() => {
      const selectedTodo = todoList.map((item) => {
        return {
          ...item,
          done: item.id === id ? true : item.done
        };
      });
      setTodoList(selectedTodo);
    });
  };

  const handleTodoRemove = (id: string) => () => {
    removeTodo.onFetch('', id)?.then(() => {
      const x = todoList.filter((item) => item.id !== id);
      setTodoList(x);
    });
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
    const title = e.currentTarget.querySelector('input')?.value || '';
    createTodo.onFetch({ title })?.then((res) => {
      const newTodo = [...todoList];
      newTodo.push({
        id: res.data._id,
        title,
        done: false
      });
      createTodo.setLoading(false);
      setTodoList(newTodo);
    });
    e.currentTarget.reset();
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        <h1 className="h3 mb-3 fw-normal">Todo List</h1>
        <p>Hello, {identity}</p>
        <p>Todo list application will help you remind what todo you need have to done.</p>
        <TabContent contentList={tabContent} handleChangeTab={handleChangeTab} />
        <TodoForm submitted={handleAddNewTodo} loading={createTodo.loading} />
        <button className="btn btn-danger mt-5" type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
