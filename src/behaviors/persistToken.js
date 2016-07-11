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
  observers: [
    '_setTokenInStorage(token)'
  ],

  created() {
    let tokenInStorage = window.localStorage.getItem(TOKEN_KEY);

    if (tokenIsValid(tokenInStorage)) {
      // WARNING: This is private and should be removed in future
      Simpla._store.dispatch({
        type: 'login-successful',
        token: tokenInStorage
      });
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  },

  _setTokenInStorage(token) {
    console.log('token', token);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}
