<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <div v-for="post in datiPost" class="post-wrapper d-flex justify-content-center mt-1">
                <div class="post">
                    <h4 class="recipe-country">{{ post.country }} {{ countryFlags[post.country] }}</h4>
                    <h3 class="recipe-name">{{ post.title }} by {{ post.username }}</h3>
                    <img class="post-image" :src="'/img/' + post.img_post" alt="Recipe's picture">
                    <div class="button-wrapper">
                        <div class="rate-button-wrapper">
                            <button type="button" class="btn btn-emoji" aria-label="Like post">&#x1F60B; {{ post.like_count }}</button>
                            <div class="divider"></div>
                            <button type="button" class="btn btn-emoji" aria-label="Dislike post">&#x1F44E;</button>
                        </div>
                        <button type="button" class="btn btn-standard" aria-label="Comment post"><img :src="commentIcon" alt="Comments Icon">{{ post.comment_count }} </button>
                        <button type="button" class="btn btn-standard" aria-label="Save in favorites post"><img :src="favoriteIcon" alt="Favorites Icon"> {{ post.favorite_count }}</button>
                        <button type="button" class="btn btn-share" aria-label="Share the post"><img :src="shareIcon"></button>
                    </div>
                </div>

                <div class="separator mt-4"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import commentIcon from '@/assets/svg/comment_icon.svg';
import favoriteIcon from '@/assets/svg/favorite_icon.svg';
import shareIcon from '@/assets/svg/share_icon.svg';
import { Post, CountryFlags } from '../types';

export default defineComponent({
    // Composition API used to define metadata as it is simpler, and I'm lazy.
    setup() {
        useHead({
            title: 'Home | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Home page of Recipy.'
                }
            ]
        })
    },
    data() {
        return {
            datiPost: [] as Post[],
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
            shareIcon,
        }
    },

    methods: {
        getPosts() {
            axios.get('/api/post')
                .then(response => {
                    this.datiPost = response.data
                    console.log(response.data)
            })
        }
    },

    mounted() {
        this.getPosts();
    },

    beforeUnmount() {
        
    },
})

</script>

<style scoped lang="scss">
$button-color: #f36f4bad;
$button-hover-color: #ec44159c;
$button-stroke: #6A3323;
$post-text-color: #492318;
$transparent-black: rgba(0, 0, 0, 0.267);
$button-height: 40px;

.post-wrapper {
    padding: 10px;
    max-width: 641px;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    color: $post-text-color;

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
        box-shadow: 2px 2px 5px $transparent-black;
        border-radius: 15px;
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
}

.btn {
    &-standard, &-emoji, &-share {
        font-size: 17px;
        cursor: pointer;
        transition: background-color 0.3s ease, border-radius 0.3s ease;
        height: $button-height;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: $button-hover-color;
        }
    }

    &-standard {
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
    }

    &-emoji {
        background-color: transparent;

        &:first-child:hover {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
        }
        &:last-child:hover {
            border-bottom-right-radius: 20px;
            border-top-right-radius: 20px;
        }
    }

    &-share {
        width: 40px;
        margin-left: 30px;
        border-radius: 20px;
        background-color: $button-color;
        outline: solid 1px $transparent-black;
    }
}

.rate-button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    border-radius: 20px;
    background-color: $button-color;
    outline: solid 1px $transparent-black;

    .divider {
        background-color: $transparent-black;
        height: 40px;
        width: 2px;
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

    .rate-button-wrapper {
        height: 30px;

        .divider {
            height: 30px;
        }
    }
    .btn {
        &-standard, &-emoji, &-share {
            font-size: 14px;
            height: 30px;
            padding: 5px 10px;
            line-height: 1;

            img {
                width: 20px;
                height: auto;
            }
        }

        &-standard {
            margin-left: 10px;
        }


        &-share {
            width: 30px;
            margin-left: 10px;
        }

    }
}

</style>