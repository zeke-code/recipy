<template>
    <div class="col-sm-12 col-lg-10">
        <div class="post-container">
            <div class="post">
                <h4 class="recipe-subtitle">Italian 🇮🇹</h4>
                <h3 class="recipe-name"> Carbonara Romana</h3>
                <img class="post-image" :src="carbonaraimage">
                <div class="button-container">
                    <div class="rate-button-container">
                        <button type="button" class="btn btn-emoji">&#x1F60B; 13445</button>
                        <div class="divider"></div>
                        <button type="button" class="btn btn-emoji">&#x1F44E;</button>
                    </div>
                    <button type="button" class="btn btn-standard"><img :src="commentIcon">156</button>
                    <button type="button" class="btn btn-standard"><img :src="favoriteIcon">54</button>
                    <button type="button" class="btn btn-share"><img :src="shareIcon"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import carbonaraimage from '@/assets/images/carbonara.jpg';
import commentIcon from '@/assets/svg/comment_icon.svg';
import favoriteIcon from '@/assets/svg/favorite_icon.svg';
import shareIcon from '@/assets/svg/share_icon.svg';

export default defineComponent({
    data() {
        return {
            carbonaraimage,
            commentIcon,
            favoriteIcon,
            shareIcon
        }
    },

    methods: {

    },

    mounted() {
        
    },

    beforeUnmount() {
        
    },
})

</script>

<style scoped lang="scss">
$button-color: rgba(242, 123, 91, 0.37);
$button-hover-color: rgba(236, 68, 21, 0.486);
$button-stroke: #6A3323;
$post-text-color: #492318;
$transparent-black: rgba(0, 0, 0, 0.3);
$button-height: 40px;

.post-container {
    outline: solid 2px $transparent-black;
    border-radius: 15px;
    padding: 10px;
    width: 641px;
    color: $post-text-color;

    .recipe-name {
        font-weight: bold;
    }

    .post-image {
        max-width: 100%;
        width: 620px;
        height: auto;
        box-shadow: 2px 2px 5px $transparent-black;
        border-radius: 15px;
    }

    .button-container {
        display: flex;
        align-items: center;
        margin-top: 10px;
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
        background-color: $button-color;
        width: fit-content;
        border-radius: 20px;
        margin-left: 20px;
        
        img {
            align-self: center;
            vertical-align: middle;
            margin-right: 5px;
        }
    }

    &-emoji {
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
        margin-left: 20px;
        border-radius: 20px;
        background-color: $button-color;
    }
}

.rate-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    border-radius: 20px;
    background-color: $button-color;

    .divider {
        background-color: $transparent-black;
        height: 40px;
        width: 2px;
    }
}

@media (min-width: 1207px) {
    .post-container {
        margin-left: 200px;
    }
}

</style>