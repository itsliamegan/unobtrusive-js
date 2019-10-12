export default class Response {
  status: number;
  text: string;
  url: string;
  headers: Record<string, string>;

  constructor(
    status: number,
    text: string,
    url: string,
    headers: Record<string, string>,
  ) {
    this.status = status;
    this.text = text;
    this.url = url;
    this.headers = headers;
  }

  static fromXHR(xhr: XMLHttpRequest) {
    let headers: Record<string, string> = {};
    let headersString = xhr.getAllResponseHeaders() || '';
    headersString
      .split('\r\n')
      .map(h => h.split(': '))
      .forEach(([key, value]) => {
        headers[key] = value;
      });

    return new Response(xhr.status, xhr.responseText, xhr.responseURL, headers);
  }

  get isSuccess() {
    return this.status < 400;
  }

  get hasBody() {
    return !!this.text;
  }

  isType(contentType: string) {
    return this.header('Content-Type') === contentType;
  }

  header(name: string) {
    name = name.toLowerCase();
    let header = this.headers[name];

    return header;
  }
}
