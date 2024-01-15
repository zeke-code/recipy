<template>
    <div class="post">
        <router-link :to="`/post/${post?.recipe_id}`" aria-label="View details for this post" style="text-decoration: none; color: inherit;">
      <h4 class="recipe-country">{{ post?.country }} {{ post?.country ? countryFlags[post.country] : '' }}</h4>
      <h3 class="recipe-name">{{ post?.title }} by {{ post?.username }}</h3>
      <img class="post-image" :src="'/img/' + post?.img_post" alt="Recipe's picture">
        </router-link>
      <div class="button-wrapper">
        <button type="button" class="btn btn-standard" aria-label="Like post" @click="likePost">&#x1F60B; {{ post?.like_count }}</button>
        <router-link :to="`/post/${post?.recipe_id}`" style="text-decoration: none; color: inherit">
            <button type="button" class="btn btn-standard" aria-label="Comment post">
            <img :src="commentIcon" alt="Comments Icon">{{ post?.comment_count }}
        </button>
        </router-link>
        <button type="button" class="btn btn-standard" aria-label="Save in favorites post" @click="favoritePost"><img :src="favoriteIcon" alt="Favorites Icon"> {{ post?.favorite_count }}</button>
      </div>
      <div class="separator mt-4"></div>
    </div>
  </template>
  
  <script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { Post, CountryFlags } from '../types';
  import commentIcon from '@/assets/svg/comment_icon.svg';
  import favoriteIcon from '@/assets/svg/favorite_icon.svg';
  import axios from 'axios';


  export default defineComponent({
    props: {
        post: Object as PropType<Post>,
    },
    data() {
        return {
            countryFlags: {
              Italy: '🇮🇹',
              France: '🇫🇷',
              Japan: '🇯🇵',
              China: '🇨🇳',
              India: '🇮🇳',
              Mexico: '🇲🇽',
              Spain: '🇪🇸',
              Thailand: '🇹🇭',
              Greece: '🇬🇷',
              Turkey: '🇹🇷',
              USA: '🇺🇸'
            } as CountryFlags,
            commentIcon,
            favoriteIcon,
        }
    },
    methods: {
        async likePost() {
            try{
            await axios.post(`/api/post/${this.post?.recipe_id}/like`)
                .then(response => {
                    if (response.data.success) {
                        if (this.post) {
                            if (response.data.message === 'Like added.') {
                                this.post.like_count++;
                            } else if (response.data.message === 'Like removed.') {
                                this.post.like_count--;
                            }
                        }
                    }
                })
            } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert('You need to be logged in to do this interaction.')
            }
        }
    },
        async favoritePost() {
            try {
            await axios.post(`/api/post/${this.post?.recipe_id}/favorite`)
                .then(response => {
                    if (response.data.success) {
                        if (this.post) {
                            if (response.data.message === 'Favorite added.') {
                                this.post.favorite_count++;
                            } else if (response.data.message === 'Favorite removed.') {
                                this.post.favorite_count--;
                            }
                        }
                    }
                })
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    alert('You need to be logged in to do this interaction.')
                }
            }
        }
    }
  })
  </script>

<style scoped lang="scss">
$button-color: #f36f4bad;
$button-hover-color: #ec44159c;
$button-stroke: #6A3323;
$post-text-color: #492318;
$transparent-black: rgba(0, 0, 0, 0.267);
$button-height: 40px;

.post {
    word-break: break-word;
}

.recipe-name {
    font-weight: bold;
    margin: 0;
    margin-top: -6px;
    margin-bottom: 12px;
}

.post-image {
    max-width: 100%;
    width: 620px;
    height: auto;
    box-shadow: -3px 6px 5px $transparent-black;
    border-radius: 15px;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.btn {
    &-standard {
        font-size: 20px;
        cursor: pointer;
        transition: background-color 0.3s ease, border-radius 0.3s ease;
        height: $button-height;
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        border-radius: 20px;
        margin-left: 30px;
        outline: solid 1px $transparent-black;
        background-color: $button-color;

        img {
            align-self: center;
            vertical-align: middle;
            margin-right: 5px;
        }

        &:hover {
            background-color: $button-hover-color;
        }
    }
}

.separator {
    background-color: black;
    height: 1px;
    width: 100%;
}
/*
@media (min-width: 1207px) {
    .post-container {
        margin-left: 200px;
    }
}
*/
@media (max-width: 576px) {
    .btn {
        &-standard {
            font-size: 16px;
            height: 30px;
            padding: 5px 10px;
            margin-left: 20px;

            img {
                width: 21px;
                height: auto;
            }
        }

    }
}
</style>