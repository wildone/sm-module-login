const TOKEN_ISSUER = 'https://simpla.auth0.com/',
      TOKEN_KEY = 'sm-token';

function tokenIsValid(token) {
  const now = (new Date()).getTime() / 1000;
  let payload;

  if (!token) {
    return false;
  }

  try {
    let [, payloadString, ] = token.split('.');
    payload = JSON.parse(atob(payloadString));
  } catch (e) {
    console.warn('Invalid token', e.message);
    return false;
  }

  // Check if payload has expired
  if (payload.exp && now > payload.exp) {
    return false;
  }

  // Check to see if issuer
  if (!payload.iss || payload.iss !== TOKEN_ISSUER) {
    return false;
  }

  return true;
}

export default {
  properties: {
    token: {
      type: String,
      observer: '_setTokenInStorage'
    }
  },

  ready() {
    let tokenInStorage;

    Simpla._v1.observe('token', token => this.token = token);

    try {
      tokenInStorage = window.localStorage.getItem(TOKEN_KEY);
    } catch (e) {
      tokenInStorage = false;
      console.log('Could not load login token from storage. Are you in Private Mode?');
    }

    if (tokenIsValid(tokenInStorage)) {
      // WARNING: This is private and should be removed in future
      Simpla._v1._store.dispatch({
        type: 'login-successful',
        response: tokenInStorage
      });
    } else {
      try {
        window.localStorage.removeItem(TOKEN_KEY);
      } catch (e) {
        console.warn('Could not remember login token. Are you in Private Mode?');
      }
    }
  },

  _setTokenInStorage(token) {
    if (token) {
      try {
        window.localStorage.setItem(TOKEN_KEY, token);
      } catch (e) {
        console.warn('Could not remember login token. Are you in Private Mode?');
      }
    } else {
      try {
        window.localStorage.removeItem(TOKEN_KEY);
      } catch (e) {
        console.warn('Could not logout. Are you in Private Mode?');
      }
    }
  }
}
