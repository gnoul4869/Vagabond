import {} from 'dotenv/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';

initializeApp({
    credential: cert({
        type: 'service_account',
        project_id: 'vagabond-5913f',
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }),
    storageBucket: 'vagabond-5913f.appspot.com',
});

const bucket = getStorage().bucket();

export const uploadImageToStorage = async (imageFile, fileName) => {
    return new Promise((resolve, reject) => {
        const uuid = uuidv4();
        const blob = bucket.file(`images/profile/${fileName}`);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: imageFile.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid,
                },
            },
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', async () => {
            resolve(
                `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
                    blob.name
                )}?alt=media&token=${uuid}`
            );
        });

        blobStream.end(imageFile.buffer);
    });
};
