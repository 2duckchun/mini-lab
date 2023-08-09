import { signin, tokenTest } from "../../apis/user/user";
import styles from "./SignIn.module.css";
import { useState } from "react";

export default function Signin() {
  const [userInput, setUserInput] = useState({
    id: "",
    password: "",
  });

  const handleInput = (e: any) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = async () => {
    const result = await signin(userInput.id, userInput.password);
    console.log(result);
    if (result.status === 200) {
      window.localStorage.setItem("access_token", result.data.token);
    }
  };

  const handleTokenTest = async () => {
    const result = await tokenTest();

    console.log(result);
  };

  return (
    <div>
      <h1>로그인 로직 개발</h1>

      <div className={styles.input_div}>
        <label htmlFor='id'>아이디</label>
        <input
          id='id'
          name='id'
          type='text'
          value={userInput.id}
          onChange={handleInput}
        />
      </div>

      <div className={styles.input_div}>
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          name='password'
          type='password'
          value={userInput.password}
          onChange={handleInput}
        />
      </div>

      <div className={styles.input_div}>
        <button onClick={handleSignin}>회원가입</button>
      </div>

      <div className={styles.input_div}>
        <button onClick={handleTokenTest}>토큰테스트</button>
      </div>
    </div>
  );
}
