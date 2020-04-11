/**
 * @author Mien
 */
'use strict';

const CACHE_NAME = 'what-pwa-can-do-0.0.1';
const DATA_CACHE = 'what-pwa-can-do-data-0.0.1';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/manifest.json',
    '/service-worker.js',
    '/style.css',
    '/lib/base.png',
    '/lib/iconfont/iconfont.css',
    '/lib/iconfont/iconfont.eot',
    '/lib/iconfont/iconfont.js',
    '/lib/iconfont/iconfont.json',
    '/lib/iconfont/iconfont.svg',
    '/lib/iconfont/iconfont.ttf',
    '/lib/iconfont/iconfont.woff',
    '/lib/iconfont/iconfont.woff2',
    '/lib/icons/icon-128x128.png',
    '/lib/icons/icon-144x144.png',
    '/lib/icons/icon-152x152.png',
    '/lib/icons/icon-192x192.png',
    '/lib/icons/icon-256x256.png',
    '/lib/icons/icon-32x32.png',
    '/lib/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    // console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE)
                .then(() => self.skipWaiting());
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    // console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // console.log('[ServiceWorker] Fetch', event, event.request.url);
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
