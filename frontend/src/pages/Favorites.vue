<template>
    <div class="col-sm-12 col-md-10 col-lg-7 offset-lg-5 offset-md-2">
        <div class="d-flex">
            <h2 class="mt-5">Here are your favorite posts, {{ user?.username }}.</h2>
        </div>
        <PostList :posts="datiPost" />
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import PostComponent from '../components/PostComponent.vue';
import PostList from '../components/PostList.vue';
import { Post, User } from '../types';

export default defineComponent({
    components: { PostComponent, PostList },
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
        async getFavoritePosts() {
            await axios.get('/api/profile/favorites')
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