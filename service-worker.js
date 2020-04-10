/**
 * @author Mien
 */
'use strict';

const CACHE_NAME = 'what-pwa-can-do-0.0.1';

const FILES_TO_CACHE = [
    '/index.html',
    '/index.js',
    '/manifest.json',
    '/style.css',
    '/lib/base.png',
    '/lib/iconfont/iconfont.css',
    '/lib/iconfont/iconfont.eot',
    '/lib/iconfont/iconfont.js',
    '/lib/iconfont/iconfont.json',
    '/lib/iconfont/iconfont.svg',
    '/lib/iconfont/iconfont.ttf',
    '/lib/iconfont/iconfont.woff',
    '/lib/iconfont/iconfont.woff2'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );
});
