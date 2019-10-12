let { JSDOM } = require('jsdom');
let { expect } = require('chai');
let { FakeXMLHttpRequest, useFakeXMLHttpRequest } = require('sinon');
let Unobtrusive = require('../');

let dom = new JSDOM(`
  <button id="button" data-disable-with="Clicking...">Click</button>

  <form id="form" method="POST" action="/test" data-remote>
    <input name="name" value="value">
    <button type="submit" id="submit-button">Submit</button>
  </form>
`);

(global as any).window = dom.window;
(global as any).document = dom.window.document;
(global as any).XMLHttpRequest = FakeXMLHttpRequest;
(global as any).FormData = dom.window.FormData;

let requests: any[] = [];
let clickCount = 0;

Unobtrusive.start();

describe('Engine', () => {
  before(() => {
    let xhr = useFakeXMLHttpRequest();
    xhr.onCreate = request => {
      requests.push(request);
    };

    let button = document.getElementById('button') as HTMLButtonElement;

    button.addEventListener('click', () => {
      clickCount++;
    });
  });

  describe('DisableWith behavior', () => {
    it('disables buttons when clicked', done => {
      let button = document.getElementById('button') as HTMLButtonElement;
      button.click();

      setTimeout(() => {
        expect(button.disabled).to.be.true;
        expect(button.textContent).to.equal('Clicking...');
        done();
      }, 0);
    });

    it('allows the click to go through', () => {
      expect(clickCount).to.equal(1);
    });
  });

  describe('Remote behavior', () => {
    it('submits forms with AJAX', () => {
      let submit = document.getElementById(
        'submit-button',
      ) as HTMLButtonElement;
      submit.click();

      expect(requests).to.have.length(1);
    });
  });
});
