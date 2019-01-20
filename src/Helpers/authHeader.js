import { connect } from "react-redux";

const authHeader = () => {
  console.log(this.props.user.token);
  if (this.props.user && this.props.user.token) {
    return { Authorization: "Bearer " + this.props.user.token };
  } else {
    return {};
  }
};
var mapStateToProps = state => {
  console.log(state.userReducer.user.data);
  return {
    user: state.userReducer.user.data
  };
};

export default connect(
  mapStateToProps,
  null
)(authHeader);
