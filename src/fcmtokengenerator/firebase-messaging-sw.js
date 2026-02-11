importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyCXq2xOTtTswEcedIMmSwzauNhNMBHLHqo',
  authDomain: 'marketplace-6cb8b.firebaseapp.com',
  projectId: 'marketplace-6cb8b',
  storageBucket: 'marketplace-6cb8b.firebasestorage.app',
  messagingSenderId: '239763128246',
  appId: '1:239763128246:web:bcf6037986534251400b17',
  measurementId: 'G-WSCMJDJ1DB',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
