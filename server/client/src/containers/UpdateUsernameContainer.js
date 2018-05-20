import UsernameForm from "../components/common/UsernameForm";
import { resetUserUsername } from "../actions/users";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetUserUsername());
    }
  };
};

function mapStateToProps(state) {
  return {
    user: state.auth,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernameForm);
