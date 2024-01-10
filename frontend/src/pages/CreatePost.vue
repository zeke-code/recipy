<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2 d-flex justify-content-center">
        <div class="create-post-wrapper mt-5 mb-5">
            <form @submit.prevent="onSubmit" enctype="multipart/form-data" class="form-centered mt-3">
                <h3>Create a post</h3>
                <div class="mb-3">
                    <label for="title" class="visually-hidden">Title</label>
                    <input type="text" class="form-control" id="title" placeholder="Your recipe's title!" v-model="form.title" required />
                </div>

                <div class="d-flex mb-3">
                    <label for="country" class="visually-hidden">Country</label>
                    <select class="form-select w-50" id="country" v-model="form.country" required>
                        <option disabled value="">Country</option>
                        <option v-for="country in countries" :key="country" :value="country"> {{ country }}</option>
                    </select>
                    <label class="visually-hidden" for="fileInput">Upload your picture here</label>
                    <input type="file" @change="handleImageUpload" class="form-control" id="fileInput" accept="image/*" />
                </div>

                <div class="mb-3">
                    <label for="Instructions" class="visually-hidden">Instructions</label>
                    <textarea class="form-control form-control-lg" id="instructions" v-model="form.instructions" rows="5" placeholder="Put your recipe's instructions here..." required></textarea>
                </div>

                <button type="submit" class="btn submit">Create Post</button>
                <div v-if="submitSuccess" class="alert alert-success" role="alert">
                    Your post was uploaded successfully!
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import axios from 'axios';

export default defineComponent({
    // Composition API used to define metadata as it is simple, and I'm lazy.
    setup() {
        useHead({
            title: 'Create | Recipy',
            meta: [{
                name: 'description',
                content: 'Create a post to share on Recipy.'
            }]
        })
    },
    emits: ['submit'],
    data() {
        return {
            form: {
                title: '',
                country: '',
                image: null as File | null,
                instructions: '',
            },
            countries: ['Italy 🇮🇹', 'France 🇫🇷', 'Japan 🇯🇵', 'China 🇨🇳', 'India 🇮🇳', 'Mexico 🇲🇽', 'Spain 🇪🇸', 'Thailand 🇹🇭', 'Greece 🇬🇷', 'Turkey 🇹🇷'],
            submitSuccess: false,
        }
    },

    methods: {
        async onSubmit() {
            const formData = new FormData();
            // All these informations should be sanitized, but we'll keep it simple here.
            formData.append('country', this.form.country);
            formData.append('title', this.form.title);
            formData.append('description', this.form.instructions);
            if (this.form.image) {
                formData.append('img_post', this.form.image, this.form.image.name);
            }
            const response = await axios.post('api/post/createpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                this.submitSuccess = true;
                this.form.title = '',
                this.form.country = '',
                this.form.instructions = ''
                this.$emit('submit');
            }
        },
        handleImageUpload(event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                this.form.image = file;
            }
        }
    }
})
</script>

<style scoped lang="scss">
$transparent-black: rgba(0, 0, 0, 0.267);
$post-text-color: #492318;
$button-stroke: #6A3323;
$button-color: #f27c5bbb;
$button-hover-color: #F27B5B;
$wrapper-color: #f27c5b98;

.create-post-wrapper {
    border-radius: 5px;
    width: 60%;
    height: fit-content;
    color: $post-text-color;
    /* background-color: $wrapper-color;
    border: 1px solid $transparent-black;
    box-shadow: 1px 4px 15px rgba(0, 0, 0, 0.4);
    */

    h3 {
        font-weight: 600;
    }

    .form-centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;

        .mb-3 {
            width: 80%;
        }

        #instructions {
            resize: none;
        }
    }

    .btn {
        outline: 2px solid $transparent-black;
    }

    .btn.submit {
        border-radius: 20px;
        margin-bottom: 23px;
        background-color: $button-color;
        &:hover {
            background-color: $button-hover-color;
        }
    }
}

@media (max-width: 1207px) {
    .create-post-wrapper {
        width: 100%;
    }
}
</style>