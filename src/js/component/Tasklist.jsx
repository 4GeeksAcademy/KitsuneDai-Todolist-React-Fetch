import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const Tasklist = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const urlTodos =
    "https://playground.4geeks.com/apis/fake/todos/user/KitsuneDai";

 

  //POST --> Para crear un usuario
  useEffect(() => {
    fetch(urlTodos, {
      method: "POST",
      body: JSON.stringify([]),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("POST->", data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  //PUT --> para añadir las tareas
  const  addTask =()=> {
    if (!task.trim()) {
      //Para que no me agregue una tarea vacía
      alert("Por favor, ingresa una tarea.");
      return;
    }
    const newTodo = {label: task, done: false };
    fetch(urlTodos, {
      method: "PUT",
      body: JSON.stringify([...todos, newTodo]), // Agrega la nueva tarea al array existente
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...todos, newTodo]);
        setTask(""); // Limpia el campo de entrada después de agregar la tarea
        console.log("PUT-> Nueva tarea añadida a la lista:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

   //GET --> Me trae la lista que he creado
   useEffect(() => {
    fetch(urlTodos)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        console.log("Tareas obtenidas:", data);
      })
      .catch((err) => {
        return err, console.error("Error al obtener las tareas:", err);
      });
  }, [todos.length]);

  //DELETES
  //para eliminar una tarea
  const deleteTask = (taskId) => {
    const updatedTodos = todos.filter(todo => todo.id !== taskId); // Eliminar la tarea del estado de todos
    fetch(urlTodos, {
      method: "PUT",
      body: JSON.stringify(updatedTodos),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (response.ok) {
        setTodos(updatedTodos); // Actualizar el estado solo si la actualización del backend es exitosa
        console.log("PUT-> Tarea eliminada exitosamente");
      } else {
        console.error("Error al eliminar la tarea");
      }
    })
  .catch((err) => {
    console.error("Error al eliminar la tarea:", err);
  });
  };

  //para eliminar toda la lista
  const buttonYes = () => {
    const clearnList = todos.length > 0 ? todos : [{ label: "Sonríe :)", done: false }];
    fetch(urlTodos, {
      method: "PUT",
      body: JSON.stringify(clearnList),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (response.ok) {
        setTodos([]); // Actualizar el estado con un arreglo vacío
        console.log("PUT-> Todas las tareas han sido eliminadas exitosamente");
      } else {
        console.error("Error al eliminar todas las tareas");
      }
    })
    .catch((err) => {
      console.error("Error al eliminar todas las tareas:", err);
    });

    
  };

  const buttonNo = () => {
    alert("¡Pues deja de tocar cosas!");
  };

  return (
    <>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setTask(e.target.value)} //Traemos un valor que nos proporciona el input al setTask
            value={task} // Añadimos el valor que entró desde el input a la variable llamada task
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            className="Addtask"
            placeholder="What needs to be done?"
          ></input>
        </li>

        {todos.map((todo) => (
          //Añado un key que se genere para cada child de forma única.
          <li key={`task-${todo.label}`} className="tasklist">
            {todo.label}
            <span onClick={() => deleteTask(todo.id)} className="tasklist">
              <RiDeleteBinLine className="icon" />
            </span>
          </li>
        ))}
      </ul>

      <hr />

      <div className="footer">
        {todos.length === 0 ? (
          <p>No hay tareas en la lista, añada una tarea</p>
        ) : todos.length === 1 ? (
          `${todos.length} tarea`
        ) : (
          `${todos.length} tareas`
        )}
      </div>
      <p className="text-center" style={{ marginBottom: "0px" }}>
          ¿Quieres mandarlo todo a la mierda?
      </p>

      <div className="d-flex gap-2 justify-content-center" style={{ paddingBottom: "15px" }}>
        <button onClick={buttonYes} className="btn btn-primary" type="button">
          Sí quiero
        </button>
        <button
          onClick={buttonNo}
          className="btn btn-danger buttonNo"
          type="button"
        >
          No quiero
        </button>
      </div>
    </>
  );
};

export default Tasklist;
