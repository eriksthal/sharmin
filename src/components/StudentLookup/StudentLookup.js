import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { studentsEndpoint } from "../../constants/config";
import Spinner from "../Spinner/Spinner";
import MaterialTable from "material-table";
import { navigate } from "@reach/router";

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
  },
  table: {
    minWidth: 650
  }
});

class StudentLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      students: [],
      loading: "loaded"
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
              loading: "loaded"
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

  goToStudent(event, row) {
    navigate(`/student/${row.studentId}`);
  }

  render() {
    return (
      <div className="student-lookup__container">
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
          <MaterialTable
            style={{ width: "100%" }}
            columns={[
              { title: "First Name", field: "firstName" },
              { title: "Last name", field: "lastName" },
              { title: "Email", field: "primaryEmail" },
              { title: "Registration Date", field: "registrationDate" },
              {
                title: "Registered",
                field: "active",
                lookup: { 0: "Pending", 1: "Registered" }
              }
            ]}
            data={this.state.students}
            options={{
              filtering: true,
              actionsColumnIndex: -1,
              pageSize: 20
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit User",
                onClick: this.goToStudent.bind(this)
              }
            ]}
            title="Registrations"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StudentLookup);
