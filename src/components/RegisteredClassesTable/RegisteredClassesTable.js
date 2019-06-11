import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function RegisteredClassesTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell align="right">Hours</TableCell>
            <TableCell align="right">Term</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.registeredClasses.map(registeredClass => {
            return (
              <TableRow key={registeredClass.subscriptionId}>
                <TableCell>{`${registeredClass.level.join(
                  "/"
                )} ${registeredClass.ages.join("/")} ${
                  registeredClass.disciplineName
                }`}</TableCell>
                <TableCell align="right">
                  {registeredClass.classHours}
                </TableCell>
                <TableCell align="right">{`${registeredClass.termName} - ${
                  registeredClass.termDescription
                }`}</TableCell>
                <TableCell align="right">
                  ${registeredClass.termPrice} CAD
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

RegisteredClassesTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisteredClassesTable);
