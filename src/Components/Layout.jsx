import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { makeStyles, Drawer, Typography, Avatar } from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  SubjectOutlined,
  AddCircleOutlineOutlined,
  PersonAdd,
  ExitToApp,
} from "@material-ui/icons";
import { format } from "date-fns";
import { yellow } from "@material-ui/core/colors";
import { AuthContext } from "../context/auth";

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
    backgroundColor: "#f9f9f9",
    width: "100%",
    minHeight: "100vh",
  },
  active: {
    backgroundColor: "#f4f4f4 !important",
  },
  title: {
    padding: 16,
  },
  contentPage: {
    padding: 24,
    marginTop: `64px`,
  },
});
// Start Layout Component
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const { user, setUser } = useContext(AuthContext);
  const menuItems = [
    {
      path: "/",
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      active: true,
    },
    {
      path: "/create",
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      active: true,
    },
    {
      path: "/login",
      text: "Login",
      icon: <ExitToApp color="secondary" />,
      active: user ? false : true,
    },
    {
      path: "/signup",
      text: "Sign up",
      icon: <PersonAdd color="secondary" />,
      active: user ? false : true,
    },
  ];
  const logout = () => {
    setUser(null);
    localStorage.user = null;
    navigate("/login");
  };
  return (
    <div className={classes.root}>
      {/* // AppBar or navBar */}
      <AppBar style={{ width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }}>
            Today Is The {format(new Date(), "do MMMM Y ")}
          </Typography>
          {user && (
            <Typography
              onClick={logout}
              style={{ marginRight: "40px", color: "#fff", cursor: "pointer" }}
            >
              Logout
            </Typography>
          )}

          <Typography>
            {(user && user.username) || (
              <Link
                to="signin"
                style={{ color: "white", textDecoration: "none" }}
              >
                Account
              </Link>
            )}
          </Typography>
          <Avatar style={{ marginLeft: "10px", backgroundColor: yellow[700] }}>
            {user && user.username ? user.username[0].toUpperCase() : "A"}
          </Avatar>
        </Toolbar>
      </AppBar>
      {/* Drawer List on the left */}
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            ElGarhy Notes
          </Typography>
        </div>
        <List>
          {menuItems.map(
            (item) =>
              item.active && (
                <ListItem
                  key={item.text}
                  button
                  onClick={() => navigate(item.path)}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
          )}
        </List>
      </Drawer>
      <div className={classes.contentPage}> {children}</div>
    </div>
  );
};

export default Layout;
