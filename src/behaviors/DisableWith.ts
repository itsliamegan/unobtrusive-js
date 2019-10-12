import Behavior from '../Behavior';
import Subscription from '../Subscription';

export default class DisableWith extends Behavior {
  get selector() {
    return '[data-disable-with]';
  }

  apply(element: Element) {
    return new Subscription(element, 'click', this.disable, this.enable);
  }

  private disable(event: Event) {
    let button = event.target as HTMLButtonElement;
    let enabledText = button.textContent || '';
    let disabledText = button.dataset.disableWith || '';

    button.disabled = true;
    button.textContent = disabledText;
    button.dataset.enabledText = enabledText;
  }

  private enable(element: Element) {
    let button = element as HTMLButtonElement;
    let enabledText = button.dataset.enabledText || '';

    button.disabled = false;
    button.textContent = enabledText;
  }
}
