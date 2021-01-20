<template>
  <div class="home">
    <p>Records: {{ recordsText }}</p>
    <p><button @click="clearRecords">清除快取</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  computed: {
    records(): Array<string> {
      return this.$store.state.records;
    },
    recordsText(): string {
      return JSON.stringify(this.records);
    },
  },
  created() {
    this.$store.dispatch('getRecords');
  },
  methods: {
    clearRecords() {
      this.$store.dispatch('clearRecords');
    },
  },
});
</script>
