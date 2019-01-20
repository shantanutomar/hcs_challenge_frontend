import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import CustomTextField from "../../Helpers/CustomTextField";

const styles = theme => ({
  card: {
    width: 600,
    height: 600,
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
    height: 50,
    display: "block"
  },
  button: {
    margin: theme.spacing.unit
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
      <div>
        <header />
        <section>
          <Card className={classes.card} raised>
            <CardContent>
              <Form
                onSubmit={this.handleSubmit}
                initialValues={{ userName: "", password: "" }}
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
                        // type: "number"
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
                    <CustomTextField
                      keyName="userDetails"
                      textFieldProps={{
                        required: true,
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
                  </form>
                )}
              />
            </CardContent>
          </Card>
        </section>
        <footer />
      </div>
    );
  }
}

// function mapStateToProps(state) {
// }

var mapDispatchToProps = dispatch => {
  return {
    register: userData => dispatch(userActions.register(userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Register)));
