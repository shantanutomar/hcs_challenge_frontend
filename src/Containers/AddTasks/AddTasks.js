import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CustomTextField from "../../Helpers/CustomTextField";
import { Form } from "react-final-form";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";

/*
Component handles Add Task flow
*/
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  dialogPaper: {
    width: "80%",
    background: grey[200],
    borderRadius: '10px',
  },
  TypographyStyle: {
    color: orange[500]
  },
  submitButton: {
    borderRadius: '5px',
    marginTop: '5px',
    borderColor: '#ff9800',
    border: '2px solid #ff9800',
    color: "#ff9800",
    "&:hover": {
      color: "#eee",
      borderColor: orange[500],
      backgroundColor: orange[500],
      border: '2px solid #ff9800',

    },
  },
  disabled: {
    color: '#555',
    border: '2px solid'
  }
});

class AddTasks extends React.Component {
  validate = values => {
    const errors = {};
    if (!values.taskDesc) {
      errors.taskDesc = "Required";
    }
    if (!values.taskDueDate) {
      errors.taskDueDate = "Required";
    }
    return errors;
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.isAddOpen}
        onClose={this.props.closeAddModel}
        classes={{
          paper: classes.dialogPaper
        }}
      >
        <div className={classes.root}>
          <Typography
            variant="h6"
            id="modal-title"
            className={classes.TypographyStyle}
          >
            Add Task
          </Typography>
          <Form
            onSubmit={this.props.handleCreateTask}
            initialValues={{
              taskDesc: "",
              taskDueDate: new Date().toISOString().slice(0, 10)
            }}
            validate={this.validate}
            render={({ submitting, pristine, values }) => (
              <form
                className={classes.container}
                onSubmit={event => this.props.handleCreateTask(event, values)}
                autoComplete="off"
              >
                <CustomTextField
                  keyName="taskDesc"
                  textFieldProps={{
                    required: true,
                    label: "Task Details",
                    autoFocus: true
                  }}
                />
                <CustomTextField
                  keyName="taskDueDate"
                  textFieldProps={{
                    required: true,
                    label: "Due On",
                    type: "Date"
                  }}
                />
                <Button
                  disabled={submitting || pristine}
                  variant="outlined"
                  size="small"
                  type="submit"
                  classes={{disabled: classes.disabled}}
                  className={classes.submitButton}
                >
                  Add
                </Button>
              </form>
            )}
          />
        </div>
      </Dialog>
    );
  }
}
export default withStyles(styles)(AddTasks);
