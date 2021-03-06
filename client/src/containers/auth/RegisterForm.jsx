import React, { Component } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import * as actions from '../../actions/authActions.jsx';
import { connect } from 'react-redux';

const renderInput = (field) => {
    const { label, type, input, meta: { error, touched } } = field;
    return (
        <div>
            <label>{label}:</label>
            <input {...input} type={type}
                className="form-control" />
                {touched && error && <div className="error">{error}</div>}
        </div>
    );
}

class RegisterForm extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser({...formProps}, {type: 'padawan'});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    // renders the sign up register form
    return (
      <Form className="form" style={{marginTop: 150}} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label>First Name:</label>
            <Field className="form-control" component="input" name="firstName" type="text" />
          <label>Last Name:</label>
            <Field className="form-control" component="input" name="lastName" type="text" />
          <label>Email:</label>
            <Field className="form-control" component="input" name="email" type="email" />
          <label>Password:</label>
            <Field className="form-control" component="input" name="password" type="password" />
          <label>Confirm Password:</label>
            <Field className="form-control" component="input" name="passwordConfirm" type="password" />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </Form>
    );
  }
}

function validate(formProps) {
    const errors = {};
    const { password, passwordConfirm, email } = formProps;

    if (!email) {
        errors.email = 'Please enter an email';
    }

    if (!password) {
        errors.password = 'Please enter a password';
    }

    if (!passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (password !== passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

RegisterForm = reduxForm({
  form: 'register',
  validate,
})(RegisterForm);

export default connect(mapStateToProps, actions)(RegisterForm);