import admin from 'firebase-admin'
import 'dotenv/config'

const privateKey64 = process.env.ENCODE_PRIVATE_KEY
const privateKey = Buffer.from(privateKey64, 'base64').toString('ascii');

const firestoreConfig = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: privateKey.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
}

admin.initializeApp({
  credential: admin.credential.cert(firestoreConfig)
});

const db = admin.firestore();

export { db };

//Monstros