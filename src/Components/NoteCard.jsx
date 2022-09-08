import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { DeleteOutlined } from "@material-ui/icons";
import { green, yellow, pink, blue } from "@material-ui/core/colors";

const Note = ({ note, handleDelete }) => {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar
              style={{
                backgroundColor:
                  note.category === "work"
                    ? yellow[700]
                    : note.category === "money"
                    ? green[500]
                    : note.category === "todo"
                    ? pink[500]
                    : blue[500],
              }}
            >
              {note.username[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note._id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography color="textSecondary" variant="body2">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Note;
