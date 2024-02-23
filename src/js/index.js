//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./component/TodoList";


// include your styles into the webpack bundle
import "../styles/index.css";


//import your own components


//render your react application
ReactDOM.render(<TodoList />, document.querySelector("#app"));
