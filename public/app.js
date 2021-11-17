if ('serviceWorker' in navigator) { /* register service worker */ navigator.serviceWorker.register('/service-worker.js'); console.log('wrok'); }
else{
    console.log('no work');
}
