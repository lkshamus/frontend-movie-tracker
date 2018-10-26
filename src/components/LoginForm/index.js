import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoggedIn } from '../../actions'
import { displaySignUp } from '../../actions';

import './LoginForm.css'

import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

export class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loginError: '',
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeWarning = () => {
    this.setState({
      loginError: '',
    })
  }

  userWarning = async (type, warning) => {
    await this.setState({
      [type]: warning
    })
    await setTimeout(this.removeWarning, 5000)
    console.log(warning)
  }

  submitLogin = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await userDatabaseFetch.checkUserList({ email, password })

      await this.props.logUserIn(response.data.id, response.data.name)
      console.log(response)
    } catch(error) {
      console.log(error)
      this.userWarning('loginError', 'login-error-active')
    }
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.submitLogin} className={`login-form ${this.props.showLogin}`}>
        <h1><span>movie</span>Tracker</h1>
        <h4>for the love of film</h4>
        <input
          className='email-input'
          onChange={this.handleChange}
          value={this.state.email}
          name='email'
          placeholder='email'
        ></input>
        <img 
          src='./email.png' 
          alt='mail' 
          className='email-icon'
        />
        <input
          className='password-input'
          onChange={this.handleChange}
          type='password'
          value={this.state.password}
          name='password'
          placeholder='password'
        ></input>
        <img 
          src='./password.png' 
          alt='lock' 
          className='password-icon'
        />
        <input
          className='login-submit'
          type='submit'
          value='login'
        ></input>
        <button 
          onClick={this.props.displaySignUp}
          className='sign-up-button'
        >
          signup
        </button>
        <section className='login-social-wrapper'>
          <i className="fab fa-facebook login-social"></i>
          <i className="fab fa-twitter login-social"></i>
        </section>
        <Link to='/release-date'>
          <button className='skip-login'>skip login</button>
        </Link>
        <div className={`login ${this.state.loginError}`}></div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  showLogin: state.showLogin
})

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (id, name) => dispatch(getUserLoggedIn(id, name)),
  displaySignUp: () => dispatch(displaySignUp())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)