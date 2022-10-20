<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light">
          <small class="column">{{ date }}</small>
          <small class="column has-text-right">{{ noteLength }}</small>
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
  import { formatDate } from '@/helpers/date';

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

  const date = computed(() => formatDate(props.note.date));

  //Modals
  const modals = reactive({
    deleteNote: false,
  });
</script>
