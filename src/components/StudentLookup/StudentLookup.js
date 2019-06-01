import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { studentsEndpoint } from "../../constants/config";
import RegisteredClassesTable from "../RegisteredClassesTable/RegisteredClassesTable";
import Spinner from "../Spinner/Spinner";
import { Link } from "@reach/router";

import Paper from "@material-ui/core/Paper";

import "./StudentLookup.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class StudentLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      students: [],
      loading: "loaded",
      filteredStudents: []
    };
  }

  componentDidMount() {
    this.setState({ loading: "loading" });
    fetch(studentsEndpoint)
      .then(res => res.json())
      .then(
        result => {
          if (result.length > 0) {
            this.setState({
              students: result,
              loading: "loaded",
              filteredStudents: result
            });
          } else {
            this.setState({ students: [], loading: "no-results" });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({ students: [], loading: "loaded" });
        }
      );
  }

  handleNameChange(event) {
    this.setState(
      { name: event.target.value },
      this.debounce(this.handleSearchStudent, 500)
    );
  }

  renderStudent(student) {
    if (student) {
      return (
        <div key={student.studentId} style={{ display: "flex" }}>
          <Link
            to={`/student/${student.studentId}`}
            className="class-editor__link"
          >
            <Paper className="student-lookup__student-info">
              <div>First Name: {student.firstName}</div>
              <div>Last Name: {student.lastName}</div>
              <div>Primary Email: {student.primaryEmail}</div>
              <div>Student Email: {student.studentEmail}</div>
            </Paper>
          </Link>
          {/* {this.renderRegisteredClasses(student)} */}
        </div>
      );
    }
  }

  renderRegisteredClasses(student) {
    if (student.classes) {
      return <RegisteredClassesTable registeredClasses={student.classes} />;
    }
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  handleSearchStudent() {
    this.setState({ loading: "loading" });
    const filteredStudents = this.state.students.filter(student => {
      const criteria = `${student.studentId} ${student.firstName} ${
        student.lastName
      }`.toLowerCase();
      return criteria.includes(this.state.name.toLowerCase());
    });
    if (filteredStudents.length > 0) {
      this.setState({ filteredStudents, loading: "loaded" });
    } else {
      this.setState({ filteredStudents, loading: "no-results" });
    }
  }

  // handleSearchStudent() {
  //   this.setState({ loading: "loading" });
  // fetch(
  //   getStudentEndpoint +
  //     `?id=${this.state.name}&queryType=${this.state.queryType}`
  // )
  //   .then(res => res.json())
  //   .then(
  //     result => {
  //       if (result.length > 0) {
  //         this.setState({
  //           students: result,
  //           loading: "loaded",
  //           filteredStudents: result
  //         });
  //       } else {
  //         this.setState({ students: [], loading: "no-results" });
  //       }
  //     },
  //     // Note: it's important to handle errors here
  //     // instead of a catch() block so that we don't swallow
  //     // exceptions from actual bugs in components.
  //     error => {
  //       this.setState({ students: [], loading: "loaded" });
  //     }
  //   );
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className="student-lookup__container">
        <div>
          <h2>Search for a student</h2>
        </div>
        <div className="student-lookup__search-container">
          <TextField
            id="standard-name"
            label="Name or ID"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
            margin="normal"
          />
        </div>

        <div
          className={
            this.state.loading === "loading"
              ? "student-lookup__show student-lookup__loading"
              : "student-lookup__hide"
          }
        >
          <Spinner />
        </div>
        <div
          className={
            this.state.loading === "no-results"
              ? "student-lookup__no-results"
              : "student-lookup__hide"
          }
        >
          No search results. Please try a different search criteria.
        </div>
        <div
          className={
            this.state.loading === "loading"
              ? "student-lookup__search-results student-lookup__hide"
              : "student-lookup__search-results"
          }
        >
          {this.state.filteredStudents.map(student => {
            return this.renderStudent(student);
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StudentLookup);
