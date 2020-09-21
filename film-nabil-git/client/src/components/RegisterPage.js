import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../actions/user_actions';
import moment from 'moment';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  const image = `http://gravatar.com/avatar/${moment().unix()}?d=identicon`;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(name, email, password, image));
  };

  useEffect(() => {
    RegisterToLogin();
  });

  const RegisterToLogin = () => {
    if (user.register && user.register.success) {
      props.history.push('/login');
    }
  };

  return (
    <div className="register">
      <form onSubmit={submitHandler}>
        <ul>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
