import Response from './Response';

export default class Request {
  url: string;
  method: string;
  data: any;
  headers: Record<string, string>;

  constructor(
    url: string,
    method: string,
    data: any,
    headers: Record<string, string>,
  ) {
    this.url = url;
    this.method = method;
    this.data = data;
    this.headers = {
      ...headers,
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  static make(
    url: string,
    method: string = 'GET',
    data?: any,
    headers: Record<string, string> = {},
  ) {
    let request = new Request(url, method, data, headers);
    return request.send();
  }

  send() {
    let xhr = new XMLHttpRequest();
    xhr.open(this.method, this.url);

    Object.entries(this.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    return new Promise<Response>((resolve, reject) => {
      let response = Response.fromXHR(xhr);

      xhr.onload = () => resolve(response);
      xhr.onerror = () => reject(response);

      xhr.send(this.data);
    });
  }
}
