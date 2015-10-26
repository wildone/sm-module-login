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

  _handleError() {
    this.error = true;
  }

  _authenticationChanged(value) {
    if (value) {
      this.error = false;
    }
  }
}

Polymer(SmModuleLogin);
