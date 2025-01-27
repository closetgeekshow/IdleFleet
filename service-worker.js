importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

const {registerRoute} = workbox.routing;
const {strategies} = workbox;

// Add sync handler at the top level
self.addEventListener('sync', event => {
  if (event.tag === 'saveGame') {
    event.waitUntil(
      // This will handle offline saves
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SYNC_SAVE',
            timestamp: new Date().getTime()
          });
        });
      })
    );
  }
});

registerRoute(
  	/\/$/,
	new strategies.NetworkFirst()
);

registerRoute(
  	/\.js$/,
	new strategies.NetworkFirst()
);

registerRoute(
  	/\.json$/,
	new strategies.NetworkFirst()
);

registerRoute(
  	/\.css$/,
	new strategies.NetworkFirst()
);

registerRoute(
  	/\.png$/,
	new strategies.NetworkFirst()
);

registerRoute(
  	new RegExp('https://cdn\\.jsdelivr\\.net/npm/alpinejs@3\\.\\x\\.x/dist/cdn\\.min\\.js'),
	new strategies.NetworkFirst()
);

registerRoute(
  	new RegExp('^https://cdn\\.skypack\\.dev/'),
	new strategies.NetworkFirst()
);
