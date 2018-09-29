---
title: "We ♥ Progressive Web Apps"
summary: "Progressive Web Apps bring powerful native features like push notifications, offline, and homescreen install to the web."
date: "2016-12-01"
heroImage: "./we-heart-pwa.jpg"
---
Co-authored with [Abraham Williams](https://bendyworks.com/blog/authors/abraham_williams).

This fall, we’ve had the great fortune to learn and speak about Progressive Web Apps at [conferences around the world](https://bendyworks.com/blog/the-bendyworks-conference-roadshow-early-2017). We think PWAs are pretty PWAsome! In this post we’ll tell you why, and in a future missive we’ll delve into the technical features of PWAs and show you how to build your own.

## PWhAt’s In It for Me?

The goal of PWAs is to radically improve the web app user experience.

They do that by incorporating some powerful features formerly available only to native mobile apps. Thanks to new browser technologies, web apps can now

  * [install][home-screen] an icon on your device screen,
  * [load instantly][offline-first] when you click the icon,
  * [send you notifications][push-notifications] (even when you’re not using the app), and
  * [work offline][offline-cookbook]. No more [dinosaurs][chrome-dino]!

Implemented properly, these features can create great experiences for users. PWAs can deliver fast, reliable, and engaging experiences, even while users aren't looking at your website.

To see a great collection of PWAs in the wild, go to [pwa.rocks][pwa-rocks], a site created by the [Opera Developer Relations team][opera-devs].  

## PWAsome for Business

PWAs are also good for business. They are cheap, compared with building and maintaining a suite of apps for different platforms. And they make money. According to [several studies conducted by Google][pwa-showcase], PWAs substantially increase re-engagement and conversion rates. Ecommerce giant [AliExpress][ali-express], for example, increased conversion for new users by more than 100% with its new PWA.

## Progressive Enhancement

What’s the downside, you ask? There is one temporary hitch: some of the most powerful PWA features are not yet supported in all browsers.  Chrome and Firefox support most of the technologies required for PWAs; Microsoft it working on it. Apple has not sworn allegiance to the PWA, but the company is considering support for core PWA technology. (See [Is ServiceWorker Ready?][sw-ready] for more details about browser support.)

Remember, though, that the P in PWA stands for Progressive. The features that help PWAs rise above the rest are progressive enhancements. Push notifications and offline access are there when those features are supported, but nothing breaks when they are not. In Safari and in older browsers, PWAs are still good web apps. They work just fine.

It’s time to start making PWAs! In a future post, we will help get you started.

Want us to make your PWA? [Get in touch!](/contact-form)

## Further Reading

* [Progressive Web Apps: The definitive collection of resources][pwa-resources]
* [Progressive Web Apps: A new way to deliver amazing user experiences on the web][google-pwa]
* [A Beginner’s Guide To Progressive Web Apps][beginner-guide]


[pwa-resources]: https://dev.opera.com/articles/pwa-resources/ "Progressive Web Apps: The definitive collection of resources"
[pwa-rocks]: https://pwa.rocks/ "A selection of Progressive Web Apps"
[pwa-showcase]: https://developers.google.com/web/showcase/ "Google Case Studies"
[ali-express]: https://developers.google.com/web/showcase/2016/aliexpress "AliExpress Case Study"
[google-pwa]: https://developers.google.com/web/progressive-web-apps/ "Progressive Web Apps: A new way to deliver amazing user experiences on the web"
[beginner-guide]: https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/ "A Beginner’s Guide To Progressive Web Apps"
[home-screen]: https://developers.google.com/web/shows/google-io/2015/installable "Google: Installable Web Apps"
[offline-first]: https://developers.google.com/web/shows/pwa-devsummit/amsterdam-2016/instant-loading-offline-first-progressive-web-app-summit-2016 "Instant-loading Offline-first (Progressive Web App Summit 2016)"
[push-notifications]: https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/ "Google Codelab: Adding Push Notifications to a Web App"
[offline-cookbook]: https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/ "The Offline Cookbook by Jake Archibald"
[sw-ready]: https://jakearchibald.github.io/isserviceworkerready/ "Is ServiceWorker Ready"
[opera-devs]: https://dev.opera.com/ "Dev.Opera"
[chrome-dino]: http://thenextweb.com/google/2014/09/25/googles-latest-chrome-build-hidden-game-can-play-offline/ "Google’s latest Chrome build has a hidden dinosaur game that you can only play offline"
