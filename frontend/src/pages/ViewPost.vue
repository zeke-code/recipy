<template>
    <div class="col-sm-12 col-md-10 col-lg-7 offset-lg-5 offset-md-2">
        <div v-if="postDetails" class="post-wrapper d-flex flex-column justify-content-center align-items-center mt-4">
            <PostComponent v-if="postDetails" :post="postDetails[0]" />
            <div class="recipe-text mt-4 fw-semibold">
                <p>{{ postDetails[0].description }}</p>
            </div>
            <div id="divider" />
            <div class="form-wrapper">
                <form @submit.prevent="submitComment">
                    <label for="commentForm" class="form-label visually-hidden">Write your comment here!</label>
                    <textarea class="form-control mt-3" id="commentForm" rows="3" placeholder="Write your comment here!" v-model="commentText" required />
                    <button type="submit" class="btn mt-3">Submit</button>
                </form>
                <div v-if="showAlert" class="alert alert-success mt-3" role="alert">
                    Your comment was sent successfully!
                </div>
            </div>
            <div v-for="comment in comments" class="comment-wrapper mt-5">
                <div class="d-flex align-items-baseline">
                    <img :src="userIcon" class="me-1"><p class="fw-semibold">{{ comment.username }}</p>
                </div>
                <p>{{ comment.comment_text }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import axios from 'axios';
import { Post, Comment } from '../types';
import PostComponent from '../components/PostComponent.vue';
import userIcon from '@/assets/svg/user_icon.svg';

export default defineComponent({
    components: { PostComponent },
    setup() {
        useHead({
            title: 'Post | Recipy',
            meta: [
                {
                    name: 'description',
                    content: 'Page where you view a post in Recipy.'
                }
            ]
        })
    },

    data() {
        return {
            postDetails: null as Post[] | null,
            comments: [] as Comment[],
            userIcon,
            commentText: '',
            showAlert: false,
        }
    },

    methods: {
        async getPostById() {
            await axios.get(`/api/post/${this.$route.params.recipe_id}/details`)
                .then(response => {
                    this.postDetails = response.data[0];
                    console.log(this.postDetails);
                })
        },

        async getComments() { 
            await axios.get(`/api/post/${this.$route.params.recipe_id}/comments`)
                .then(response => {
                    this.comments = response.data;
                    console.log(this.comments);
                })
        },

        async submitComment() {
            await axios.post(`/api/post/sendcomment`, {
                comment_text: this.commentText,
                recipe_id: this.$route.params.recipe_id
            })
            .then(response => {
                if (response.status === 200) {
                    this.showAlert = true;
                }
                this.commentText = '';
            })
        }
    },

    mounted() {
        this.getPostById();
        this.getComments();
    }
})
</script>

<style scoped lang="scss">
$post-wrapper-color: #F27B5B;
$button-color: #F27B5B;
$comment-form-color: rgba(224, 123, 55, 0.788);

.post-wrapper {
    padding: 10px;
    max-width: 641px;
    white-space: pre-line;
    word-wrap: break-word;
}

#divider {
    border-top: 1px solid black;
    width: 100%;
    margin-top: 20px;
}

.comment-wrapper {
    width: 100%;
    padding: 2%;
    white-space: pre-line;
    background-color: $post-wrapper-color;
    border-radius: 20px;
    border: 1px solid black;
}

.form-wrapper {
    width: 100%;
    // background-color: $comment-form-color;

    button {
        background-color: $button-color;
        border: 1px solid black;
        border-radius: 20px;
    }

    textarea {
        resize: none;
    }
}

.recipe-text {
    background-color: $post-wrapper-color;
    border-radius: 20px;
    padding: 2%;
    border: solid 1px black;
}
</style>