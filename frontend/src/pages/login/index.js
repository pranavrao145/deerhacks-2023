import axios from "axios";
import { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/token`, {
        email: email,
        password: password,
      })
      .then((response) => {
        props.setToken(response.data.access_token);
        console.log("token set successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEmailChange = (e) => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" onChange={handleEmailChange} />
      </label>
      <label>
        {/* again, very bad idea; trust me guy, this is for mocking ONLY */}
        Password:
        <input type="text" onChange={handlePasswordChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
