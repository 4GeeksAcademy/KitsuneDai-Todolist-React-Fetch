import React , { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
//logica
const [todos, setTodos] = useState ([])
//CASO A se ejecuta la acción cada vez que se renderiza el componente
// useEffect (() => {

// })


// CASO B se ejecuta una sola vez.
//useEffect (() => {

// },[]) //<-Se pone una array vacío.


// CASO C se ejecuta una acción cuando se carga el componente y cada vez que una variable se actualiza
//useEffect (() => {
//  <<acción que vamos a ejecutar.>>
// },[variable, variable2, variable3]) //<-Cuando se actualiza la variable se carga el useEffect puede haber varias

//peticion resultado data

	const urlTodos= "https://playground.4geeks.com/apis/fake/todos/user/KitsuneDai"

	useEffect(()=>{
		//GET todos
		//GET si solo se pone la url en el fetch él asume que es un metodo GET
		fetch(urlTodos)
		.then((response)=>{
			console.log(response)
			return response.json()})
		.then((data)=>{setTodos(data)
			console.log(data)})
		.catch((err)=>{return err})
	},[todos])



//POST
//peticion
useEffect(()=> {
fetch(urlTodos, {
	method:"POST",
	body: JSON.stringify([]), //transforma el array vacio para el body en json
	headers: {"Content-Type": "application/json"}
})
.then((response)=>{return response.json()})
.then((data)=>{console.log(data)})
.catch((err)=>{return err})
}, [])

//PUT
let body = [
	{
	done: false,
	label: "tirar basura"
	}, 
	{
	done: false,
	label: "lavar gato"
	}, 
	{
	done: false,
	label: "curarme las heridas"
	}
]
fetch(urlTodos, {
	method:"PUT",
	body: JSON.stringify(body),
	headers: {"Content-Type": "application/json"}
}).then((response)=>{return response. json()})
.then((data)=>{console.log(data)})
.catch((err)=>{return err})



	return (
		<div className="text-center">
			{todos.map((todos)=>{
				return <h3>{todos.label}</h3>
			})}
			<h1 className="text-center mt-5">Hello Rigo!</h1>
			<p>
				<img src={rigoImage} />
			</p>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working...
			</a>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p>
		</div>
	);
};

export default Home;
