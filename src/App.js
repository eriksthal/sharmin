import React from "react";
import "./App.css";
import { Redirect, Router, Link } from "@reach/router";
import BackOffice from "./Routes/BackOffice/BackOffice.js";
import StudentLookup from "./components/StudentLookup/StudentLookup.js";
import Student from "./Routes/Student/Student.js";
import Classes from "./Routes/Classes/Classes.js";
import ClassEditor from "./Routes/ClassEditor/ClassEditor.js";
import NavigationBar from "./components/NavigationBar/NavigationBar.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#bc9b6a"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#ddd",
      main: "#000",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  }
});

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <nav>
          <NavigationBar logo="logo">
            <Link to="classes">Classes</Link>
            <Link to="students">Students</Link>
          </NavigationBar>
        </nav>
        <div className="content">
          <Router>
            <Redirect from="/" to="/admin" />
            <BackOffice path="admin" />
            <StudentLookup path="students" />
            <Student path="student/:studentId" />
            <ClassEditor path="classes" />
            <Classes path="class/:classId" />
          </Router>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
