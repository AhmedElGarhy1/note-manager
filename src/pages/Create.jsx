import React, { useContext } from "react";
import { Typography, Button } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Container,
  FormControlLabel,
  RadioGroup,
  TextField,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useEffect } from "react";

const Create = ({ baseURL }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!JSON.parse(localStorage.user)) {
      navigate("/login");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (title && details) {
      setIsLoading(true);
      const tempData = { title, details, category, username: user.username };
      fetch(baseURL + "/api/notes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user && user.token}`,
        },
        body: JSON.stringify(tempData),
      })
        .then((res) => {
          setIsLoading(false);
          if (res.status === 401) {
            navigate("/login");
            throw Error("need Authorization");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
      navigate("/");
    }
  };
  const handleBlurTitle = () => {
    setTitleError(false);
    if (title === "") {
      setTitleError(true);
    }
  };
  const handleBlurDetails = () => {
    setDetailsError(false);
    if (details === "") {
      setDetailsError(true);
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
        Create a New Node
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlurTitle}
          name="title"
          margin="normal"
          fullWidth
          variant="outlined"
          label="Note Title"
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          onBlur={handleBlurDetails}
          name="details"
          margin="dense"
          fullWidth
          variant="outlined"
          label="Note Details"
          multiline
          rows="3"
          required
          error={detailsError}
        />
        <FormControl margin="normal" fullWidth>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todo" control={<Radio />} label="Todo" />
            <FormControlLabel
              value="reminder"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          onClick={handleClick}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default Create;
