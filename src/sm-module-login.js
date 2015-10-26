import error from './behaviors/error.js';

class SmModuleLogin {
  beforeRegister() {
    this.is = 'sm-module-login';

    this.properties = {
      error: Boolean,
      busy: {
        type: Boolean,
        reflectToAttribute: true
      },
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

  _handleError({ detail }) {
    this.error = true;
    this._errorCode = detail.code;
  }

  _authenticationChanged(value) {
    if (value) {
      this.error = false;
    }
  }
}

Polymer(SmModuleLogin);
