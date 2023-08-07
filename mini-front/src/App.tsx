import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // const [input, setInput] = useState({
  //   name: "",
  //   age: "",
  //   comment: "",
  // });

  // const handleInput = (e: any) => {
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const createUser = async (name: any, age: any, comment: any) => {
  //   let response = await axios.post("http://localhost:5000/signin", {
  //     name: name,
  //     age: age,
  //     comment: comment,
  //   });

  //   console.log(response);
  // };

  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   createUser(input.name, input.age, input.comment);
  // };

  return (
    <div className='App'>
      <h1>HOME 이옵니다.</h1>
    </div>
  );
}

export default App;
