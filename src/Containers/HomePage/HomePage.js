import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import { userActions } from "../../Store/Actions/userActions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AddTasks from "../AddTasks/AddTasks";
import customAxios from "../../Helpers/customAxios";
import { API_PATH } from "../../api";
import Loader from "../Loader/Loader";
import TaskDetails from "../TaskDetails/TaskDetails";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class HomePage extends React.Component {
  state = {
    isAddOpen: false,
    userTasks: [],
    isLoadingTasks: false
  };
  fetchUserTasks = () => {
    this.setState({
      isLoadingTasks: true
    });
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
          this.setState({ userTasks: tasks.data, isLoadingTasks: false });
        },
        error => {
          this.setState({ isLoadingTasks: false, userTasks: [] });
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
    let userTasks = [];
    if (this.state.userTasks.length) {
      userTasks = this.state.userTasks.map(ele => {
        return (
          <TaskDetails
            key={ele._id}
            taskData={ele}
            fetchUserTasks={this.fetchUserTasks}
          />
        );
      });
    }

    return (
      <div>
        <section>
          <h3>
            Hi. Welcome{" "}
            {`${this.props.user.firstName} ${this.props.user.lastName}`}
          </h3>
          <h3>About : {`${this.props.user.userDetails}`}</h3>
          <h3>Age : {`${this.props.user.userAge}`}</h3>
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
        <section>{this.state.isLoadingTasks ? <Loader /> : userTasks}</section>
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
