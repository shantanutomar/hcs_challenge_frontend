import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddTasks from "../AddTasks/AddTasks";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class HomePage extends React.Component {
  state = {
    isAddOpen: false,
    userTasks: []
  };
  fetchUserTasks = () => {
    console.log(this.props.user._id);
    // Axios call
    customAxios
      .get(`${API_PATH.dev.BASE_URL}/users/${this.props.user._id}/tasks/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token
        },
        method: "GET"
      })
      .then(
        tasks => {
          console.log(tasks.data);
          this.setState({ userTasks: tasks.data });
        },
        error => {
          console.log("In error");
        }
      );
  };
  openAddModel = () => {
    this.setState({
      isAddOpen: true
    });
  };
  closeAddModel = () => {
    this.setState({
      isAddOpen: false
    });
  };
  componentDidMount = () => {
    this.fetchUserTasks();
  };
  handleLogout = () => {
    this.props.logout();
  };
  handleCreateTask = (event, createTaskData) => {
    event.preventDefault();
    console.log(this.props.user);
    customAxios
      .post(
        `${API_PATH.dev.BASE_URL}/tasks/`,
        { ...createTaskData, userAssigned: this.props.user._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.props.user.token
          },
          method: "POST"
        }
      )
      .then(
        response => {
          console.log("Task Created");
          this.fetchUserTasks();
          this.closeAddModel();
        },
        error => {
          console.log("In error");
        }
      );

    this.setState({
      isUpdateTaskOpen: true,
      isAddTaskOpen: true
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <section>
          <h3>
            Hi. Welcome{" "}
            {`${this.props.user.firstName} ${this.props.user.lastName}`}
          </h3>
          <h3>About : {`${this.props.user.userDetails}`}</h3>
        </section>
        <AddTasks
          isAddOpen={this.state.isAddOpen}
          handleCreateTask={this.handleCreateTask}
          closeAddModel={this.closeAddModel}
        />
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          size="small"
          onClick={this.openAddModel}
        >
          Add Tasks
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          size="small"
          onClick={this.handleLogout}
        >
          Logout
        </Button>
        <section />
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    user: state.userReducer.user.data
  };
};
var mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userActions.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(HomePage)));
