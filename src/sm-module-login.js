import showError from './behaviors/showError.js';
import persistToken from './behaviors/persistToken';

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
      active: {
        type: Boolean,
        observer: '_activeChanged',
        computed: '_computeActive(_editing, _authenticated)'
      },
      _errorCode: Number,
      _authenticated: {
        type: Boolean,
        observer: '_authenticationChanged',
        value: Simpla._v1.getState().authenticated
      },
      _editing: {
        type: Boolean,
        value: Simpla._v1.getState().editing
      }
    }
  }

  get behaviors() {
    return [
      showError,
      persistToken
    ];
  }

  created() {
    Simpla._v1.observe('authenticated', (authenticated) => {
      this._authenticated = authenticated;
    });

    Simpla._v1.observe('editing', (editing) => {
      this._editing = editing;
    });
  }

  detached() {
    // Should reset all values so they're not persisted
    this.email = '';
    this.password = '';
  }

  login(event) {
    if (event) {
      event.preventDefault();
    }

    this.busy = true;
    return Simpla._v1.login({ email: this.email, password: this.password })
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

  _computeActive(_editing, _authenticated) {
    return _editing && !_authenticated;
  }

  _handleModalClosed() {
    if (!this._authenticated && this.active) {
      Simpla._v1.toggleEditing(false);
    }
  }

  _activeChanged(active) {
    if (active) {
      this.hidden = false;
    }
  }
}

// Register with Polymer
Polymer(SmModuleLogin);

// Setup and
let singleton = document.createElement('sm-module-login'),
    inject;

// Singleton should be hidden by default iff singleton is not already active
if (!singleton.active) {
  singleton.setAttribute('hidden', '');
}

inject = () => {
  if (document.body) {
    document.body.appendChild(singleton);
    document.removeEventListener('readystatechange', inject);
    return true;
  }

  return false;
}

inject() || document.addEventListener('readystatechange', inject);
