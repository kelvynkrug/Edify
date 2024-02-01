import HttpHeader from 'App/Models/Transfer/HttpHeader';
import HttpBody from 'App/Models/Transfer/HttpBody';

function getHeaders() {
  const headers: HttpHeader[] = [{ key: 'Content-type', value: 'application/json' }];

  return headers;
}

function getBody(code, result) {
  const body: HttpBody = { code, result };

  return body;
}

export default { getHeaders, getBody };
