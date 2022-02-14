import { isEmpty } from 'lodash';

import { getIdentityJWT } from './awsAuthentication';
import AWSConfig from './awsConfig';

async function callAPI(
  methodName,
  path,
  body = {},
  additionalParams = {},
  isUnauthenticatedApiCall
) {
  const requestInfo = {
    methodName,
    body,
    additionalParams,
  };
  try {
    const sessionToken = await getIdentityJWT();
    const url = new URL(
      `${
        isUnauthenticatedApiCall
          ? AWSConfig.unauthenticatedInvokeUrlToken
          : AWSConfig.invokeUrlToken
      }/${path}`
    );
    if (!isEmpty(additionalParams)) {
      Object.keys(additionalParams).forEach((key) => {
        url.searchParams.append(key, additionalParams[key]);
      });
    }
    if (methodName !== 'GET') {
      return fetch(url, {
        method: methodName,
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionToken,
        },
        body: JSON.stringify(body),
      }).then(async (response) => {
        // if (response.status === 404) {
        //   window.location.href = `${window.location.origin}/not-found`;
        // }
        const responseData = await response.json();
        return { ...responseData, status: response.status };
      });
    }
    return fetch(url, {
      method: methodName,
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionToken,
      },
    }).then(async (response) => {
      // if (response.status === 404) {
      //   window.location.href = `${window.location.origin}/not-found`;
      // }
      const responseData = await response.json();
      return { ...responseData, status: response.status };
    });
  } catch (error) {
    throw new Error({
      request: requestInfo,
      error,
    });
  }
}

export function GET(path, additionalParams = {}) {
  return callAPI('GET', path, {}, additionalParams);
}

export function POST(path, body = {}, additionalParams = {}) {
  return callAPI('POST', path, body, additionalParams);
}

export function PUT(
  path,
  body = {},
  additionalParams = {},
  isUnauthenticatedApiCall
) {
  return callAPI('PUT', path, body, additionalParams, isUnauthenticatedApiCall);
}

export function DELETE(path, body = {}, additionalParams = {}) {
  return callAPI('DELETE', path, body, additionalParams);
}

export function PATCH(path, body = {}, additionalParams = {}) {
  return callAPI('PATCH', path, body, additionalParams);
}
