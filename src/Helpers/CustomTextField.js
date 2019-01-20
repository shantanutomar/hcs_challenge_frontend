import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Field } from "react-final-form";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  textFieldRoot: {
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

const CustomTextField = props => {
  const { classes } = props;
  return (
    <Field
      name={props.keyName}
      render={({ input, meta }) => (
        <div className={classes.textFieldRoot}>
          <TextField
            fullWidth
            {...props.textFieldProps}
            error={Boolean(meta.error) && meta.touched}
            {...input}
            margin="normal"
            variant="outlined"
          />
          {meta.touched && meta.error ? (
            <span className={classes.errorContainer}>{meta.error}</span>
          ) : null}
        </div>
      )}
    />
  );
};

export default withStyles(styles)(CustomTextField);
