<template>
  
  <div class="col-lg-2 ps-4 position-fixed" id="column">
    <div class="sidebar">
    <!-- Sidebar content goes here -->
      <ul class="nav flex-column">
        <li class="nav-item"><router-link to="/" class="nav-link"><img :src="homeIcon">Home</router-link></li>
        <li class="nav-item"><router-link to="/popular" class="nav-link"><img :src="fireIcon">Most Popular</router-link></li>
        <li class="nav-item"><router-link to="/favorites" class="nav-link"><img :src="favoritesIcon">My Favorites</router-link></li>
        <li class="nav-item"><router-link to="/createpost" class="nav-link"><img :src="plusIcon">Create Post</router-link></li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import homeIcon from '@/assets/svg/home_icon.svg';
import fireIcon from '@/assets/svg/fire_icon.svg';
import favoritesIcon from '@/assets/svg/star_icon.svg';
import plusIcon from '@/assets/svg/plus_icon.svg';

export default defineComponent({
    data() {
        return {
          homeIcon,
          fireIcon,
          favoritesIcon,
          plusIcon
        }
    },

    methods: {

    },

    mounted() {

    },
})
</script>

<style scoped lang="scss">
$text-color: #492318;
$hover-link-color: #F27B5B;

#column {
  display: none;
  background-color: transparent;
  min-height: 100vh;
  border-right: 1px solid black;
  padding-top: 50px;

  .nav-link {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 15px;
    width: 90%;
    height: 50px;

    &:hover {
      background-color: $hover-link-color;
    }

    img {
      margin-right: 20px;
    }
  }

  .router-link-active {
      background-color: $hover-link-color;
    }
}

@media (min-width: 1207px) {
  #column {
    display: block;
  }
}
</style>