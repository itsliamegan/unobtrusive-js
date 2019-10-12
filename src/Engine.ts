import Behavior from './Behavior';

export default class Engine {
  private behaviors: Behavior[] = [];

  register(behavior: Behavior) {
    this.behaviors.push(behavior);
  }

  start() {
    this.behaviors.forEach(b => b.setup());
  }

  stop() {
    this.behaviors.forEach(b => b.teardown());
  }

  turbolinks() {
    document.addEventListener('turbolinks:load', this.start.bind(this));
    document.addEventListener('turbolinks:before-visit', this.stop.bind(this));
  }
}
