import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container/Container";
import styles from "./login.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function Login() {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { login } = useAuth();

  async function onFormSubmit(e) {
    e.preventDefault();

    if (password.length >= 8 && email) {
      setError(false);
      let token;
      if (hasRegistered) {
        const {data} = await axios.post("http://localhost:4000/user/sign-in", {email, password});
        token = data.token;
      } else {
        const {data} = await axios.post("http://localhost:4000/user/sign-up", {email, password});
        token = data.token;
      }
      login(token);
    } else {
      setError(true);
    }
  }

  function onInputChange(value, setState) {
    setError(false);
    setState(value);
  }

  return (
    <div className={styles.login}>
      <Container>
        <div className={styles.loginFormWrapper}>
          <h1>{hasRegistered ? "Welcome Back" : "Join Us"}</h1>
          <p>Enter your credentials to access your account.</p>
          <form onSubmit={onFormSubmit}>
            {error && <h3 className={styles.loginError}>Email or password is not valid</h3>}
            <div>
              <input type="email" placeholder=" " onChange={(e) => onInputChange(e.target.value, setEmail)} />
              <label>Email</label>
            </div>
            <div>
              <input type="password" placeholder=" " autoComplete="true" onChange={(e) => onInputChange(e.target.value, setPassword)} />
              <label>Password</label>
            </div>
            <button type="submit">Sign {hasRegistered ? "In" : "Up"}</button>
            {!hasRegistered && <p>Already registered? <button onClick={() => setHasRegistered(true)}>Sign In</button></p>}
            {hasRegistered && <p>New to EasyCommerce? <button onClick={() => setHasRegistered(false)}>Sign Up</button></p>}
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Login;