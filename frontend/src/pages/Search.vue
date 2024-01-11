<template>
    <div class="col-sm-12 col-md-10 col-lg-10 offset-lg-2 offset-md-2">
        <div v-for="post in datiPost" class="post-wrapper d-flex justify-content-center align-items-center mt-4" style="cursor: pointer;">
            <PostComponent :post="post" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useHead } from '@unhead/vue';
import { Post } from '../types';
import PostComponent from '../components/PostComponent.vue';

export default defineComponent({
    components: { PostComponent },
    setup() {
        useHead({
            title: 'Search | Recipy',
            meta: [{
                name: 'description',
                content: 'View search results on Recipy.'
            }]
        })
    },
    data() {
        return {
            datiPost: [] as Post[],
        }
    },

    methods: {
        async getSearchPosts() {
            const searchTerm = this.$route.query.term;
            await axios.get(`/api/search?term=${searchTerm}`)
                    .then(response => {
                        this.datiPost = response.data[0];
                        console.log(this.datiPost)
                    })
        }
    },

    mounted() {
        this.getSearchPosts();
    },
    /* Here we are watching every update of the search term, in order to update the page
    everytime the user searchs for a new recipe in the form */
    watch: {
        '$route.query.term': {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getSearchPosts();
                }
            },
            immediate: true
        }
    }
})
</script>
