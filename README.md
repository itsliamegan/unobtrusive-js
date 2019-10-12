# Unobtrusive JS

Ruby on Rails has a great library called "UJS" which brings some useful features for progressively enhancing web apps. Not everybody is using Rails, though, so for those who aren't, this library provides a similar feature set that is independent of your frontend or backend architecture.

This library _does not_ and _will not_ attempt to be an exact API equivalent of the Rails version. It's feature set is merely inspired by it.

## Usage

To start using Unobtrusive, import it and call the `start` method. If you are using [Turbolinks](https://github.com/turbolinks/turbolinks), call the `turbolinks` method instead, which will set up and clean up the listeners on every
Turbolinks visit.

```js
import Unobtrusive from 'unobtrusive-js';

// Normally
Unobtrusive.start();

// Turbolinks
Unobtrusive.turbolinks();
```

Now you can start using data-\* attributes, called "behaviors", to enhance your application! See below for a full list of behaviors and their usage.

### Behaviors

#### data-disable-with

Placed on a `<button>`, the button will become disabled and have the given text content after being clicked.

```html
<button type="submit" data-disable-with="Submitting...">Submit</button>
```

#### data-remote

Placed on a `<form>`, it won't trigger a full page refresh as usual. Instead, it will be submitted via AJAX.

```html
<form method="POST" action="/url" data-remote></form>
```

##### Redirecting After Submission

Redirecting is a common pattern after form submission. Redirects are as transparent as possible with Unobtrusive. If the server returns a typical 302 response, XMLHttpRequest will transparently follow it, and Unobtrusive will redirect to the final URL. **If the server returns a text response with the Content-Type: application/json, Unobtrusive will `eval` it**! This is very useful if you use Turbolinks, so you can send a `Turbolinks.visit` back to the client to redirect. **Make sure** that you don't send back user-generated text in the JavaScript, because it will be evaluated in the global scope by the browser!
