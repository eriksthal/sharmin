import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Spinner from "../../components/Spinner/Spinner";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import RegisteredClassesTable from "../../components/RegisteredClassesTable/RegisteredClassesTable";

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
      registrationDate: "",
      active: false,
      classes: [],
      isLoaded: true
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoaded: false });
    fetch(`${getStudentEndpoint}?queryType=id&id=${this.props.studentId}`, {
      method: "GET",
      headers: { "x-api-key": localStorage.getItem("key") }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.length > 0) {
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
              agreementTerm: result.agreementTerm,
              classes: result.classes,
              active: result.active,
              registrationDate: result.registrationDate,
              isLoaded: true
            });
          }
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

  goBack() {
    navigate("/students");
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

  updateUser(payload) {
    this.setState({ isLoaded: false });
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
            switch (payload.action) {
              case "wipe":
                this.setState({
                  agreementName: "",
                  agreementDate: "",
                  agreementNumber: ""
                });
                break;
              case "activate":
                this.setState({ active: 1 });
                break;
              case "deactivate":
                this.setState({ active: 0 });
                break;
              default:
                break;
            }
          }
          this.setState({ isLoaded: true });
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
    this.updateUser({ id: this.state.studentId, action: "wipe" });
  }

  handleActivateUser(event) {
    this.updateUser({
      id: this.state.studentId,
      action: event.currentTarget.id
    });
  }

  render() {
    return (
      <>
        <div
          className={
            this.state.isLoaded === false
              ? "student__show student__loading"
              : "student__hide"
          }
        >
          <Spinner />
        </div>
        <div
          className={
            this.state.isLoaded === true ? "student__show" : "student__hide"
          }
        >
          <h1>
            <Icon className="student__back-icon" onClick={this.goBack}>
              arrow_back
            </Icon>
            {`${this.state.firstName} ${this.state.lastName}`}
          </h1>
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
                <h3 className="student__detail-heading">
                  Contact information:
                </h3>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Primary Email</span>
                  {this.state.primaryEmail}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Secondary Email
                  </span>
                  {this.state.secondaryEmail}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Student Email</span>
                  {this.state.studentEmail}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Cell number</span>
                  {this.state.cellNumber}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Home Number</span>
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
                <h3 className="student__detail-heading">
                  Guardian Information:
                </h3>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Guardian 1 Name
                  </span>
                  {this.state.momName}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Guardian 1 Phone
                  </span>
                  {this.state.momNumber}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Guardian 2 Name
                  </span>
                  {this.state.dadName}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Guardian 2 Phone
                  </span>
                  {this.state.dadNumber}
                </p>
              </div>
              <div className="student__detail-container">
                <h3 className="student__detail-heading">
                  Medical Information:
                </h3>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Care Card Number
                  </span>
                  {this.state.careCard}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Medical Conditions
                  </span>
                  {this.state.medicalConditions}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Family Doctor</span>
                  {this.state.familyDoctorName}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">
                    Family Doctor Phone
                  </span>
                  {this.state.familyDoctorNumber}
                </p>
              </div>
            </div>
            <div className="student__info-section">
              <div className="student__detail-container">
                <h3 className="student__detail-heading">Waiver information:</h3>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Student Name</span>
                  {this.state.waiverStudentName}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Guardian Name</span>
                  {this.state.waiverGuardianName}
                </p>
              </div>
              <div className="student__detail-container">
                <h3 className="student__detail-heading">
                  Credit card information:
                </h3>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Cardholder</span>
                  {this.state.agreementName}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Number</span>
                  {this.state.agreementNumber}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Expiration</span>
                  {this.state.agreementDate}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Agreement Term</span>
                  {this.state.agreementTerm}
                </p>
              </div>
              <div className="student__detail-container">
                <h3 className="student__detail-heading">Registration:</h3>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Date</span>
                  {this.state.registrationDate}
                </p>
                <p className="student__detail-text">
                  <span className="student__info-subtitle">Status</span>
                  <span
                    className={
                      this.state.active
                        ? `student__status-label registered`
                        : `student__status-label pending`
                    }
                  >
                    {this.state.active ? "Registered" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
            <div className="student__info-section-large">
              <h3 className="student__detail-heading">Registered Classes:</h3>
              <RegisteredClassesTable registeredClasses={this.state.classes} />
            </div>
          </Paper>
          <div className="student__cta-container">
            <div className={this.state.active === 1 ? "hide" : "show"}>
              <Button
                variant="contained"
                id="activate"
                color="primary"
                onClick={this.handleActivateUser.bind(this)}
              >
                Mark student as registered
              </Button>
            </div>
            <div className={this.state.active === 0 ? "hide" : "show"}>
              <Button
                variant="contained"
                id="deactivate"
                color="primary"
                onClick={this.handleActivateUser.bind(this)}
              >
                Mark student as pending
              </Button>
            </div>
            <div className={!this.state.agreementName ? "hide" : "show"}>
              <Button
                variant="contained"
                onClick={this.handleClearCcInfo.bind(this)}
              >
                <DeleteIcon className="student__delete-icon" />
                Wipe CC information
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Student);
