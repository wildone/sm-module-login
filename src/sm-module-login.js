import error from './behaviors/error.js';

class SmModuleLogin {
  beforeRegister() {
    this.is = 'sm-module-login';

    this.properties = {
      error: Boolean
    }
  }

  get behaviors() {
    return [
      error
    ]
  }
}

Polymer(SmModuleLogin);
