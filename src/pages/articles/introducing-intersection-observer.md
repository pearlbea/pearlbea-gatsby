---
title: "Introducing Intersection Observer"
summary: "The IntersectionObserver API is a relatively new web API that allows you to observe when a DOM element enters or leaves a viewport"
date: "2018-01-04"
heroImage: "./introducing-intersection-observer.jpg"
---
Republished with permission from
[Bendyworks](https://bendyworks.com).

Have you written JavaScript to enable infinite scrolling or to lazy-load images that appear below the fold?

If you're like me, you did this by listening for scroll events and requesting an element's `scrollTop` property or calling `getBoundingClientRect()` on an element. You forced the browser to stop everything and repeatedly [recalculate the layout](https://gist.github.com/paulirish/5d52fb081b3570c81e3a). You fought jank. You suffered. Your users suffered. It was a dark time.

Guess what? The dark times are over! I have learned about the glorious `IntersectionObserver` and I want to share the good news with you.

The [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is a relatively new web API that provides easy-to-use, efficient tools for detecting changes to a DOM element's visibility within the browser viewport or within another element. No more jank. No more reflow. No more suffering. None.

## How it works

When you create an `IntersectionObserver`, you pass it a callback that is triggered when the visibility of a target element changes.

~~~javascript
let observer = new IntersectionObserver(callback, options);
let target = document.querySelector("#target");
observer.observe(target);
~~~

An optional `options` object allows you to fine-tune how the callback gets triggered. You can customize three available options: `root`, `rootMargin`, and `threshold`.

~~~javascript
let options = {
  root: document.querySelector(".container"), // takes a DOM element
  rootMargin: "10px 20px", // takes a string indicating margins
  threshold:  0.75 // takes a number or an array of numbers between 0 and 1
};
~~~

**root:**  By default, the callback runs whenever the target element's visibility changes with respect to the browser's viewport. However, if the viewport you care about is within the DOM--if it's, say, a container div that holds a slideshow--you can specify that element here. 

**rootMargin:**  The default `rootMargin` is 0. You can expand or contract the bounding box of the `root` viewport by specifying margins. For example, if you set `rootMargin` to `20px`, your callback will be triggered when your target comes within 20px of the viewport's edge. 

**threshold:**  The default value for the `threshold` option is `0`. This means that as soon as any bit of the target is visible, even just a pixel, the callback is triggered. You might want to wait until 50% of the target is visible before your callback runs. No problem: set the `threshold` to `0.5`. Want to wait until the target is completely visible? Set the `threshold` to `1`. Alternatively, if you would like your callback to fire every time visibility changes by 25%, you could set it to `[.25, .5, .75, 1]`. 

When your callback is triggered, according to the options you have set, it receives two parameters: `entries` and `observer`. The `observer` parameter is the `IntersectionObserver` that launched the callback. `Entries` contains a list of objects created when a threshold is crossed. Each entry contains interesting information including an `isIntersecting` boolean that indicates whether your target is visible, again according to your options, and an `intersectionRatio` value that returns the percent visibility of the target. You can use this handy info to direct the action of your callback. 

## Browser support

This brief, exciting tour of the Intersection Observer API no doubt has you asking: "Can I use this today?!" Yes! You can! With a couple caveats. `IntersectionObserver` is supported in recent versions of Chrome, Edge, and Firefox. It's under development for Safari. It's not supported by IE. But never fear: There is a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) that will extend support to Safari and IE.

## Resources

There is more to learn about the Intersection Observer API. I haven't even mentioned `unobserve`! Here are some references to assist your learning.  

**Codepen**

A few simple examples on Codepen that illustrate what is covered above:

- [Simple IntersectionObserver](https://codepen.io/pearlbea/pen/PEKjpX)
- [IntersectionObserver with slides](https://codepen.io/pearlbea/pen/JMyNJd)
- [IntersectionObserver with drag and drop](https://codepen.io/pearlbea/pen/PEKjQL)

**Articles**

- [An event for CSS position:sticky](https://developers.google.com/web/updates/2017/09/sticky-headers) by Eric Bidelman 
- [The Intersection Observer API explained](https://pawelgrzybek.com/the-intersection-observer-api-explained/) by Pawel Grzybek
- [IntersectionObserver’s Coming into View](https://developers.google.com/web/updates/2016/04/intersectionobserver) by Surma
- [Lazy Loading Images Using Intersection Observer](https://deanhume.com/home/blogpost/lazy-loading-images-using-intersection-observer/10163) by Dean Hume
- [Observing Intersection Observers](https://davidwalsh.name/intersection-observers) by Neil Roberts and SitePen
- [Using the Intersection Observer API to Trigger Animations and Transitions](https://alligator.io/js/intersection-observer/) by Alligator.io

**References**

- [MDN on the IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [Can I Use IntersectionObserver?](https://caniuse.com/#feat=intersectionobserver)