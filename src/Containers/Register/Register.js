import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import CustomTextField from "../../Helpers/CustomTextField";
import grey from "@material-ui/core/colors/grey";
import { Link } from "react-router-dom";
import orange from "@material-ui/core/colors/orange";
import CustomPasswordTextField from "../CustomPasswordTextField/CustomPasswordTextField";

/*
Registration page for the user
*/

const styles = theme => ({
  root: {
    width: "100%"
  },
  cardRoot: {
    width: "80%",
    margin: "24px auto",
    background: grey[200],
    borderRadius: '10px'
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    marginBottom: '10px',
    "&:hover": {
      color: '#eee',
      borderColor: orange[500],
      backgroundColor: orange[500]
    }
  },
  footerStyle: {
    marginTop: theme.spacing.unit,
    display: "flex",
    justifyContent: "center",
    "&>span": {
      color: grey[200],
      fontSize: '14px'
    }
  },
  tasksPlannerHeading: {
    color: orange[500],
    textAlign: 'center',
    fontSize: '22px',
    textTransform: 'uppercase'
  },
  subHeading: {
    textAlign: 'left',
    fontSize: '20px'
  },
  cardContentRoot: {
    padding: '36px'
  }
});

class Register extends React.Component {
  handleSubmit = (values, event) => {
    event.preventDefault();
    this.props.register(values);
  };

  validate = values => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.userAge) {
      errors.userAge = "Required";
    }
    if (!values.userDetails) {
      errors.userDetails = "Required";
    }
    return errors;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <header />
        <section>
          <Card className={classes.cardRoot} raised>
            <CardContent className={classes.cardContentRoot}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.tasksPlannerHeading}
              >
                Tasks Planner
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.subHeading}
              >
                Registration
              </Typography>
              <Form
                onSubmit={this.handleSubmit}
                initialValues={{
                  userName: "",
                  password: "",
                  firstName: "",
                  lastName: "",
                  userAge: null,
                  userDetails: ""
                }}
                validate={this.validate}
                render={({ submitting, pristine, values }) => (
                  <form
                    className={classes.container}
                    onSubmit={event => this.handleSubmit(values, event)}
                    autoComplete="off"
                  >
                    <CustomTextField
                      keyName="firstName"
                      textFieldProps={{
                        required: true,
                        label: "First Name"
                      }}
                    />
                    <CustomTextField
                      keyName="lastName"
                      textFieldProps={{
                        required: true,
                        label: "Last Name"
                      }}
                    />
                    <CustomTextField
                      keyName="userAge"
                      textFieldProps={{
                        required: true,
                        label: "Age",
                        type: "number"
                      }}
                    />
                    <CustomTextField
                      keyName="userName"
                      textFieldProps={{
                        required: true,
                        label: "User Name"
                      }}
                    />
                    <CustomPasswordTextField
                      keyName="password"
                      textFieldProps={{
                        required: true,
                        label: "Password"
                      }}
                    />
                    <CustomTextField
                      keyName="userDetails"
                      textFieldProps={{
                        required: false,
                        label: "About Yourself",
                        type: "text"
                      }}
                    />

                    <Button
                      disabled={submitting || pristine}
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      size="small"
                      type="submit"
                    >
                      Register
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      size="small"
                      to="/login"
                      component={Link}
                    >
                      Login
                    </Button>
                  </form>
                )}
              />
            </CardContent>
          </Card>
        </section>
        <footer className={classes.footerStyle}>
          <Typography variant="caption">© Tasks Planner</Typography>
        </footer>
      </div>
    );
  }
}

var mapDispatchToProps = dispatch => {
  return {
    register: userData => dispatch(userActions.register(userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Register)));
