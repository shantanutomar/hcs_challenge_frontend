import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Field } from "react-final-form";
import red from "@material-ui/core/colors/red";

/*
Customized Password Text field that will be used in all the forms for 
password input
*/

const styles = theme => ({
  passTextField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%"
  },
  errorContainer: {
    fontSize: theme.spacing.unit * 1.5,
    fontWeight: 300,
    color: red[500]
  }
});

class CustomPasswordTextField extends React.Component {
  state = {
    showPassword: false
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { classes } = this.props;
    return (
      <Field
        name="password"
        render={({ input, meta }) => (
          <div className={classes.passTextField}>
            <TextField
              fullWidth
              {...this.props.textFieldProps}
              margin="normal"
              error={Boolean(meta.error) && meta.touched}
              {...input}
              id="outlined-adornment-password"
              variant="outlined"
              type={this.state.showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      style={{ outline: "none" }}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {meta.touched && meta.error ? (
              <span className={classes.errorContainer}>{meta.error}</span>
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default withStyles(styles)(CustomPasswordTextField);
