import { defineStore } from 'pinia';

export const useNotesStore = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        {
          id: 'id1',
          content:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus omnis explicabo ad deserunt accusamus libero voluptas animi optio esse nemo dignissimos, ipsam amet, asperiores quod iusto. Eos quos ratione nemo.',
        },
        {
          id: 'id2',
          content: 'Short Note',
        },
      ],
    };
  },
  actions: {
    addNote(newNoteContent) {
      const currentDate = new Date().getTime();
      const id = currentDate.toString();

      const note = {
        id,
        content: newNoteContent,
      };

      this.notes.unshift(note);
    },
    deleteNote(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    },
    updateNote(id, content) {
      const index = this.notes.findIndex((note) => note.id === id);
      this.notes[index].content = content;
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
