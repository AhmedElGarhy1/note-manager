import React, { useState, useContext } from "react";
import { Typography, Button } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Signin = ({ baseURL }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (email && password) {
      const tempData = { email, password };
      try {
        setIsLoading(true);
        const res = await fetch(baseURL + "/api/user/login", {
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
  const handleBlurEmail = () => {
    setEmailError(false);
    if (email === "") {
      setEmailError(true);
    }
  };
  const handleBlurPassword = () => {
    setPasswordError(false);
    if (password === "") {
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
        Login
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          name="Email"
          margin="dense"
          fullWidth
          variant="outlined"
          label="Email"
          required
          error={emailError}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlurPassword}
          name="Password"
          type="password"
          margin="dense"
          fullWidth
          variant="outlined"
          label="Password"
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
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
      </form>
    </Container>
  );
};

export default Signin;
