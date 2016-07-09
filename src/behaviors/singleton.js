// Control SmModuleLogin getting attached to body based on Simpla's authentication
let singleton = document.createElement('sm-module-login');

export default {
  observers: [
    '_attachOrDetach(_authenticated)'
  ],

  attached() {
    this.$.modal.active = true;
  },

  detached() {
    // Should reset modal so it animates on attach again
    this.$.modal.active = false;

    // Should reset all values so they're not persisted
    this.email = '';
    this.password = '';
  },

  _attachOrDetach(_authenticated) {
    if (!document.body) {
      this.__readyStateListener = () => {
        if (document.readyState !== 'loading') {
          this._attachOrDetach(_authenticated);
          document.removeEventListener('readystatechange', this.__readyStateListener);
        }
      }

      document.addEventListener('readystatechange', this.__readyStateListener);
    } else {
      if (!_authenticated) {
        document.body.appendChild(singleton);
      } else if (document.body.contains(singleton)) {
        document.body.removeChild(singleton);
      }
    }
  }
}
