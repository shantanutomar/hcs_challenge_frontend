import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const styles = theme => ({
  card: {
    width: 300,
    height: 300,
    marginTop: 180
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 50
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      isSubmitted: false,
      userNameReq: "",
      passwordReq: "",
      isUserNameValid: true,
      isPasswordValid: true,
      isTouched: false
    };
  }

  handleUserChange = event => {
    const userName = event.target.value;
    if (userName !== "") {
      this.setState({
        userNameReq: "",
        isUserNameValid: true,
        isTouched: true
      });
    } else {
      this.setState({
        userNameReq: "Username is mandatory",
        isUserNameValid: false,
        isTouched: true
      });
    }

    this.setState({ userName: userName });
  };
  handlePassChange = event => {
    const password = event.target.value;
    if (password !== "") {
      this.setState({
        passwordReq: "",
        isPasswordValid: true,
        isTouched: true
      });
    } else {
      this.setState({
        passwordReq: "Password is mandatory",
        isPasswordValid: false,
        isTouched: true
      });
    }
    this.setState({ password: password });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.userName && this.state.password) {
      this.props.authenticate(this.state.userName, this.state.password);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.loggingIn ? (
          <Loader />
        ) : (
          <React.Fragment>
            <header />
            <section>
              <Card className={classes.card} raised>
                <CardContent>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      error={!this.state.isUserNameValid}
                      required
                      id="userNameInp"
                      label="Username"
                      className={classes.textField}
                      value={this.state.userName}
                      onChange={this.handleUserChange}
                      margin="normal"
                      variant="outlined"
                    />
                    {!this.state.isUserNameValid ? (
                      <Typography align="center" color="error">
                        {this.state.userNameReq}
                      </Typography>
                    ) : null}

                    <TextField
                      error={!this.state.isPasswordValid}
                      required
                      id="passwordInp"
                      label="Password"
                      className={classes.textField}
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePassChange}
                      autoComplete="current-password"
                      margin="normal"
                      variant="outlined"
                    />
                    {!this.state.isPasswordValid ? (
                      <Typography align="center" color="error">
                        {this.state.passwordReq}
                      </Typography>
                    ) : null}
                    <Button
                      disabled={
                        !this.state.isTouched ||
                        !this.state.isPasswordValid ||
                        !this.state.isUserNameValid
                      }
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      size="small"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Login
                    </Button>
                  </form>
                  <Link to="/register">
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      size="small"
                    >
                      Register
                    </Button>
                  </Link>
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
