import { get } from 'lodash/get';
import promiseRetry from 'promise-retry';

import { getIdentityJWT } from './awsAuthentication';
import AWSConfig from './awsConfig';
import apiGatewayClient from './awsGatewayClient';

const callApiGateway = apiGatewayClient({
  invokeUrlToken: AWSConfig.invokeUrlToken,
  invokeUrlIAM: AWSConfig.invokeUrlIAM,
});

function callAPI(
  methodName,
  params = {},
  body = {},
  additionalParams = {},
  showErrors = true,
  withoutRetry = true
) {
  const additional = { ...additionalParams };
  const requestInfo = {
    methodName,
    params,
    body,
    additionalParams,
  };

  return promiseRetry(
    (retry) =>
      getIdentityJWT()
        .then((identityJWT) => {
          if (!additional.headers) {
            additional.headers = {};
          }
          if (!additional.queryParams) {
            additional.queryParams = {};
          }
          if (identityJWT) {
            additional.headers.Authorization = identityJWT;
          }

          return callApiGateway[methodName](params, body, additional);
        })
        .then((response) => get(response, 'data', {}))
        .catch((e) => {
          if (withoutRetry) {
            throw e;
          } else {
            retry(e);
          }
        }),
    {
      retries: 2,
      minTimeout: 200,
      maxTimeout: 800,
    }
  ).then(
    (value) => value,
    (err) => {
      console.error({
        request: requestInfo,
        error: err,
      });

      if (showErrors) {
        // show errors
      }

      throw get(err, 'data', err);
    }
  );
}

export function GET(model, additional = {}, showErrors, withoutRetry) {
  return callAPI(
    'modelGet',
    { model },
    {},
    additional,
    showErrors,
    withoutRetry
  );
}

export function POST(
  model,
  body = {},
  additional = {},
  showErrors,
  withoutRetry
) {
  return callAPI(
    'modelPost',
    { model },
    body,
    additional,
    showErrors,
    withoutRetry
  );
}

export function PUT(
  model,
  body = {},
  additional = {},
  showErrors,
  withoutRetry
) {
  return callAPI(
    'modelPut',
    { model },
    ...body,
    additional,
    showErrors,
    withoutRetry
  );
}

export function DELETE(
  model,
  body = {},
  additional = {},
  showErrors,
  withoutRetry
) {
  return callAPI(
    'modelDelete',
    { model },
    body,
    additional,
    showErrors,
    withoutRetry
  );
}

export function PATCH(
  model,
  body = {},
  additional = {},
  showErrors,
  withoutRetry
) {
  return callAPI(
    'modelPatch',
    { model },
    body,
    additional,
    showErrors,
    withoutRetry
  );
}
