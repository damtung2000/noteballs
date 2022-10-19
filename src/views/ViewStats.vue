<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <th>Stat</th>
        <th>Value</th>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNoteBalls"
      v-autofocus
      class="input"
      type="text"
      placeholder="Do you like this app?" />
  </div>
</template>

<script setup>
  import { useNotesStore } from '@/stores/storeNotes';
  import { vAutofocus } from '@/directives/vAutofocus';
  import { useWatchCharacters } from '@/use/useWatchCharacters';
  import { ref } from 'vue';

  const storeNotes = useNotesStore();

  const loveNoteBalls = ref('');
  //Watch

  useWatchCharacters(loveNoteBalls, 50);
</script>
