import React from 'react';
import titleImage from '../../assets/title_blue.svg';
import Loading from './loading';

const titleStyle = {
  height: 200
};

const loginWrapperStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

const loginFormStyle = {
  height: 150,
  width: 250,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const loginInputStyle = {
  height: 40,
  width: '80%',
  borderRadius: 6,
  border: '2px solid #eee',
  padding: 5
};

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: 'amy',
      password: 'password2',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(e) {
    e.preventDefault();
    this.props.attemptLogin(this.state);
  }

  onInputChange(inputName, value) {
    this.setState({
      [inputName]: value
    });
  }

  render() {
    if(this.props.loading) {
      return <Loading />;
    }
    return (
      <div style={loginWrapperStyle}>
        <img alt="" style={titleStyle} src={titleImage} />
        <form style={loginFormStyle} onSubmit={this.submitLogin}>
          <input
            style={loginInputStyle}
            value={this.state.username}
            type="text"
            name="username"
            onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
          />
          <input
            style={loginInputStyle}
            value={this.state.password}
            type="password"
            name="password"
            onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
          />
          <button className="login-button">Log in</button>
        </form>
      </div>
    );
  }
}
