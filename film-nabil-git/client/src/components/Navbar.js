import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../actions/user_actions';
const logo = require('../assets/Logo.png');

function Navbar(props) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser()).then(window.location.reload(false));
  };

  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="link">
        {user.userData && !user.userData.isAuth ? (
          <React.Fragment>
            <Link
              style={{textDecoration: 'none', color: 'black'}}
              to="/register"
            >
              Register
            </Link>
            <Link style={{textDecoration: 'none', color: 'black'}} to="/login">
              Login
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link style={{textDecoration: 'none', color: 'black'}} to="/forum">
              Forum
            </Link>
            <Link
              to=""
              style={{textDecoration: 'none', color: 'black'}}
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default withRouter(Navbar);
