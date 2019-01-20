import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import CustomTextField from "../../Helpers/CustomTextField";
import { Form } from "react-final-form";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
    margin: "0 auto"
  },
  cardRoot: {
    padding: theme.spacing.unit * 4
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 50
  },
  button: {
    marginBottom: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Login extends React.Component {
  validate = values => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  handleSubmit = (values, event) => {
    event.preventDefault();
    if (values.userName && values.password) {
      this.props.authenticate(values.userName, values.password);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.loggingIn ? (
          <Loader />
        ) : (
          <React.Fragment>
            <header />
            <section>
              <Card className={classes.cardRoot} raised>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    HealthCareSystems
                  </Typography>
                  <Form
                    onSubmit={this.handleSubmit}
                    initialValues={{ userName: "", password: "" }}
                    validate={this.validate}
                    render={({ submitting, pristine, values }) => (
                      <form
                        className={classes.container}
                        noValidate
                        autoComplete="off"
                        onSubmit={event => this.handleSubmit(values, event)}
                      >
                        <CustomTextField
                          keyName="userName"
                          textFieldProps={{
                            required: true,
                            label: "Username"
                          }}
                        />

                        <CustomTextField
                          keyName="password"
                          textFieldProps={{
                            required: true,
                            label: "Password",
                            type: "password"
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
                          Login
                        </Button>
                      </form>
                    )}
                  />

                  <Button
                    fullWidth
                    component={Link}
                    to="/register"
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </section>
            <footer />
          </React.Fragment>
        )}
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    loggingIn: state.userReducer.loggingIn
  };
};
var mapDispatchToProps = dispatch => {
  return {
    authenticate: (userName, password) =>
      dispatch(userActions.authenticate(userName, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Login)));
