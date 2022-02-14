import accountActionTypes, {
  commonActionTypes,
  merchantActionTypes,
  patronActionTypes,
  programActionTypes,
  rulesActionTypes,
  statisticsActionTypes,
} from '../../constants/actionTypes';

export const initialState = {
  authenticatedUser: null,
  isAuthenticated: false,
  isAuthenticationInProgress: true,
  isGlobalLoading: false,
  userAttributes: {},
  profile: {},
  userSession: {},
  user: null,
  settings: {},
  merchantInfo: {},
  statistics: {},
  program: {},
  rules: [],
};

export const accountReducer = (
  state = initialState,
  action = { type: null, payload: null }
) => {
  switch (action.type) {
    case accountActionTypes.ACCOUNT_SET_AUTHENTICATED_USER: {
      return {
        ...JSON.parse(JSON.stringify(state)),
        authenticatedUser: action.payload,
        isAuthenticated: true,
        isAuthenticating: false,
      };
    }
    case accountActionTypes.ACCOUNT_SIGN_OUT_AUTHENTICATED_USER: {
      return {
        ...state,
        authenticatedUser: action.payload,
        isAuthenticated: false,
        isAuthenticating: false,
      };
    }
    case accountActionTypes.ACCOUNT_SET_PROFILE: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case accountActionTypes.ACCOUNT_GET_PROFILE: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case accountActionTypes.SET_PROFILE_PIC: {
      return {
        ...state,
        user: {
          ...state.user,
          item: {
            ...state.user.item,
            profilePicture: action.payload,
          },
        },
      };
    }
    case accountActionTypes.SET_LOGO: {
      return {
        ...state,
        user: {
          ...state.user,
          item: {
            ...state.user.item,
            logo: action.payload,
          },
        },
      };
    }
    case accountActionTypes.ACCOUNT_SET_USER_SESSION: {
      return {
        ...state,
        userSession: action.payload,
      };
    }
    case accountActionTypes.ACCOUNT_SET_AUTHENTICATION_INPROGRESS: {
      return {
        ...state,
        isAuthenticationInProgress: action.payload,
      };
    }
    case commonActionTypes.API_FETCH_INPROGRESS: {
      return {
        ...state,
        isGlobalLoading: action.payload,
      };
    }
    case accountActionTypes.ACCOUNT_SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case patronActionTypes.GET_PATRON_SETTING: {
      return {
        ...state,
        settings: action.payload,
      };
    }
    case merchantActionTypes.GET_MERCHANT_INFO: {
      return {
        ...state,
        merchantInfo: action.payload,
      };
    }
    case merchantActionTypes.SET_REWARDS: {
      return {
        ...state,
        user: {
          ...state.user,
          item: {
            ...state.user.item,
            rule_rewards: action.payload,
          },
        },
      };
    }
    case statisticsActionTypes.GET_STATISTICS_INFO: {
      return {
        ...state,
        statistics: action.payload,
      };
    }
    case programActionTypes.GET_PROGRAM_INFO: {
      return {
        ...state,
        program: action.payload,
      };
    }
    case rulesActionTypes.GET_RULES_INFO: {
      return {
        ...state,
        rules: action.payload,
      };
    }
    default:
      return state;
  }
};
