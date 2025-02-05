import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Регистрация успешна");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Вход успешен");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Вход через Google успешен");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Выход выполнен");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>🔑 Вход / Регистрация</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Зарегистрироваться</button>
      <button onClick={handleSignIn}>Войти</button>
      <button onClick={handleGoogleSignIn}>Войти через Google</button>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
