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
            <Link to="classes" id="classes">
              Classes
            </Link>
            <Link to="camps" id="camps">
              Camps
            </Link>
            <Link to="recreationalRegistrations" id="recreationalRegistrations">
              Recreational Registrations
            </Link>
            <Link to="campRegistrations" id="campRegistrations">
              Camp Registrations
            </Link>
          </NavigationBar>
        </nav>
        <div className="content">
          <Router>
            <Redirect from="/" to="/recreationalRegistrations" />
            <BackOffice path="admin" />
            <StudentLookup
              key="rec-students"
              path="recreationalRegistrations"
              title="Recreational"
            />
            <Student path="student/:studentId" />
            <ClassEditor path="classes" key="classes" type="recreational" />
            <ClassEditor path="camps" key="camps" type="camp" />
            <Classes path="class/:classId" />
            <StudentLookup
              key="camp-students"
              type="Camp"
              path="campRegistrations"
              title="Camps"
            />
          </Router>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
