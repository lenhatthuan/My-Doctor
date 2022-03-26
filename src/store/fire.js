import firebase from "firebase";
// import { Item } from "react-native-paper/lib/typescript/components/List/List";
class Fire {
    constructor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDbVPwRqEBmpvFCbawWPH4O2aLQN88qdP4",
                authDomain: "my-doctor-3434e.firebaseapp.com",
                projectId: "my-doctor-3434e",
                storageBucket: "my-doctor-3434e.appspot.com",
                messagingSenderId: "801718489471",
                appId: "1:801718489471:web:9ac4d8d96c358f4860ca4a",
            })
        }
    }

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();

            }
        })
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message);
        });
        
    }

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();