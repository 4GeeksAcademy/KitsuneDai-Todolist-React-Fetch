import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const Tasklist = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");


  const urlTodos =
    "https://playground.4geeks.com/apis/fake/todos/user/KitsuneDai";

 useEffect(() => {
    fetch(urlTodos)
      .then((response) => {return response.json()})
      .then((data) => {setTodos(data)})
      .catch((err) => {console.error(err);});
  },[todos]) 

 
  const newTask = () => {
    fetch(urlTodos, {
      method: "PUT", 
      body: JSON.stringify([...todos, { label: task, done: false }]), // Agrega la nueva tarea al array existente
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTask(""); // Limpia el campo de entrada después de agregar la tarea
        console.log("Nueva tarea añadida a la lista:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTask = (taskId) => {
    fetch(urlTodos, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== taskId));
        console.log("Eliminar:", taskId);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <>
      <ul>
        <li>
        <input type="text" 
             onChange={(e)=>setTask(e.target.value)} //Traemos un valor que nos proporciona el input al setTask
             value={task} // Añadimos el valor que entró desde el input a la variable llamada task
             onKeyDown={(e)=> {
              if (e.key === "Enter") {
                newTask();
              }
          }} 
             className="Addtask"
             placeholder="What needs to be done?">
            </input>
        </li>

        {todos.map((todo) => (
          <li key={todo.id} className="tasklist">
            {todo.label}
            <span onClick={() => deleteTask(todo.id)} className="tasklist"><RiDeleteBinLine className="icon" /></span>
          </li>
        ))}
        
      </ul>

      <hr />

      <div className="footer">
        {todos.length === 0 ? (<p>No hay tareas en la lista, añada una tarea</p>) : todos.length === 1 ? (`${todos.length} tarea`) : (`${todos.length} tareas`)}
      </div>
    </>
  );
};

export default Tasklist;

