// Import Firebase and Firebase Messaging SDK
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM2jgNXk2VGPTSq3UP_JA4AvtbeVFli6s",
  authDomain: "one-line-1.firebaseapp.com",
  projectId: "one-line-1",
  storageBucket: "one-line-1.appspot.com",
  messagingSenderId: "232720669465",
  appId: "1:232720669465:web:c5777e41290be2d6160388",
  measurementId: "G-TLV1N26J2N"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  // Customize the notification that will be shown in the background
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || 'default_icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
