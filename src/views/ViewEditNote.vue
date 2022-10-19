<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      label="Edit Note"
      placeholder="Edit note">
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-2">
          Cancel
        </button>
        <button
          @click="handleSaveClick"
          class="button is-link has-background-link"
          :disabled="!noteContent">
          SaveNote
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useNotesStore } from '@/stores/storeNotes';
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const storeNotes = useNotesStore();

  const noteContent = ref('');
  noteContent.value = storeNotes.getNoteContent(route.params.id);

  function handleSaveClick() {
    storeNotes.updateNote(route.params.id, noteContent.value);
    router.push('/');
  }
</script>
