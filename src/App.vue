<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: { Navbar },
  data() {
    return {

    }
  },
  methods: {
    }
  }
)
</script>

<template>
  <Navbar></Navbar>
</template>