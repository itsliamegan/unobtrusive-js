import Subscription from './Subscription';

export default abstract class Behavior {
  private subscriptions: Subscription[] = [];

  abstract get selector(): string;
  abstract apply(element: Element): Subscription;

  setup() {
    let elements = document.querySelectorAll(this.selector);

    elements.forEach(element => {
      let subscription = this.apply(element);
      subscription.subscribe();
      this.subscriptions.push(subscription);
    });
  }

  teardown() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
