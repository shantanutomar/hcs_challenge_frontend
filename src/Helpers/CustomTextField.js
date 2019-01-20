import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Field } from "react-final-form";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 45
  }
});

const CustomTextField = props => {
  return (
    <Field
      name={props.keyName}
      render={({ input, meta }) => (
        <Fragment>
          <TextField
            {...props.textFieldProps}
            error={Boolean(meta.error) && meta.touched}
            {...input}
            className={styles.textField}
            margin="normal"
            variant="outlined"
          />
          {meta.touched && meta.error ? (
            <span style={{ display: "block", color: "red" }}>{meta.error}</span>
          ) : null}
        </Fragment>
      )}
    />
  );
};

export default CustomTextField;
