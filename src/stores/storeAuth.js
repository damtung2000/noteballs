import { defineStore } from 'pinia';
import { auth } from '../helpers/firebase';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNotesStore } from '@/stores/storeNotes';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      const storeNotes = useNotesStore();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //Signed In
          this.user.uid = user.uid;
          this.user.email = user.email;
          this.router.push('/');

          storeNotes.init();
        } else {
          //Signed Out
          this.user = {};
          this.router.replace('/auth');
          storeNotes.clearNotes();
          console.log('User logged out: ', user.email);
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Registered and logged in: ', user.email);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Logged in: ', user.email);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log('Logout successful');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
