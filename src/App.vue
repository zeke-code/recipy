<script lang="ts">
import { defineComponent } from 'vue';
import NavbarDesktop from './components/NavbarDesktop.vue';
import NavbarMobile from './components/NavbarMobile.vue';

export default defineComponent({
  name: 'App',
  components: { NavbarDesktop, NavbarMobile },
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
  <NavbarDesktop class="d-none d-lg-block" />
  <NavbarMobile class="d-block d-lg-none" />
</template>