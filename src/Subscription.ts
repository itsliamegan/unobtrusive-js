type Listener = (event: Event) => void | Promise<void>;
type Cleanup = (element: Element) => void | Promise<void>;

export default class Subscription {
  private element: Element;
  private type: string;
  private listener: Listener;
  private cleanup: Cleanup;

  constructor(
    element: Element,
    type: string,
    listener: Listener,
    cleanup?: Cleanup,
  ) {
    this.element = element;
    this.type = type;
    this.listener = listener;
    this.cleanup = cleanup || function() {};
  }

  subscribe() {
    this.element.addEventListener(this.type, this.listener);
  }

  unsubscribe() {
    this.element.removeEventListener(this.type, this.listener);
    this.cleanup(this.element);
  }
}
