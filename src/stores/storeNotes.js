import { defineStore } from 'pinia';
import { db } from '../helpers/firebase';
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { useStoreAuth } from '@/stores/storeAuth';

let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot = null;

export const useNotesStore = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      //initialize database refs
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, 'USERS', storeAuth.user.uid, 'NOTES');
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
      this.getNotes();
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) {
        //unsubscribe from any active listener
        getNotesSnapshot();
      }
    },
    async getNotes() {
      this.notesLoaded = false;
      getNotesSnapshot = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          const notes = [];
          querySnapshot.forEach((doc) => {
            const note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });
          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          console.log('error message: ', error.message);
        }
      );
    },
    async addNote(newNoteContent) {
      const currentDate = new Date().getTime();
      const dateString = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: dateString,
      });
    },
    async deleteNote(noteId) {
      await deleteDoc(doc(notesCollectionRef, noteId));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => state.notes.filter((note) => note.id === id)[0].content;
    },
    totalNotesCount: (state) => state.notes.length,
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
