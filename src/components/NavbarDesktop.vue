<template>
  <nav class="navbar navbar-expand-lg align-items-center">
    <div class="container-fluid">
      <div class="col-lg-3">
        <a class="navbar-brand" href="/">
            <img :src="recipyLogo" alt="Recipy Logo">
        </a>
      </div>
      <div class="col-lg-6 ms-5">
        <form class="d-flex" role="search">
          <input class="form-control" type="search" placeholder="Search recipes here" aria-label="Search">
        </form>
      </div>
    <div class="col-lg-2">
      <div class="dropdown" v-bind:class=" { 'show': showDropdown }">
        <button class="btn dropdown-toggle" type="button" @click="toggleDropdown" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" :aria-expanded="showDropdown">
          <img :src="userIcon" id="userIcon-svg">
          supercoolusername
        </button>
        <div class="dropdown-menu" v-bind:class=" { 'show': showDropdown }">
          <a class="dropdown-item" href="/">Profile</a>
          <a class="dropdown-item" href="/">Logout</a>
        </div>
      </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import recipyLogo from '@/assets/images/recipy_logo.png'
import userIcon from '@/assets/svg/user_icon.svg'

export default defineComponent({
  data() {
    return {
      showDropdown: false,
      recipyLogo,
      userIcon
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!this.$el.contains(target) && this.showDropdown) {
        this.closeDropdown();
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
});
</script>

<style scoped lang="scss">
$navbar-color: #F27B5B;
$navbar-input-color: #FFDB7F;

@mixin reset-input {
  border: none;
  box-shadow: none;
}

.navbar {
  background-color: $navbar-color;

  .navbar-brand img {
    margin-left: 50px;
    width: 100px;
    height: auto;
    max-height: 100%;
    transform: translateY(2px);
  }

  .dropdown {
    border-radius: 20px;
    border: 1px solid black;
    width: fit-content;

    .dropdown-menu {
      background-color: $navbar-color;
    }

    button {
      font-weight: 600;
      &:focus, &:active {
        @include reset-input;
      }
    }

    .dropdown-item {
      &:hover {
        background-color: $navbar-input-color;
        font-weight: 600;
      }
    }
  }

  #userIcon-svg {
    margin-bottom: 3px;
    margin-right: 2px;
  }

  form {
    width: 280px;

    input {
      background-image: url("@/assets/images/magnifying_glass.png");
      background-repeat: no-repeat;
      background-position: left 10px center;
      background-size: 25px 25px;
      padding-left: 45px;
      background-color: $navbar-input-color;
      @include reset-input;

      &::placeholder {
        color: black;
        font-weight: 500;
        opacity: 1;
      }

      &:focus {
        background-color: $navbar-input-color;
      } 
    }
  }
}


</style>


