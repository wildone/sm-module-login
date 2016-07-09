import showError from './behaviors/showError.js';

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
      showError
    ]
  }

  created() {
    Simpla.observe('authentication.authenticated', (authenticated) => {
      this._authenticated = authenticated;
    });
  }

  login(event) {
    if (event) {
      event.preventDefault();
    }

    this.busy = true;
    return Simpla.login({ email: this.email, password: this.password })
      .catch(error => this._handleError(error))
      .then(() => this.busy = false);
  }

  _handleError(error) {
    this.error = true;
    this._errorCode = error.code;
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
