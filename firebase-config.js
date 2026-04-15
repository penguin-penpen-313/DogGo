// ================================================================
// firebase-config.js — Firebase設定
// Firebaseコンソール (https://console.firebase.google.com/) から
// プロジェクト設定 > マイアプリ > CDN の設定をコピーして貼り付けてください
// ================================================================
const firebaseConfig = {
  apiKey: "AIzaSyC5te-SkpvA3OKll28WaIoHkwod6ES-Kco",
  authDomain: "drawingquiz-7dd0e.firebaseapp.com",
  projectId: "drawingquiz-7dd0e",
  storageBucket: "drawingquiz-7dd0e.firebasestorage.app",
  messagingSenderId: "189142269194",
  appId: "1:189142269194:web:225dfa75559c6a35428ef3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
