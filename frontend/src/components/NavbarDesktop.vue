<template>
  <nav class="navbar sticky-top navbar-expand-lg align-items-center">
    <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <img :src="recipyLogo" alt="Recipy Logo">
        </router-link>
        <form @submit.prevent="submitSearch" class="d-flex me-3" role="search">
          <input v-model="searchTerm" class="form-control" type="search" placeholder="Search recipes here" aria-label="Search recipes here">
        </form>
        <div class="dropdown" v-if="user" :user="user">
          <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true">
            <img :src="userIcon" id="userIcon-svg">
            {{ user?.username }}
          </button>
          <div class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">Profile</router-link>
            <router-link to="/logout" class="dropdown-item" @click="logout">Logout</router-link>
        </div>
        </div>
        <div v-else id="notLoggedIn">
          <router-link to="/login" id="loginText">Login</router-link>
        </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import axios from 'axios';
import { User } from '../types';
import recipyLogo from '@/assets/images/recipy_logo.png'
import userIcon from '@/assets/svg/user_icon.svg'

export default defineComponent({
    props: {
      user: Object as PropType<User | null>
    },
    data() {
        return {
            recipyLogo,
            userIcon,
            searchTerm: '',
        };
    },
    methods: {
      async logout() {
            await axios.post('/api/auth/logout')
            window.location.reload()
        },
      async submitSearch() {
      this.$router.push({ path: '/search', query: { term: this.searchTerm } });
      this.searchTerm = ''
      },
    },
    mounted() {

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
  display: none;
  background-color: $navbar-color;
  border-bottom: 1px solid black;

  .navbar-brand img {
    margin-left: 50px;
    width: 100px;
    height: auto;
    max-height: 100%;
    transform: translateY(2px);
  }

  form {
    width: 280px;
    border: solid 1px black;
    border-radius: 7px;

    input {
      background-image: url("@/assets/images/magnifying_glass.png");
      background-repeat: no-repeat;
      background-position: left 10px center;
      background-size: 25px 25px;
      padding-left: 45px;
      background-color: $navbar-input-color;
      @include reset-input;

      &::placeholder {
        color: #492318;
        font-weight: 500;
        opacity: 1;
      }

      &:focus {
        background-color: $navbar-input-color;
      } 
    }
  }

  .dropdown {
    border-radius: 20px;
    border: 1px solid black;
    width: fit-content;
    margin-right: 5%;

    .dropdown-menu {
      background-color: $navbar-color;
    }

    button {
      font-weight: 600;
      border-radius: 20px;
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

  #notLoggedIn {
    margin-right: 8%;

    #loginText {
        color: black;
        text-decoration: none;
        font-size: 21px;
    }
  }
}

@media (min-width: 992px) {
  .navbar {
    display: block;
  }
}


</style>


