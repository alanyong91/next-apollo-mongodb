import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { GET_TODO_LIST, ADD_TASK, REMOVE_TASK } from './../gql/todo';

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery<{ getTodoList: ITodoListType[] }>(GET_TODO_LIST);

  const [todoList, setTodoList] = useState<ITodoListType[]>([])
  const [todoTask, setTodoTask] = useState<string>("")

  useEffect(() => {
    if (data) {
      setTodoList(data.getTodoList)
    }
  }, [data])

  const [addTask] = useMutation(ADD_TASK, {
    onError: (e) => {
      alert(`ADD TASK FAILED, ${JSON.stringify(e)}`);
    },
    onCompleted: ({ addTask }) => {
      setTodoList(prev => ([...prev, addTask]))
      setTodoTask("")
    }
  });

  const [removeTask] = useMutation(REMOVE_TASK, {
    onError: (e) => {
      alert(`REMOVE TASK FAILED, ${JSON.stringify(e)}`);
    }
  });

  const onAddTask = (event: React.FormEvent) => {
    event.preventDefault()
    addTask({
      variables: {
        input: {
          task: todoTask
        }
      }
    })
  }

  const onRemoveTask = (id: string, task: string) => {
    if (confirm(`Confirm remove ${task}?`)) {
      removeTask({
        variables: {
          id
        }
      })
      setTodoList(prev => prev.filter(todo => todo.id !== id))
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <>
      <form onSubmit={onAddTask} className="todo-form">
        <input 
          type="text" value={todoTask} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTodoTask(event.target.value)} 
        />
        <button type="submit" disabled={todoTask === ''}>Save</button>
      </form>
      {todoList.map(todo => (
        <div key={todo.id}>{todo.task} <button onClick={() => onRemoveTask(todo.id, todo.task)}>Delete</button></div>
      ))}
    </>
  )
}

export default TodoList