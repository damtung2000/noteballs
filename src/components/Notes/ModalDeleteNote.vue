<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close" />
      </header>
      <section class="modal-card-body">
        Are you sure you wanna delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button @click="storeNotes.deleteNote(noteId)" class="button is-danger">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
  import { onClickOutside } from '@vueuse/core';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useNotesStore } from '@/stores/storeNotes';

  const storeNotes = useNotesStore();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    noteId: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  function closeModal() {
    emit('update:modelValue', false);
  }

  //Close on outside click
  const modalCardRef = ref(null);
  onClickOutside(modalCardRef, closeModal);

  //Keyboard Control
  const handleKeyboard = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  onMounted(() => {
    document.addEventListener('keyup', handleKeyboard);
  });

  onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard);
  });
</script>
