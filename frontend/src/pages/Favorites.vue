<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <h2 class="mt-5">You have a fine taste, {{ user?.username }}. Here are your favorite posts.</h2>
            <div v-for="post in datiPost" class="post-wrapper d-flex justify-content-center mt-4">
                <PostComponent :post="post" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import PostComponent from '../components/PostComponent.vue';
import { Post, User } from '../types';

export default defineComponent({
    components: { PostComponent },
    props: {
        user: Object as PropType<User>
    },

    setup() {
        useHead({
            title: 'Favorites | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Post that you saved as favorites on Recipy.'
                }
            ]
        })
    },

    data() {
        return {
            datiPost: [] as Post[],
        }
    },

    methods: {
        getFavoritePosts() {
            axios.get('/api/profile/favorites')
                .then(response => {
                    this.datiPost = response.data;
                })
        }
    },

    mounted() {
        this.getFavoritePosts();
    }

})

</script>

<style scoped lang="scss">
$post-text-color: #492318;
.post-wrapper {
    padding: 10px;
    max-width: 641px;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    color: $post-text-color;
}
</style>