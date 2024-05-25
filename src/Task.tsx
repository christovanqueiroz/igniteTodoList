import styles from './Task.module.css'
import Trash from './assets/trash.svg'
import { useState } from 'react';

type TaskProps = {
    content: string,
    onDeleteTask: (task: string) => void;
}

export default function Task({ content, onDeleteTask }: TaskProps) {
    const [completeTask, setCompleteTask] = useState<boolean>(true)

    function handleCompleteTask() {
      setCompleteTask(!completeTask)
    }

    function handleDeleteTask() {
        onDeleteTask(content)
    }

    return (
        <div className={styles.task}>
          <div>
            <button 
              onClick={handleCompleteTask} 
              className={completeTask == true ? styles.uncompletedTask : styles.completedTask} 
            />

            <span className={completeTask == false ? styles.completedTaskText : ''}>
              {content}
            </span>
          </div>
              

          <button 
            onClick={handleDeleteTask}
            className={styles.deleteTask}
          >
            <img src={Trash} alt="Trash" />
          </button>
        </div>
    )
}