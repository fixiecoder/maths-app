import React from 'react';
import titleImage from '../../assets/title_blue.svg';
import Loading from './loading';

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
      <div className="login-wrapper">
        <img alt="" className="login-title-image" src={titleImage} />
        <form className="login-form" onSubmit={this.submitLogin}>
          <input
            className="login-input"
            value={this.state.username}
            type="text"
            name="username"
            onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
          />
          <input
            className="login-input"
            value={this.state.password}
            type="password"
            name="password"
            onChange={(e) => this.onInputChange(e.target.name, e.target.value)}
          />
          <button className="login-button">Log in</button>
        </form>
        <p className="login-page-error-message">{this.props.loginError}</p>
      </div>
    );
  }
}
