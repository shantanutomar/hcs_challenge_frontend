import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CustomTextField from "../../Helpers/CustomTextField";
import { Form } from "react-final-form";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
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
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.isAddOpen}
          onClose={this.props.closeAddModel}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Add Task
            </Typography>
            <Form
              onSubmit={this.props.handleCreateTask}
              initialValues={{ taskDesc: "", taskDueDate: Date.now() }}
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
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles)(AddTasks);
