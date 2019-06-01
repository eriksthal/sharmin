import React from "react";
import { navigate } from "@reach/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./BackOffice.css";

class BackOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "", saved: localStorage.getItem("key") || "" };
  }

  componentDidMount() {
    if (this.state.saved.length > 0) {
      document.location = `/students`;
    }
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    localStorage.setItem("key", this.state.password);
    navigate(`/students`);
  }

  renderField() {
    if (this.state.saved.length === 0) {
      return (
        <div className="container">
          <TextField
            id="keyword"
            label="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            margin="normal"
          />
          <Button
            variant="contained"
            className="student-lookup__search-button"
            color="primary"
            onClick={this.handleSubmit.bind(this)}
          >
            OK
          </Button>
        </div>
      );
    }
  }
  render() {
    return <div>{this.renderField()}</div>;
  }
}

export default BackOffice;
