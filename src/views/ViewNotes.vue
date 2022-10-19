<template>
  <div class="notes">
    <!-- <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            ref="newNoteRef"
            placeholder="Add a new note" />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="handleAddNote"
            :disabled="!newNote"
            class="button is-link has-background-success">
            Add New Note
          </button>
        </div>
      </div>
    </div> -->
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
    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
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
