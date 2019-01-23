import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CustomTextField from "../../Helpers/CustomTextField";
import { Form } from "react-final-form";
import Dialog from "@material-ui/core/Dialog";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";

/*
Component handles update task flow
*/

const getDate = dateStr => dateStr.slice(0, 10);

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  dialogPaper: {
    width: "80%",
    background: grey[200]
  },
  TypographyStyle: {
    color: orange[500]
  }
});

class UpdateTask extends React.Component {
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
    const { classes, taskData } = this.props;
    return (
      <div>
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.isUpdateOpen}
          onClose={this.props.closeUpdateModel}
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
              Update Task
            </Typography>
            <Form
              onSubmit={this.props.handleUpdateTask}
              initialValues={{
                taskDesc: taskData.taskDesc,
                taskDueDate: getDate(taskData.taskDueDate)
              }}
              validate={this.validate}
              render={({ submitting, pristine, values }) => (
                <form
                  className={classes.container}
                  onSubmit={event => this.props.handleUpdateTask(event, values)}
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
      </div>
    );
  }
}
export default withStyles(styles)(UpdateTask);
