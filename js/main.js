if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((resp) => console.log("Service Worker correctly registered ! ", resp))
    .catch((error) => console.log("Error with Service Worker registration ! ",error))
}