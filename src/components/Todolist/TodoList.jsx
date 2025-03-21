import { useState, useEffect } from "react";

export const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : []; // Гарантуємо, що це масив
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { text: task, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введіть завдання"
      />
      <button onClick={addTask}>Додати</button>

      <ul>
        {Array.isArray(tasks) ? (
          tasks.map((t, index) => (
            <li key={index}>
              {t.text}
              <button onClick={() => removeTask(index)}>❌</button>
            </li>
          ))
        ) : (
          <p>Помилка: tasks не є масивом</p>
        )}
      </ul>
    </div>
  );
};