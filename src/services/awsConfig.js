const dev = {
  region: 'us-east-2',
  UserPoolId: 'us-east-2_h5VgkdRFS',
  ClientId: '6kjhg3r44d2cq9qlmlblthot2i',
  invokeUrlToken: 'https://dev-api.favr.town',
  unauthenticatedInvokeUrlToken: 'https://u-dev-api.favr.town',
  invokeUrlIAM: '',
};

const prod = {
  region: 'us-east-2',
  UserPoolId: 'us-east-2_hI5oOyHdp',
  ClientId: '6j0a8u37a3od7j0rs3n0bhb3hf',
  invokeUrlToken: 'https://api.favr.town',
  unauthenticatedInvokeUrlToken: 'https://u-api.favr.town',
  invokeUrlIAM: '',
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default config;
