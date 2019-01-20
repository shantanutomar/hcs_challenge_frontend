import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CustomTextField from "../../Helpers/CustomTextField";
import { Form } from "react-final-form";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  dialogPaper: {
    width: "80%"
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
          <Typography variant="h6" id="modal-title">
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
                    label: "Task Details"
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
                  color="primary"
                  className={classes.button}
                  size="small"
                  type="submit"
                >
                  Submit
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
