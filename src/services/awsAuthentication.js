import { Auth } from '@aws-amplify/auth';

/**
 * @param {string} username
 * @param {string} password
 * @return {Promise<any>}
 */
export function signIn(username, password) {
  return Auth.signIn(username, password);
}

/**
 * @return {Promise<any>}
 */
export function signOut() {
  return Auth.signOut();
}

/**
 * @param {string} username
 * @return {Promise<any>}
 */
export function forgotPassword(username) {
  const login = username.toLowerCase();

  return Auth.forgotPassword(login);
}

/**
 * @param {string} username
 * @param {string} code
 * @param {string} password
 * @return {Promise<void>}
 */
export function forgotPasswordSubmit(username, code, password) {
  const login = username.toLowerCase();

  return Auth.forgotPasswordSubmit(login, code, password);
}

/**
 * @return {Promise<any>}
 */
export function getCurrentAuthenticatedUser() {
  return Auth.currentAuthenticatedUser();
}

/**
 * @return {Promise}
 */
export function getUserSession() {
  return Auth.currentSession();
}

/**
 * @return {Promise<string>}
 */
export function getIdentityJWT() {
  const NO_TOKEN = '';

  return getUserSession()
    .then((session) => {
      if (session && session.idToken && session.idToken.jwtToken) {
        return session.idToken.jwtToken;
      }

      return NO_TOKEN;
    })
    .catch(() => NO_TOKEN);
}
