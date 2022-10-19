<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light">
          <small>{{ noteLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">
        Edit
      </RouterLink>
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item">
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id" />
  </div>
</template>

<script setup>
  import { computed, reactive } from 'vue';
  import ModalDeleteNote from './ModalDeleteNote.vue';
  import { useNotesStore } from '@/stores/storeNotes';

  const storeNotes = useNotesStore();

  const props = defineProps({
    note: {
      type: Object,
      required: true,
    },
  });

  const noteLength = computed(() => {
    const noteLength = props.note.content.length;
    const description = noteLength > 1 ? 'characters' : 'character';

    return `${noteLength} ${description}`;
  });

  //Modals
  const modals = reactive({
    deleteNote: false,
  });
</script>
