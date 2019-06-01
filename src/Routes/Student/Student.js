import React from "react";
import { Link } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { getStudentEndpoint } from "../../constants/config.js";

import "./Student.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthdate: "",
      street: "",
      city: "",
      postalCode: "",
      primaryEmail: "",
      secondaryEmail: "",
      studentEmail: "",
      cellNumber: "",
      homeNumber: "",
      academicSchool: "",
      momName: "",
      momNumber: "",
      dadName: "",
      dadNumber: "",
      careCard: "",
      medicalConditions: "",
      familyDoctorName: "",
      familyDoctorNumber: "",
      waiverStudentName: "",
      waiverGuardianName: "",
      agreementName: "",
      agreementNumber: "",
      agreementDate: "",
      isLoaded: true
    };
  }

  componentDidMount() {
    fetch(`${getStudentEndpoint}?queryType=id&id=${this.props.studentId}`, {
      method: "GET",
      headers: { "x-api-key": localStorage.getItem("key") }
    })
      .then(res => res.json())
      .then(
        result => {
          result = result.pop();
          this.setState({
            studentId: result.studentId,
            firstName: result.firstName,
            lastName: result.lastName,
            birthdate: result.birthdate,
            street: result.street,
            city: result.city,
            postalCode: result.postalCode,
            primaryEmail: result.primaryEmail,
            secondaryEmail: result.secondaryEmail,
            studentEmail: result.studentEmail,
            cellNumber: result.cellNumber,
            homeNumber: result.homeNumber,
            academicSchool: result.academicSchool,
            momName: result.momName,
            momNumber: result.momNumber,
            dadName: result.dadName,
            dadNumber: result.dadNumber,
            careCard: result.careCard,
            medicalConditions: result.medicalConditions,
            familyDoctorName: result.familyDoctorName,
            familyDoctorNumber: result.familyDoctorNumber,
            waiverStudentName: result.waiverStudentName,
            waiverGuardianName: result.waiverGuardianName,
            agreementName: result.agreementName,
            agreementNumber: result.agreementNumber,
            agreementDate: result.agreementDate,
            isLoaded: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  formatDate(unformattedDate) {
    let date = new Date(unformattedDate);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return `${dd}/${mm}/${yyyy}`;
  }
  removeCCInformation(payload) {
    fetch(getStudentEndpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.status === 200) {
            this.setState({
              agreementName: "",
              agreementDate: "",
              agreementNumber: ""
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({ isLoaded: true });
        }
      );
  }

  handleClearCcInfo() {
    if (
      !window.confirm(
        "By erasing this information you won't be able to recover it"
      )
    ) {
      return;
    }
    if (!window.confirm("Are you sure?")) {
      return;
    }
    this.removeCCInformation({ id: this.state.studentId });
  }

  render() {
    return (
      <div>
        <h1>{`${this.state.firstName} ${this.state.lastName}`}</h1>
        <Paper className="student__info-container">
          <div className="student__info-section">
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Birthdate:</h3>
              <p className="student__detail-text">
                {this.formatDate(this.state.birthdate)}
              </p>
            </div>
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Address:</h3>
              <p className="student__detail-text">
                {`${this.state.street}, ${this.state.city}, ${
                  this.state.postalCode
                }`}
              </p>
            </div>
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Contact information:</h3>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Primary Email</div>
                {this.state.primaryEmail}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Secondary Email</div>
                {this.state.secondaryEmail}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Student Email</div>
                {this.state.studentEmail}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Cell number</div>
                {this.state.cellNumber}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Home Number</div>
                {this.state.homeNumber}
              </p>
            </div>
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Academic School:</h3>
              <p className="student__detail-text">
                {this.state.academicSchool}
              </p>
            </div>
          </div>
          <div className="student__info-section">
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Guardian Information:</h3>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Guardian 1 Name</div>
                {this.state.momName}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Guardian 1 Phone</div>
                {this.state.momNumber}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Guardian 2 Name</div>
                {this.state.dadName}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Guardian 2 Phone</div>
                {this.state.dadNumber}
              </p>
            </div>
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Medical Information:</h3>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Care Card Number</div>
                {this.state.careCard}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Medical Conditions</div>
                {this.state.medicalConditions}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Family Doctor</div>
                {this.state.familyDoctorName}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">
                  Family Doctor Phone
                </div>
                {this.state.familyDoctorNumber}
              </p>
            </div>
          </div>
          <div className="student__info-section">
            <div className="student__detail-container">
              <h3 className="student__detail-heading">Waiver information:</h3>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Student Name</div>
                {this.state.waiverStudentName}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Guardian Name</div>
                {this.state.waiverGuardianName}
              </p>
            </div>
            <div className="student__detail-container">
              <h3 className="student__detail-heading">
                Credit card information:
              </h3>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Cardholder</div>
                {this.state.agreementName}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Number</div>
                {this.state.agreementNumber}
              </p>
              <p className="student__detail-text">
                <div className="student__info-subtitle">Expiration</div>
                {this.state.agreementDate}
              </p>
            </div>
          </div>
        </Paper>
        <div className={!this.state.agreementName ? "hide" : "show"}>
          <Button
            variant="contained"
            onClick={this.handleClearCcInfo.bind(this)}
          >
            Wipe CC information
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Student);
