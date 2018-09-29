---
title: "PRPL on Rails Part 3: Service Workers"
summary: "Improve your site's performance with service worker caching"
date: "2018-05-01"
heroImage: "./prpl-on-rails-3.jpg"
---
Co-authored with [Abraham Williams](https://bendyworks.com/blog/authors/abraham_williams).

This is the third of a three-part series on speeding up your Rails application using techniques from the [PRPL pattern][prpl]. Part 1 covers [code splitting](https://bendyworks.com/blog/prpl-on-rails-part-1-code-splitting), part 2 shows you how to [optimize rendering](https://bendyworks.com/blog/prpl-on-rails-part-2-optimize-rendering), and this part demonstrates pre-caching and runtime caching with service workers.

# Performance Matters

Service workers can vastly improve your app's performance and your users' experience. By caching and serving assets with a service worker, you can make your app load almost instantly and keep working offline. You users never have to see a downasaur again.

# What's a Service Worker?

A service worker is a script that runs in the browser and can act like a proxy server between your app and the network, as well as run tasks in the background. Your client-side code and service worker communicate with each other only indirectly. Service workers can do lots of useful things: they can cache your app's resources, they can intercept network requests and respond from the cache or the network, depending on your caching strategy and network conditions, and they can handle push notifications.

# Workbox

Google provides a library called [Workbox](https://developers.google.com/web/tools/workbox/) that makes adding a service worker to your application fairly easy. Workbox is a set of modules that help you generate service workers based on a set of rules. Rules can match different types of content such as images, JSON/APIs, hashed JS/CSS files, etc. If you want to cache the 20 most recently viewed user avatars or expire content that's older than two weeks, it's as simple as changing the caching config.

# Exercise Time

As you may remember from our previous posts, we created a demo app and some exercises as part of a [RailsConf](https://railsconf.com/) workshop that let you see these concepts in action. To download the sample app go to [bw.cm/prpl](http://bw.cm/prpl) and click on "Setup." Then find the "Exercises" page and click on "Part 3: Service Workers." The exercise shows you how to register a service worker, pre-cache routes, and lazy-load data.

Enjoy! And don't hesitate to share your thoughts or questions with us.

# Resources

* [Is Service Worker Ready?, Jake Archibald](https://jakearchibald.github.io/isserviceworkerready/)
* [The PRPL Pattern, Addy Osmani, Google Web Fundamentals][prpl]
* [Service Worker Registration, Jeff Posnick, Google Web Fundamentals](https://developers.google.com/web/fundamentals/primers/service-workers/registration)
* [Service Workers: an Introduction, Matt Gaunt, Google Web Fundamentals][sw]

Photo by Mike Wilson on [Unsplash](https://unsplash.com/)

[prpl]: https://developers.google.com/web/fundamentals/performance/prpl-pattern/
[sw]: https://developers.google.com/web/fundamentals/primers/service-workers/
