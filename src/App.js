import React, {useEffect, useState} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'

const AddTodo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 3000);
    })
)

function App() {
  const [todos, setTodos] = useState([
    // {id: 1, completed: false, title: 'Купить хлеб'},
  ])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000);
      })
      .catch(error => console.log(error))
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (id === todo.id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    ) 
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos([
      ...todos,
      {
        title,
        id: Date.now(),
        completed: false
      }
    ])
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
        <h1>React Tutorial</h1>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        {loading && <Loader/>}
        {todos.length
            ? <TodoList todos={todos} onToggle={toggleTodo}/>
            : loading ? null : <p>No todos!</p>
        }
      </div>
    </Context.Provider>
  );
}

export default App;
