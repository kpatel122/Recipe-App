importScripts('./node_modules/workbox-sw/build/workbox-sw.js')

const staticAssets = [
    "./",
    "./app.js"
]

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  );


