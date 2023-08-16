import React, { useState, useEffect } from 'react';

function TaskListWithTimers() {
  const initialTasks = [
    { id: 1, name: 'Task 1', status: 'TODO', startTime: null, elapsedTime: 0 },
    { id: 2, name: 'Task 2', status: 'TODO', startTime: null, elapsedTime: 0 },
    { id: 3, name: 'Task 3', status: 'TODO', startTime: null, elapsedTime: 0 }
  ];

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    debugger
    const interval = setInterval(() => {
        debugger
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.status === 'IN-PROGRESS'
            ? { ...task, elapsedTime: task.elapsedTime + 1 }
            : task
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const startTask = (taskId) => {
    debugger
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'IN-PROGRESS', startTime: Date.now() } : task
      )
    );
  };

  const completeTask = (taskId) => {
    debugger
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'COMPLETED' } : task
      )
    );
  };

  return (
    <div className="container">
      {tasks.map((task) => (
        <div key={task.id}>
          <p>Task: {task.name}</p>
          <p>Status: {task.status}</p>
          {task.status === 'IN-PROGRESS' && (
            <div>
              <p>Timer: {task.elapsedTime} seconds</p>
              <button onClick={() => completeTask(task.id)}>Complete Task</button>
            </div>
          )}
          {task.status === 'COMPLETED' && (
            <div>
              <p>Task completed in: {task.elapsedTime} seconds</p>
            </div>
          )}
          {task.status === 'TODO' && (
            <button onClick={() => startTask(task.id)}>Start Task</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskListWithTimers;
