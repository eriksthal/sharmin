import React from "react";
import { Link } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { classesEndpoint, campsEndpoint } from "../../constants/config.js";

import "./ClassEditor.css";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class ClassEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      isLoaded: true,
      filteredClasses: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    let endpoint;
    switch (this.props.type) {
      case "recreational":
        endpoint = classesEndpoint;
        break;
      case "camp":
        endpoint = campsEndpoint;
        break;
      default:
        endpoint = classesEndpoint;
    }
    fetch(endpoint)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            classes: result,
            filteredClasses: result,
            isLoaded: true,
          });
          console.log(this.state.classes);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleDeactivateClass = (classId) => (e) => {
    e.preventDefault();
    alert(classId);
  };

  handleNameChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearchClass() {
    const filteredClasses = this.state.classes.filter((singleClass) => {
      const fullClassName = `${singleClass.level.join("/")} ${
        singleClass.discipline
      } ${singleClass.ages.join("/")} - ${singleClass.location}`;
      return fullClassName
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase());
    });
    this.setState({ filteredClasses });
  }

  render() {
    return (
      <div>
        <div className="student-lookup__search-container">
          <TextField
            id="standard-name"
            label="Name"
            value={this.state.searchTerm}
            onChange={this.handleNameChange.bind(this)}
            margin="normal"
          />
          <Button
            variant="contained"
            className="student-lookup__search-button"
            color="primary"
            onClick={this.handleSearchClass.bind(this)}
          >
            <Icon style={{ color: "#fff" }}>search</Icon>
          </Button>
        </div>
        {this.state.filteredClasses.map((singleClass) => {
          return (
            <Link
              to={`/class/${singleClass.classId}`}
              className="class-editor__link"
            >
              <Paper className="class-editor__card" elevation={1}>
                <h3>{`${singleClass.level.join("/")} ${
                  singleClass.discipline
                } ${singleClass.ages.join("/")} - ${singleClass.location}`}</h3>
                <h3>
                  <span
                    className={
                      singleClass.active
                        ? "class-editor__active"
                        : "class-editor__inactive"
                    }
                  >
                    {singleClass.active ? "Active" : "Inactive"}
                  </span>
                </h3>
                <h4>{singleClass.hours}</h4>
                <h4>{singleClass.location}</h4>
                <h5>Terms:</h5>
                <div className="class-editor__terms-container">
                  {singleClass.terms.map((term) => {
                    return (
                      <div>
                        <div>
                          {`Date: ${term.termName} Price: $${term.termPrice} CAD`}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <Button
                  variant="contained"
                  className="student-lookup__search-button"
                  color="primary"
                  key={`activate${singleClass.classId}`}
                  onClick={this.handleDeactivateClass(singleClass.classId)}
                >
                  {singleClass.active ? "Deactivate Class" : "Activate Class"}
                </Button> */}
              </Paper>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClassEditor);
