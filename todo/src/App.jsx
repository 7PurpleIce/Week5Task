import { useRequestGetTodos, useRequestAddTodoTask, useRequestDeleteTask, useRequestUpdateTask } from './hooks'
import { useState } from 'react'
import styles from './app.module.css'

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [refreshTodoFlag, setRefreshTodoFlag] = useState(false)
  const refreshTodos = () => setRefreshTodoFlag(!refreshTodoFlag)

  const { isLoading, todos } = 
    useRequestGetTodos(refreshTodoFlag)

  const { isCreating, requestAddTodoTask } = 
    useRequestAddTodoTask(refreshTodos)

  const {isDeleting, requestDeleteTask} =
    useRequestDeleteTask(refreshTodos)

  const { isUpdating, requestUpdateTask } =
    useRequestUpdateTask(refreshTodos)

  const handleAddTodo = () => {
    requestAddTodoTask(newTodo)
    setNewTodo('')
  }

  return (
      <div className={styles.app}>
        <div className={styles.addTask}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          className={styles.input}
        />
        <button
          onClick={handleAddTodo}
          disabled={isCreating || !newTodo.trim()}
          className={styles.button}
        >
          {isCreating ? 'Adding...' : 'Add Task'}
        </button>
        </div>
        {isLoading 
          ? <div className={styles.loader}></div> 
          : (
            todos.map(({ id, title, completed }) => (
              <div key={id} className={styles.task}>
                <span>{title} {completed ? '|| Completed' : '|| Pending'}</span>
                <button
                  onClick={() => requestUpdateTask(id, completed)} 
                  disabled={isUpdating}
                  className={styles.updateButton}
                >
                  {isUpdating ? 'Updating...' : 'Toggle Completion'}
                </button> 
                <button
                  onClick={() => requestDeleteTask(id)} 
                  disabled={isDeleting}
                  className={styles.deleteButton}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))
          )}
    </div>
  )
}

export default App
