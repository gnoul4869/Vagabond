import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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
getAnalytics(app);

const storage = getStorage(app);

export const uploadImageToStorage = async (imageFile) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',

            (snapshot) => {
                // TODO: To be implemented
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                //     default:
                //     // Do nothing
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};
