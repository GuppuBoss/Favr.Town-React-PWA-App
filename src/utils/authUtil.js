const getUserGroup = (authenticatedUser) => {
  try {
    return authenticatedUser.signInUserSession.accessToken.payload[
      'cognito:groups'
    ][0];
  } catch (error) {
    throw new Error('Invalid user group');
  }
};

export default getUserGroup;
