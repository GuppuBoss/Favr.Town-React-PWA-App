export const getAuthenticatedUser = (state) => {
  return state.account.authenticatedUser;
};

export const getIsAuthenticated = (state) => {
  return state.account.isAuthenticated;
};

export const getIsAuthenticationInProgress = (state) => {
  return state.account.isAuthenticationInProgress;
};

export const getIsGlobalLoading = (state) => {
  return state.account.isGlobalLoading;
};

export const getUserData = (state) => {
  return state.account.user;
};

export const getSettings = (state) => {
  return state.account.settings;
};

export const getMerchantInfo = (state) => {
  return state.account.merchantInfo;
};

export const getStatisticsData = (state) => {
  return state.account.statistics;
};

export const getProgramData = (state) => {
  return state.account.program;
};

export const getRulesData = (state) => {
  return state.account.rules;
};
