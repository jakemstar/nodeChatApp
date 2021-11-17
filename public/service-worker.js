/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app.js","5fd654a151997f373f2a9d9da36647b4"],["browserconfig.xml","7e3df0bc5688dbe00f5da84ac44fb094"],["chat.html","02d283e84dce11a42bf8fc6bd958585d"],["emotes/1rock.png","b1099f6807f8163045e7805869b2c27f"],["emotes/4real.png","6f1c9a96f99448bcb9cf6b006c1ba5a1"],["emotes/BUP.png","9b51a789b729c51e8275cde52d0d9e9d"],["emotes/BloodOfTheUnforgiven.png","145f27a5aa2dc5bfc4585ec1e0f392f0"],["emotes/CharmedChamp.png","3c620220d4338bbeed6cd47c89b53e16"],["emotes/ColoraptorApproved.png","7669b27ef310b3ce0d96d838f3aa6adc"],["emotes/ColoraptorDisapproved.png","42d86353b94cfbec7669ac9ce5d7d511"],["emotes/KirbyNoApprove.png","00c5b97b7fed4c7623cce5f319abae15"],["emotes/KirbySaysTimeToDie.png","ada2e57f7ec773be5a884de64851ea37"],["emotes/KpopAnger.png","48b1e26fb15369b13dde0287f6e49bb2"],["emotes/SamuraiAnger.png","294d7b064ff516d8518510983e4d8d16"],["emotes/SamuraiApproved.png","f5f1a791584ba4e6841a446328a5aa23"],["emotes/bananaeat.png","a70e8b7f35ef1ddd900f3ff1df733d1d"],["emotes/burrito.gif","24274f16b6f24244524e2ca5f09fffea"],["emotes/crunk.png","fff37a243d31e2b380002418000b6792"],["emotes/ducksaynu.png","2411a3edd5f1596b4afd9991212a3145"],["emotes/flatchamp.png","27bc3648751648babb2d781804ad8f54"],["emotes/flatvery.png","2fef54b4121df5d6ae7842f079dc79a7"],["emotes/gayvery.png","df1e99b3ed26f11c889a4925940ff748"],["emotes/glasses.png","343a7ad7f466a04c289d16c17bc52616"],["emotes/haha.png","f890a254c595ccd5e8a19e0765888926"],["emotes/hahahafuckyou.png","37b155e598d09da5a7326ee5e79e648e"],["emotes/hungry.png","72f7fcf5e50899d470b76637faadb852"],["emotes/jacob.png","9c51a3419f1b9934545e51930d4270eb"],["emotes/joyd.png","0581d8f9a41a1ae52ece32ee76e92ed5"],["emotes/kiwi.png","f75eed5903e3993dec11b74139b9bdac"],["emotes/meet.png","804f55f87b83dbd5959d042c40f0fb46"],["emotes/princecharming.png","51301482e3f8de111d29850d39615385"],["emotes/rasim.png","8c22c4bc052cb013950460398183ddc8"],["emotes/slep.png","4379dd96ab41c2ef7e422f64ab320a71"],["emotes/slurp.png","c964eaf6aeba3ea79a82ef75a9918510"],["emotes/superior.png","988ef445053fb3f572e5efd677baa517"],["emotes/suplilbitch.png","6c4b0b83490f42e3c313f1136b93e234"],["icons/android-chrome-192x192.png","94881e1c17d8ee09fb7e9d3b64929df6"],["icons/android-chrome-512x512.png","2035730874e2ac9cb5aad8ebb6f0c011"],["icons/apple-touch-icon.png","7b5dd9112deac4cc530a411a68f95ed4"],["icons/favicon-16x16.png","ee30b337137e80942f74e140fb7be160"],["icons/favicon-32x32.png","e5afd99c1cb5ac18a6ffb55daaecbd82"],["icons/favicon.ico","58873e2c37ef503e58e975944bc01063"],["icons/mstile-150x150.png","6a69410e127331c22d88999680360384"],["icons/safari-pinned-tab.svg","c50c034ef45945f064cf665215235239"],["index.html","5e2707f76659e94ae00c8a6a69435715"],["index.js","dc8ca2256dea6ccff84c9e3924d0c00a"],["manifest.json","e6465aa7f058af2d13eb75f98907c3fe"],["style.css","6a67acc5db4808e600f6c4b5509e93b4"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







