---
title: "We ♥ Progressive Web Apps, Part II"
summary: "Progressive Web Apps bring powerful native features like push notifications, offline, and homescreen install to the web."
date: "2017-03-07"
heroImage: "./we-heart-pwa-2.jpg"
---
Co-authored with [Abraham Williams](https://bendyworks.com/blog/authors/abraham_williams).

Back in December, we [raved about Progressive Web Apps](https://bendyworks.com/blog/we-heart-pwas) -- modern web apps that have native mobile features like instant loading, homescreen icons, offline access, and push notifications.

Now you want to make one, right? Well, okay! We're going to show you how to get started.

## Service Worker

First, you need a service worker. A service worker is a little piece of JavaScript that your browser (assuming you aren't using Safari -- more on that later) runs in the background. Service workers enable many of the features that distinguish PWAs from run-of-the-mill web apps. They cache app resources for fast loading, facilitate offline access, handle push notifications, and more.

In your client-side JavaScript code, register a service worker:

~~~javascript
// app.js
if('serviceWorker' in navigator) {
  window.addEventListener('load', => {
    navigator.serviceWorker
      .register('serviceworker.js')
      .then(registration => {
        console.log('Registered!');
      })
      .catch(err => {
        console.log('Registration failed: ', err);
      });
  });
}
~~~

The code above checks if service workers are [supported by the browser](https://jakearchibald.github.io/isserviceworkerready/) and, if they are, [registers the service worker](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration), passing in the url of the service worker script. By default, the service worker's scope is determined by its location relative to the project root, but you can specify something else by passing an [optional scope object](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) to the ```register``` method.

Next, create your service worker. A very simple service worker might look like this:

~~~javascript
// serviceworker.js
const CACHE_VERSION = 'v1';
const APP_LAYOUT_FILES = [
  '/',
  '/js/app.min.js',
  '/css/main.min.css'
];

this.addEventListener('install', event => {
  let cacheAssets = caches.open(CACHE_VERSION)
    .then(cache => {
      return cache.addAll(APP_LAYOUT_FILES);
    });
  event.waitUntil(cacheAssets);
});
~~~

This service worker consists mainly of an event listener that is listening for the ```install``` event. The ```install``` event is part of the [service worker lifecycle](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/lifecycle) and gets fired when your app registers the service worker.  

## Caching

The ```install``` event is a good time to [cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) the minimum HTML, CSS, and JavaScript that you will need to render your ["application shell"](https://developers.google.com/web/fundamentals/architecture/app-shell). Your app shell is what your user will see on subsequent visits before any network requests are resolved. And because you have cached only the assets you absolutely need for the initial layout, your app shell we be rendered very quickly.

The screenshots below show the app shell of our [demo PWA](https://sprinkle.works/). The user sees this instead of an error message before the full content is loaded.

| App Shell | Full Content |
| ------ | ----- |
| ![App Shell](https://bendyworks.com/assets/images/blog/extra/2017-03-07-shell-b1cb4683.png)|  ![Content](https://bendyworks.com/assets/images/blog/extra/2017-03-07-content-5359ec3a.png)|

After the app shell is cached, it will not need to be requested on future visits.  When the user comes back, the app shell will load instantly while the network-dependent content is fetched.

Back to the code sample: We wrap our cacheAssets function in the [```waitUntil()``` method](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) to prevent the service worker from becoming active before the assets are cached. If the install step fails, the browser just ignores the service worker.

Now that the service worker has successfully been installed, it can use the fetch event to intercept network requests. The service worker listen for ```fetch``` events and determines whether to respond from the cache or send a network request.

~~~javascript
// serviceworker.js
this.addEventListener('fetch', event => {
  let cacheAssets = caches.open(DATA_CACHE_VERSION)
    .then(cache => {
      return cache.match(event.request)
        .then(response => {
          if (response) { return response; }

          return fetch(event.request)
            .then(response => {
              return response;
            });
        });
      });
  event.respondWith(cacheAssets);
});
~~~

The code above intercepts a request and check to see if what's being requested already exists in the cache.  The cache is organized as key-value pairs, and the request itself is the key.  The [```cache.match()``` method](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match) tries to match the request with a key in the cache, and if it finds a match, returns the value, which is the stored response to the request. Depending on the needs of your app, you could also chose to go to the network first and use the cache as a backup in case of no connection. For an introduction to caching strategies, see Jake Archibald's [Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/).

Service workers can do more interesting things, notably push notifications, but you're off to a good start. Your users will never see an offline error message again.

## Web App Manifest

In addition to your service worker, you need one more file to make your app a PWA: [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/). The manifest is a JSON file that lets your users install your app on their devices and launch your app with a single click.

To let the browser know about your manifest, link to it from your HTML:

~~~html
<!--index.html-->
<link rel="manifest" href="/manifest.json">
~~~

Then in your manifest, you provide information about how you would like your app be displayed.

~~~javascript
// manifest.json
{
  "name": "Sprinkle PWA Demo",
  "short_name": "Sprinkle",
  "description": "Example PWA",
  "start_url": "/",
  "background_color": "#2196f3",
  "theme_color": "#2196f3",
  "display": "standalone",
  "icons": [
    {
      "src": "/icons/gallery-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }
  ]
}
~~~

For a full list of options for the manifest, see the documentation at the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Manifest).

The example above is the manifest from our PWA demo. It specifies the name of the app and location of the icon to install on the homescreen, the color of the splash screen that is displayed while the app loads (```background_color```), and the display type. The ```display: standalone``` option indicates that the browser chrome should be hidden so that the display looks like a native app.

| Homescreen Icon | Splash Screen |
| ------ | ----- |
| ![Homescreen Icon](https://bendyworks.com/assets/images/blog/extra/2017-03-07-homescreen-icon-348a8aa0.png)|  ![Splash screen](https://bendyworks.com/assets/images/blog/extra/2017-03-07-splash-screen-796a56ab.png)|

## Browser support

PWAs are not yet supported by every browser. Current versions of Chrome, Firefox, and Opera offer PWA support as well as helpful developer tools. Edge is working on it. Safari has PWA support under consideration.

This is where the "Progressive" part of PWA comes in. PWAs should be first and foremost great, responsive, fast web applications, which are progressively enhanced by native features when support is available.  

Want to make a PWA with us? [Get in touch!](/contact-form)

## Resources
* [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) by Matt Gaunt, Google Web Fundamentals
* [PWA.Rocks](https://pwa.rocks/), a selection of PWAs from Opera
* [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), Mozilla Developer Network
* [Is Serviceworker Ready?]( https://jakearchibald.github.io/isserviceworkerready/) by Jake Archibald
* [The App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell) by Addy Osmani, Google Web Fundamentals
* [Service Worker Cookbook](https://serviceworke.rs/), Mozilla
* [The Web App Manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) by Matt Gaunt and Paul Kinlan, Google Web Fundamentals
* [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest), Mozilla Developer Network
* [Progressive Web Apps across all frameworks](https://gist.github.com/addyosmani/0bb17794900c06dac28b2c20c70ccba0), Addy Osmani
