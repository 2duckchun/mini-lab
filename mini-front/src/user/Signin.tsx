import styles from "./Signin.module.css";
import { useState } from "react";
import generateRandomString from "../utils/generateRandomString";
import {
  checkIdDuplicate,
  checkNickNameDuplicate,
  createUser,
  sendAuthCodeToUserEmail,
} from "../apis/user/user";

export default function Signin() {
  const [userInput, setUserInput] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    email: "",
    emailValidation: "",
  });

  const [authCode, setAuthCode] = useState("");

  const handleInput = (e: any) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async () => {
    const makeId = await createUser(
      userInput.id,
      userInput.password,
      userInput.email,
      userInput.nickname
    );

    console.log(makeId);
  };

  const handleCheckDuplicateId = async () => {
    const result = await checkIdDuplicate(userInput.id);

    console.log(result);
  };

  const handleCheckDuplicatedNickName = async () => {
    const result = await checkNickNameDuplicate(userInput.nickname);

    console.log(result);
  };

  const handleSendAuthCodeToEmail = async () => {
    const randomString = generateRandomString(6);
    setAuthCode(randomString);
    // 타이머 관련 세팅도 있으면 좋을듯
    const result = await sendAuthCodeToUserEmail(userInput.email, randomString);

    console.log(result);
  };

  const handleCheckAuthCodeIsValid = () => {
    if (userInput.emailValidation === authCode) {
      alert("이메일 인증 성공!");
    } else {
      alert("이메일 인증 실패");
    }
  };

  return (
    <div>
      <h1>회원가입 로직 개발</h1>

      <div className={styles.input_div}>
        <label htmlFor='id'>아이디</label>
        <input
          id='id'
          name='id'
          type='text'
          value={userInput.id}
          onChange={handleInput}
        />
        <button onClick={handleCheckDuplicateId}>ID 중복체크</button>
      </div>

      <div className={styles.input_div}>
        <label htmlFor='nickname'>닉네임</label>
        <input
          id='nickname'
          name='nickname'
          type='text'
          value={userInput.nickname}
          onChange={handleInput}
        />
        <button onClick={handleCheckDuplicatedNickName}>닉네임 중복체크</button>
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
        <label htmlFor='password-confirm'>비밀번호 확인</label>
        <input
          id='password-confirm'
          name='passwordConfirm'
          type='password'
          value={userInput.passwordConfirm}
          onChange={handleInput}
        />
      </div>

      <div className={styles.input_div}>
        <label htmlFor='email'>이메일</label>
        <input
          id='email'
          name='email'
          type='email'
          value={userInput.email}
          onChange={handleInput}
        />
        <button onClick={handleSendAuthCodeToEmail}>인증번호 보내기</button>
      </div>

      <div className={styles.input_div}>
        <label htmlFor='email-validation'>인증번호</label>
        <input
          id='email-validation'
          name='emailValidation'
          type='text'
          value={userInput.emailValidation}
          onChange={handleInput}
        />
        <button onClick={handleCheckAuthCodeIsValid}>인증번호 확인</button>
      </div>

      <div className={styles.input_div}>
        <button onClick={handleCreateUser}>회원가입</button>
      </div>
    </div>
  );
}
