import './global.css'
import styles from './App.module.css'

import Logo from './assets/ignite-logo.svg'
import Clipboard from './assets/clipboard.svg'
import { useState, FormEvent, ChangeEvent, InvalidEvent, KeyboardEvent } from 'react'

import Task from './Task'

function App() {
  const [tasks, setTasks] = useState<string[]>([])

  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (newTaskText.trim() === '') {
      return;
    }

    setTasks([...tasks, newTaskText]);
    setNewTaskText('');
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleCreateNewTask(event)
    }
  }

  function handleNewTaskChange(event:ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')

    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event:InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório.')
  }
  
  function deleteTask(taskToDelete:string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task != taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <img src={Logo} alt="Ignite TodoList Logo" />
      </div>

      <form onSubmit={handleCreateNewTask} className={styles.taskCreator}>
        <textarea 
          required
          onChange={handleNewTaskChange}
          value={newTaskText}
          onInvalid={handleNewTaskInvalid}
          onKeyPress={handleKeyPress}
          name='task'
          placeholder="Adicione uma nova tarefa"
        />

        <button type="submit">
          Criar
        </button>
      </form>
      
      <div className={styles.main}>
        <div className={styles.tasksProgress}>
          <div className={styles.createdTasks}>
            <b>Tarefas criadas</b>
            <span>{tasks.length}</span>
          </div>
        </div>

        <div className={styles.tasks}>
          <div className={tasks.length == 0 ? styles.emptyTasks : styles.hidden}>
              <img src={Clipboard} alt="Clipboard" />
            <b>Você ainda não tem tarefas cadastradas</b>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>

          <div className={tasks.length != 0 ? styles.withTasks : styles.hidden}>
            {tasks.map(task => {
              return (
                <Task
                  key={task}
                  content={task}
                  onDeleteTask={deleteTask}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
