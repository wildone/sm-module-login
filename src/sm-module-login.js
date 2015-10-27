import error from './behaviors/error.js';

class SmModuleLogin {
  beforeRegister() {
    this.is = 'sm-module-login';

    this.properties = {
      error: Boolean,
      busy: {
        type: Boolean,
        observer: '_busyChanged'
      },
      email: String,
      password: String,
      _errorCode: Number,
      _authenticated: {
        type: Boolean,
        observer: '_authenticationChanged'
      }
    }
  }

  get behaviors() {
    return [
      error
    ]
  }

  login(event) {
    event.preventDefault();
    this.$.auth.login();
  }

  _handleError({ detail }) {
    this.error = true;
    this._errorCode = detail.code;
  }

  _authenticationChanged(authenticated) {
    if (authenticated) {
      this.error = false;
    }
  }

  _busyChanged(busy) {
    if (busy) {
      this.error = false;
    }
  }
}

Polymer(SmModuleLogin);
