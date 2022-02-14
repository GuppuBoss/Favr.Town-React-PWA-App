/* eslint-disable no-param-reassign */
const { apiGateway, uritemplate } = window;

/**
 * @param {Object} configuration
 */
export default (configuration) => {
  const apigClient = {};

  let config = { ...configuration };

  if (config === undefined) {
    config = {
      accessKey: '',
      secretKey: '',
      sessionToken: '',
      region: '',
      apiKey: undefined,
      defaultContentType: 'application/json',
      defaultAcceptType: 'application/json',
    };
  }
  if (config.accessKey === undefined) {
    config.accessKey = '';
  }
  if (config.secretKey === undefined) {
    config.secretKey = '';
  }
  if (config.apiKey === undefined) {
    config.apiKey = '';
  }
  if (config.sessionToken === undefined) {
    config.sessionToken = '';
  }
  if (config.region === undefined) {
    config.region = 'us-east-1';
  }
  // If defaultContentType is not defined then default to application/json
  if (config.defaultContentType === undefined) {
    config.defaultContentType = 'application/json';
  }
  // If defaultAcceptType is not defined then default to application/json
  if (config.defaultAcceptType === undefined) {
    config.defaultAcceptType = 'application/json';
  }

  const sigV4ClientConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    sessionToken: config.sessionToken,
    serviceName: 'execute-api',
    region: config.region,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType,
  };

  let invokeUrl;
  let authType = 'NONE';
  if (
    sigV4ClientConfig.accessKey !== undefined &&
    sigV4ClientConfig.accessKey !== '' &&
    sigV4ClientConfig.secretKey !== undefined &&
    sigV4ClientConfig.secretKey !== ''
  ) {
    authType = 'AWS_IAM';
    invokeUrl = config.invokeUrlIAM;
  } else {
    invokeUrl = config.invokeUrlToken;
  }

  // eslint-disable-next-line no-useless-escape
  const endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
  sigV4ClientConfig.endpoint = endpoint;

  const pathComponent = invokeUrl.substring(endpoint.length);

  const simpleHttpClientConfig = {
    endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType,
  };
  const apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(
    simpleHttpClientConfig,
    sigV4ClientConfig
  );

  apigClient.cOptions = (params, body, additional) => {
    const additionalParams = additional || {};

    apiGateway.core.utils.assertParametersDefined(params, ['model'], ['body']);

    const optionsRequest = {
      verb: 'options'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/c').expand(
          apiGateway.core.utils.parseParametersToObject(params, ['model'])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };

    return apiGatewayClient.makeRequest(
      optionsRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelOptions = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      // eslint-disable-next-line no-param-reassign
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

    const modelOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/{model}').expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };

    return apiGatewayClient.makeRequest(
      modelOptionsRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelDelete = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      // eslint-disable-next-line no-param-reassign
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ['model'], ['body']);
    const modelRequest = {
      verb: 'delete'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/{model}').expand(
          apiGateway.core.utils.parseParametersToObject(params, ['model'])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelGet = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ['model'], ['body']);
    const modelRequest = {
      verb: 'get'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/{model}').expand(
          apiGateway.core.utils.parseParametersToObject(params, ['model'])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelPatch = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ['model'], ['body']);
    const modelRequest = {
      verb: 'patch'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/{model}').expand(
          apiGateway.core.utils.parseParametersToObject(params, ['model'])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelPost = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ['model'], ['body']);
    const modelRequest = {
      verb: 'post'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/{model}').expand(
          apiGateway.core.utils.parseParametersToObject(params, ['model'])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelPut = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ['model'], ['body']);
    const modelRequest = {
      verb: 'put'.toUpperCase(),
      path:
        pathComponent +
        uritemplate('/{model}').expand(
          apiGateway.core.utils.parseParametersToObject(params, ['model'])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  return apigClient;
};
