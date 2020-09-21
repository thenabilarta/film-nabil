import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginUser} from '../actions/user_actions';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/');
      }
    });
  };

  // useEffect(() => {
  //   if (user.loginSucces) {
  //     props.history.push('/');
  //   }
  // }, [props.history, user.loginSucces]);

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
        </ul>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(Login);
