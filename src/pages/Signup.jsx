import React, { useState, useContext } from "react";
import { Typography, Button } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Signup = ({ baseURL }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    handleBlurUsername();
    handleBlurEmail();
    handleBlurPassword();
    if (username && email && password) {
      setIsLoading(true);
      const tempData = { username, email, password };
      try {
        const res = await fetch(baseURL + "/api/user/signup", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(tempData),
        });
        const json = await res.json();
        setEmailError(false);
        setPasswordError(false);
        setIsLoading(false);
        if (!res.ok) {
          if (json.msg.toLowerCase().includes("email")) setEmailError(true);
          if (json.msg.toLowerCase().includes("password"))
            setPasswordError(true);
          return;
        }
        localStorage.user = JSON.stringify(json);
        setUser(json);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  };
  const handleBlurUsername = () => {
    setUsernameError(false);
    if (!username) {
      setUsernameError(true);
    }
  };
  const handleBlurEmail = () => {
    setEmailError(false);
    if (!email) {
      setEmailError(true);
    }
  };
  const handleBlurPassword = () => {
    setPasswordError(false);
    if (!password) {
      setPasswordError(true);
    }
  };
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Sign up
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleBlurUsername}
          name="Username"
          margin="normal"
          fullWidth
          variant="outlined"
          label="Username"
          placeholder="Ahmed ElGarhy"
          required
          error={usernameError}
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          name="Email"
          margin="dense"
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          required
          error={emailError}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlurPassword}
          name="name"
          type="password"
          margin="dense"
          fullWidth
          variant="outlined"
          label="Password"
          placeholder="Lower&UpperCases & Number & SpicialCharacters"
          required
          error={passwordError}
        />
        <Button
          onClick={handleClick}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Signup"}
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
