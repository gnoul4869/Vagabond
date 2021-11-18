import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: 'AIzaSyBkBqGYE3SjQqiRNV9AXW27fTa85S56jEs',
    authDomain: 'vagabond-5913f.firebaseapp.com',
    projectId: 'vagabond-5913f',
    storageBucket: 'vagabond-5913f.appspot.com',
    messagingSenderId: '185020016476',
    appId: '1:185020016476:web:5603348fdb2bb3d48a4399',
    measurementId: 'G-ZHZFQ6MEDN',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
