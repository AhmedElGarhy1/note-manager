import React, { useEffect, useState, useContext } from "react";
import { Container } from "@material-ui/core";
import NoteCard from "../Components/NoteCard";
import Masonry from "react-masonry-css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
const Home = ({ baseURL }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!JSON.parse(localStorage.user)) {
      return navigate("/login");
    }
    setIsLoading(true);
    fetch(baseURL + "/api/notes", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.user).token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          throw Error("need Authorization");
        }
        return res.json();
      })
      .then((comingNotes) => {
        setNotes(comingNotes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${baseURL}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user && user.token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          throw Error("need Authorization");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    const deletedNotes = notes.filter((note) => note._id !== id);
    setNotes(deletedNotes);
  };
  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  } else if (notes) {
    if (notes.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          There are no Notes Yet
          <br /> <Link to="/create">Create a Note</Link>
        </div>
      );
    } else {
      return (
        <Container>
          <Masonry
            container="true"
            breakpointCols={breakPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} handleDelete={handleDelete} />
              </div>
            ))}
          </Masonry>
        </Container>
      );
    }
  }
};

export default Home;
