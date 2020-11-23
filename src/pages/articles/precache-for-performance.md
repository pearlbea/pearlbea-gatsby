---
title: "Pre-cache for Performance"
date: "2018-08-30"
coauthor: ""
summary: "Improve your page load time by pre-caching resources during service worker installation."
heroImage: "./precache-for-performance.jpg"
---
Republished with permission from
[Bendyworks](https://bendyworks.com).

If you're on or around tech Twitter, you've already heard: [#perfmatters](https://twitter.com/hashtag/perfmatters?src=hash). In this instance, the word on Twitter really is true. Web performance does matter. A number of [recent studies][perfmatters] have demonstrated that page load times have a real effect on user retention and conversion. If you want happy users who stick around, you have to be fast.

There are lots of things you can do to improve your site's performance. For example, you can decrease the size of your code using minification, tree shaking, and code splitting. You can optimize images and fonts. You can avoid deeply nested HTML and complex style calculations. You can use a service worker to cache resources on your user's device.

Today we'll look at a part of the final item on this non-exhaustive list: pre-caching resources, including css, scripts, fonts, and images, on your user's device during a service worker's install event. (Keep an eye out for future posts that will cover other ways to improve performance.)

> **Is your site fast enough?** The first step to getting faster is to measure your site's current speed and identify bottlenecks. For performance measurement guidelines and tools, see [Measure Performance with the RAIL Model][rail].

## Benefits of Caching 

Pre-caching refers to caching files during the service worker installation process, before the service worker has control of a page. This is distinct from runtime caching, which saves files to the cache when they are returned from a network request, after the service worker has been installed and activated.

Both types of caching improve your site's load time by reducing the number of network requests and providing resilience to network interruptions. If a resource does not need to be up-to-the-second fresh or if the network is unavailable, your site can grab the resource from the cache. Your user gets fast access to your content, even if she is traveling through a subway tunnel or on a flaky network.

> **HTTP Caching vs. Service Worker Caching.**  If you're already using standard HTTP caching, should you bother with service worker caching? Especially if you don't care about providing users with offline access, do you need a service worker? 
> [Properly used][cache-best] cache headers can be hugely beneficial to your site's performance, and not all browsers support service workers (ahem, IE). But when they are supported, service workers give developers much more control of caching. We can determine at the level of asset type or request url whether to respond from the cache or the network.
> In addition, responses from the service worker cache can be even [faster][sw-perf] than responses from the browser cache.

Two pre-caching patterns are commonly used to improve loading speed:

## 1. Pre-cache Critical UI Resources

 First, by pre-caching your site's critical static assets (or [app shell](https://developers.google.com/web/fundamentals/architecture/app-shell), if your site is a single page application), you can give your users the experience of an almost instant page load on subsequent visits to your site. As a bonus, this also makes your UI available offline, perhaps displaying a lovely, brand-consistent "You're Offline" message.

Your critical resources are the HTML, CSS, JavaScript, font, and image files necessary to render the above-the-fold portion your main page. Think static assets that change infrequently: your header and footer HTML, logo, brand style, etc. 

Cache the resources that you have identified as critical during the service worker's install event. Here's what that might look like: 

~~~javascript 
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      return cache.addAll([
        '/css/main.css', '/js/main.js', '/img/logo.png'
      ]);
    })
  );
});
~~~

The `event.waitUntil` method waits for the call to `cache.addAll` to resolve. The `addAll` method is part of the [Cache API][cache-api] and it will resolve once the files are stored in the cache. If any of those files doesn't get successfully fetched and cached, the promise does not resolve and the service worker installation fails. This protects against caching files that are out of sync with each other.

The [Workbox][workbox] library makes pre-caching even easier. You can use the Workbox CLI to generate a service worker and determine which files to pre-cache. There is also Workbox webpack plugin that will generate a service worker and automatically pre-cache the assets it finds in your webpack compilation.

~~~javascript
// webpack.config.js
const { InjectManifest } = require('workbox-webpack-plugin');
module.exports = {
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/service-worker.js'
    })
  ]
}
~~~

## 2. Precache Other Routes

You can also use the service-worker install event to cache less-critical but still important resources, such as assets for the routes your user is most likely to go to or below-the-fold content. If the install succeeds, these secondary resources will be available the instant they are needed. 

How many resources for how many routes? How much is too much to pre-cache? Jeff Posnick of the Workbox team offers some [useful advice](https://stackoverflow.com/questions/51595558/recommended-precache-payload-size) on Stack Overflow. Briefly, it depends on your users (e.g., if they are they on low-powered devices, cache less) and your resources (e.g., if they are seldom viewed, lazy load instead).

In addition, storage space is not infinite. The service worker cache is [roomy](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa#how_much_can_i_store), but it can fill up. When the browser runs out of storage space, it will dispose of the entire service worker cache. To help prevent this from happening, clean up old caches during the service worker's activate event or automate cleanup with Workbox.

~~~javascript
self.addEventListener('activate', event => {
  var cacheWhitelist = 'cache-v2';
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if(cacheName !== cacheWhitelist) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
~~~

 With the fairly small effort of pre-caching resources (especially small if you use Workbox), you banish the downasaur and get instant loading for your users whenever they return to your site. Pre-caching is just one of many steps you can take to improve your site's performance. Watch this space for more!

## Resources
* [Caching Best Practices and Max-Age Gotchas][cache-best], Jake Archibald
* [Front-End Performance Checklist 2018][perf-checklist], Vitaly Friedman, Smashing Magazine
* [Instant Loading Web Apps With An Application Shell Architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73), Addy Osmani and Matt Gaunt, Medium
* [Offline Cookbook][offline-cookbook] Jake Archibald
* [Measure Performance with the RAIL Model][rail], Meggin Kearney et al., Google Web Fundamentals
* [Measuring the Real-world Performance Impact of Service Workers][sw-perf], Philip Walton, Google
* [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker), MDN web docs
* [A Tale of Four Caches][four], Yoav Weiss
* [Why Performance Matters][perfmatters], Jeremy Wagner, Google Web Fundamentals
* [Workbox][workbox]

Photo by Matthew Brodeur on [Unsplash](https://unsplash.com/)

[cache-api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[cache-best]: https://jakearchibald.com/2016/caching-best-practices/
[estimating]: https://developers.google.com/web/updates/2017/08/estimating-available-storage-space
[four]: https://calendar.perfplanet.com/2016/a-tale-of-four-caches/
[offline-cookbook]: https://jakearchibald.com/2014/offline-cookbook/
[perf-checklist]: https://www.smashingmagazine.com/2018/01/front-end-performance-checklist-2018-pdf-pages/
[perfmatters]: https://developers.google.com/web/fundamentals/performance/why-performance-matters/
[rail]: https://developers.google.com/web/fundamentals/performance/rail
[sw-perf]: https://developers.google.com/web/showcase/2016/service-worker-perf
[workbox]: https://developers.google.com/web/tools/workbox/