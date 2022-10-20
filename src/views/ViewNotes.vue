<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      placeholder="Add a new note"
      ref="addEditNoteRef">
      <template #buttons>
        <button
          @click="handleAddNote"
          :disabled="!newNote"
          class="button is-link has-background-success">
          Add New Note
        </button>
      </template>
    </AddEditNote>
    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100" />
    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
      <div
        v-if="!storeNotes.notes.length"
        class="is-size-5 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Note from '../components/Notes/NoteCard.vue';
  import { useNotesStore } from '@/stores/storeNotes';
  import { useWatchCharacters } from '@/use/useWatchCharacters';
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  const storeNotes = useNotesStore();

  const newNote = ref('');
  const addEditNoteRef = ref(null);

  function handleAddNote() {
    storeNotes.addNote(newNote.value);
    newNote.value = '';
    addEditNoteRef.value.focusTextArea();
  }

  //Watch Characters
  useWatchCharacters(newNote);
</script>
