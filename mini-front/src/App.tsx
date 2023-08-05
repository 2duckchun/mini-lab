import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState({
    name: "",
    age: "",
    comment: "",
  });

  const handleInput = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (name: any, age: any, comment: any) => {
    let response = await axios.post("http://localhost:5000/signin", {
      name: name,
      age: age,
      comment: comment,
    });

    console.log(response);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    createUser(input.name, input.age, input.comment);
  };

  return (
    <div className='App'>
      <h1>DB 실험</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>이름</label>
          <input
            id='name'
            name='name'
            type='text'
            value={input.name}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor='age'>나이</label>
          <input
            id='age'
            name='age'
            type='number'
            value={input.age}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor='comment'>자기소개</label>
          <input
            id='comment'
            name='comment'
            type='text'
            value={input.comment}
            onChange={handleInput}
          />
        </div>
        <button>클릭!</button>
      </form>
    </div>
  );
}

export default App;
