import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import Slide from "@material-ui/core/Slide";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { hideSnackBottom } from "../../Store/Actions/appActions";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = theme => ({
  snackbarRoot: {},
  anchorOriginBottomCenter: {
    "@media (min-width: 960px)": {
      transform: "none",
      left: 0,
      width: "100%",
      "&>div": {
        width: "100%"
      }
    }
  },
  snackbarContentRoot: {
    "@media (min-width: 960px)": {
      borderRadius: 0
    }
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class BottomSnackbar extends Component {
  handleSnackbarClose = () => {
    this.props.hideSnackBottom();
  };
  render() {
    const { classes, variant, message, autoHideDuration, isOpen } = this.props;
    const Icon = variantIcon[variant];
    return (
      isOpen && (
        <Snackbar
          classes={{
            root: classes.snackbarRoot,
            anchorOriginBottomCenter: classes.anchorOriginBottomCenter
          }}
          open={isOpen}
          autoHideDuration={autoHideDuration}
          onClose={this.handleSnackbarClose}
          TransitionComponent={TransitionUp}
        >
          <SnackbarContent
            className={classes[variant]}
            classes={{
              root: classes.snackbarContentRoot
            }}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleSnackbarClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      )
    );
  }
}

const mapStateToProps = state => {
  const {
    showSnackBottom,
    snackIntent,
    snackMessage,
    snackAutoHideDuration
  } = state.appReducer;
  return {
    isOpen: showSnackBottom,
    variant: snackIntent,
    message: snackMessage,
    autoHideDuration: snackAutoHideDuration
  };
};

BottomSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "info", ""])
    .isRequired
};

export default connect(
  mapStateToProps,
  { hideSnackBottom }
)(withStyles(styles)(BottomSnackbar));
