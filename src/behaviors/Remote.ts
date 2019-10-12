import Behavior from '../Behavior';
import Subscription from '../Subscription';
import Request from '../http/Request';

export default class Remote extends Behavior {
  get selector() {
    return '[data-remote]';
  }

  apply(element: Element) {
    return new Subscription(element, 'submit', this.submit);
  }

  private submit(event: Event) {
    event.preventDefault();

    let form = event.target as HTMLFormElement;

    form.reportValidity();

    let url = form.getAttribute('action') || window.location.pathname;
    let method = form.getAttribute('method') || 'GET';
    let data = new FormData(form);

    Request.make(url, method, data).then(response => {
      let serverSentRedirectJs =
        response.hasBody && response.isType('application/javascript');

      if (serverSentRedirectJs) {
        let evaluate = eval;
        evaluate(response.text);
      } else {
        let redirectUrl = response.url || window.location.pathname;
        window.location.href = redirectUrl;
      }
    });
  }
}
