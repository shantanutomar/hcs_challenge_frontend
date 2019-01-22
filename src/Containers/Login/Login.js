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
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import CustomPasswordTextField from "../CustomPasswordTextField/CustomPasswordTextField";

/*
This is the login form for user authentication
*/

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 5,
    margin: "0 auto"
  },
  cardRoot: {
    padding: theme.spacing.unit * 4,
    background: grey[200]
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    marginBottom: theme.spacing.unit,
    "&:hover": {
      color: orange[500],
      borderColor: orange[500]
    }
  },
  footerStyle: {
    marginTop: theme.spacing.unit,
    display: "flex",
    justifyContent: "center",
    "&>span": {
      color: grey[200]
    }
  },
  TypographyStyle: {
    color: orange[500]
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
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.TypographyStyle}
                  >
                    Healthcare Systems
                  </Typography>
                  <Form
                    onSubmit={this.handleSubmit}
                    initialValues={{ userName: "", password: "" }}
                    validate={this.validate}
                    render={({ submitting, pristine, values }) => (
                      <form
                        className={classes.container}
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
                        <CustomPasswordTextField
                          keyName="password"
                          textFieldProps={{
                            required: true,
                            label: "Password"
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
                    color="primary"
                    component={Link}
                    to="/register"
                    variant="outlined"
                    className={classes.button}
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </section>
            <footer className={classes.footerStyle}>
              <Typography variant="caption">© HealthcareSystems</Typography>
            </footer>
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
