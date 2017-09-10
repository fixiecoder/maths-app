const baseUrl = 'https://4uyjdpykmh.execute-api.eu-west-1.amazonaws.com/prod';

const makeRequest = (uri, method, body) => (dispatch, getState) => new Promise((resolve, reject) => {
  const authTokens = getState().get('auth');
  const headers = new Headers({
    'x-auth-token-key': authTokens.get('tokenKey'),
    'x-auth-token-value': authTokens.get('tokenValue'),
    'content-type': 'application/json'
  });
  const request = {
    method,
    headers
  };

  // if(method === 'GET') {
  //   request.mode = 'no-cors';
  // }

  if(body) {
    request.body = JSON.stringify(body);
  }

  fetch(`${baseUrl}${uri}`, request)
    .then(response => {
      if(response.ok) {
        const contentType = response.headers.get('content-type');
        if(contentType === 'application/json') {
          return response.json();
        } else {
          return response.text();
        }
      } else {
        throw new Error(response);
      }
    })
    .then(responseData => resolve(responseData))
    .catch(e => reject(e));
});

export default {
  get: uri => dispatch => dispatch(makeRequest(uri, 'GET')),

  del: uri => dispatch => dispatch(makeRequest(uri, 'DELETE')),

  post: (uri, body) => dispatch => dispatch(makeRequest(uri, 'POST', body)),

  put: (uri, body) => dispatch => dispatch(makeRequest(uri, 'PUT', body)),
};
