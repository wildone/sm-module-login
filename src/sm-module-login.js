import error from './behaviors/error.js';

class SmModuleLogin {
  beforeRegister() {
    this.is = 'sm-module-login';

    this.properties = {
      error: Boolean,
      busy: {
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }

  get behaviors() {
    return [
      error
    ]
  }
}

Polymer(SmModuleLogin);
