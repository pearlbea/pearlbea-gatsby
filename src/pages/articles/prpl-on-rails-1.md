---
title: "PRPL on Rails Part 1: Code Splitting"
summary: "Split your Rails JavaScript with Webpack to make your site load faster"
date: "2018-04-24"
heroImage: "./prpl-on-rails-1.jpg"
---
Co-authored with [Abraham Williams](https://bendyworks.com/blog/authors/abraham_williams).

This is the first of a three-part series on speeding up your Rails application load time using techniques from the [PRPL pattern][prpl].

# Performance Matters

According to a [Google study][mobile-speed], the average website takes 19 seconds to load on a mobile phone over 3G, and more than half of mobile website visits are abandoned if the site doesn't load within three seconds.

No one wants to wait for your website to load.

It's easy for you and me, with our nice development machines and good connections, to believe our websites are performing well for our users. But our users are increasingly accessing the web from mobile devices. More than half of [page views worldwide][statcounter] are on mobile. And on mobile those page views are mostly as slow as molasses.

# Paint it PRPL

Don't despair: we can make our sites faster and our users happier. The [PRPL Pattern][prpl] points the way. The PRPL pattern is an architectural pattern, created by Google's [Polymer](https://www.polymer-project.org/2.0/toolbox/prpl) team, that consolidates many of the best practices for optimizing web performance. PRPL stands for Push, Render, Pre-cache, and Lazy-load.

> * Push critical resources for the initial URL route.
> * Render initial route.
> * Pre-cache remaining routes.
> * Lazy-load and create remaining routes on demand.
>
> Addy Osmani, [The PRPL Pattern][prpl]

In "PRPL on Rails Part 2" we will talk about rendering and in "Part 3" we will cover pre-caching and lazy-loading. This part will focus on Push, on getting our critical resources for our initial route to the browser as quickly as possible.

# TLDR; Ship Less Code

The direction to "push critical resources for the initial URL route" needs some unpacking. What are "critical resources" and what does it mean to "push them for the initial URL route"?

Your critical resources are the fewest possible resources that you need to display the ["above-the-fold"](https://www.linkedin.com/pulse/6-ways-make-your-websites-above-fold-invincible-eliot-cunningham/) part your initial page. This includes the CSS, JavaScript, images, and whatever else you need to render the top part of the first page. And that's it. Nothing else. By keeping your critical resources as small as possible, you minimize the amount of code the browser needs to download and parse before it renders the page, thus reducing the time your user has to stare at a blank screen.

Once you identify your critical resources, you push them to the browser, ideally using [HTTP/2 Server Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/). HTTP/2 Server Push allows a site to request assets (e.g., CSS and JavaScript files) via header links before the browser downloads and parses the HTML page that includes those assets. To use HTTP/2 with your Rails server, you'll need to do some extra work, as by Eileen Uchitelle explains in a [blog post](http://eileencodes.com/posts/http2-early-hints/). But even without HTTP/2, you can benefit by shipping less code.

# Code Splitting

If you are going ship only your critical resources on initial load, you can't bundle all your code into a single package. Bundling everything together reduces roundtrips to the server, but means you will need to download and parse large files before users can interact with your app. To make your interactive quicker, you can [split your code](https://webpack.js.org/guides/code-splitting/) by route and load only what is needed for a particular page.

# Webpack and Webpacker

Webpack and Webpacker are tools that assist with code splitting (among other things). Webpack is a popular build tool that bundles, optimizes, and minifies front-end resources so that they can be downloaded fast. Webpacker is a Rails wrapper that makes it easy to use webpack in Rails.

In your Rails app, you can create different "packs" (called "bundles" in the world of Webpack) by adding files to the `app/javascript/packs` directory. In the example below, your app would have three packs: an "application" pack that contains code needed everywhere and "users" and "stories" packs that contain code needed by the "users" and "stories" pages respectively.

    app/javascript:
      |-- packs:
            |-- application.js
            |-- users.js
            |-- stories.js

You can load the packs on the appropriate pages like so:

    <%= javascript_pack_tag 'application' %>
    <%= stylesheet_pack_tag 'application' %>

# Exercise Time

Time to see this all in action. We have prepared a sample app and an exercise that will demonstrate how you can improve load time by splitting code by route, so that currently unneeded code can be lazy loaded later. (This is part of a workshop that we offered at [RailsConf](https://railsconf.com/) last week.) To download the sample app go [bw.cm/prpl](http://bw.cm/prpl) and click on "Setup." Then find the "Exercises" page and click on "Part 1: Code Splitting." In the exercise, you'll first run a [Lighthouse](https://developers.google.com/web/tools/lighthouse/) audit in Chrome's developer tools, then split some code, then re-run the audit to see the difference it makes.

Enjoy! And don't hesitate to get in touch with your thoughts or questions.

# Resources

* [Can You Afford It?: Real-world Web Performance Budgets, by Alex Russell](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
* [The PRPL Pattern][prpl]
* [PRPL with Custom Elements and Firebase](https://codelabs.developers.google.com/codelabs/prpl-ce-firebase/)
* [Primer on Web Performance, by Ilya Grigorik](https://hpbn.co/primer-on-web-performance/)
* [Web Performance Optimization with webpack](https://developers.google.com/web/fundamentals/performance/webpack/)

Photo by Paper Beard on [Unsplash](https://unsplash.com/)

[statcounter]: http://gs.statcounter.com/platform-market-share/desktop-mobile/worldwide/
[mobile-speed]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/
[prpl]: https://developers.google.com/web/fundamentals/performance/prpl-pattern/
