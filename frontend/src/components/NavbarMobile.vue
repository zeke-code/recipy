<template>
  <div class="modal fade" id="searchModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <input type="search" class="form-control" placeholder="Search your recipe here...">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" id="closeModalButton" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="searchModalButton">Search</button>
        </div>
      </div>
    </div>
  </div>
    <nav class="navbar sticky-top">
      <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">Recipy Menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav">
                <li class="nav-item d-flex flex-column">
                  <button type='button' class='btn' data-bs-dismiss="offcanvas"><router-link to="/" class="nav-link"><img :src="homeIcon">Home</router-link></button>
                  <button type='button' class='btn' data-bs-dismiss="offcanvas"><router-link to="/trending" class="nav-link"><img :src="fireIcon">Trending</router-link></button>
                  <button type='button' class='btn' data-bs-dismiss="offcanvas"><router-link to="/explore" class="nav-link"><img :src="exploreIcon">Explore</router-link></button>
                  <button type='button' class='btn' data-bs-dismiss="offcanvas"><router-link to="/favorites" class="nav-link"><img :src="favoritesIcon">My Favorites</router-link></button>
                  <button type='button' class='btn' data-bs-dismiss="offcanvas"><router-link to="/createpost" class="nav-link"><img :src="plusIcon">Create Post</router-link></button>
                  <button type='button' class='btn' data-bs-dismiss="offcanvas"><router-link to="/login" class="nav-link"><img :src="logoutIcon">Login</router-link></button>
                </li>
              </ul>
          </div>
        </div>
        <router-link to="/" class="navbar-brand">
            <img :src="recipyLogo" alt="Recipy Logo">
        </router-link>
        <div class="d-flex align-items-center">
          <button class="btn" id="searchIcon" data-bs-toggle="modal" data-bs-target="#searchModal">
            <img :src="magnifyingGlass" alt="Search">
          </button>
          <router-link to="/user">
            <img :src="userIconMobile">
          </router-link>
        </div>
      </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import recipyLogo from '@/assets/images/recipy_logo.png';
import magnifyingGlass from '@/assets/images/magnifying_glass.png'
import userIconMobile from '@/assets/svg/user_icon_mobile.svg'
import homeIcon from '@/assets/svg/home_icon.svg';
import fireIcon from '@/assets/svg/fire_icon.svg';
import exploreIcon from '@/assets/svg/explore_icon.svg';
import plusIcon from '@/assets/svg/plus_icon.svg';
import favoritesIcon from '@/assets/svg/star_icon.svg';
import logoutIcon from '@/assets/svg/logout_icon.svg';

export default defineComponent({
    data() {
        return {
            recipyLogo,
            magnifyingGlass,
            userIconMobile,
            homeIcon,
            exploreIcon,
            favoritesIcon,
            plusIcon,
            fireIcon,
            logoutIcon
        }
    },
    methods: {
        
    },
    mounted() {

    },
    beforeUnmount() {
        
    }
})
</script>

<style scoped lang="scss">
$navbar-color: #F27B5B;
$sidebar-color: rgba(255, 222, 97, 0.4);
$separator-color: rgba(110, 107, 61, 0.4);
$text-color: #492318;

.navbar {
  display: block;
  border-bottom: solid 1px black;
  background-color: $navbar-color;

  .navbar-brand img {
    width: 90px;
    height: auto;
    max-height: 100%;
    margin-left: 50px;
    transform: translateY(2px);
  }

  #searchIcon img {
    width: 30px;
    height: auto;
  }
}

#offcanvasNavbar {
  width: 87%;
}

.offcanvas {
  .offcanvas-header {
    background-color: $navbar-color;
    border-bottom: 1px solid black;
  }

  .offcanvas-title {
    font-weight: 530;
  }

  .offcanvas-body {
    background-color: $sidebar-color;

    .nav-link {
      display: flex;
      align-items: center;
      font-weight: 550;
      color: $text-color;
      margin-bottom: 10px;
      padding-left: 10px;

      img {
        margin-right: 10px;
        width: 25px;
        height: auto;
      }
    }
  }
}



@media (min-width: 1207px) {
  .navbar {
    display: none;
  }
}

</style>