<template>
    <div class="col-sm-12 col-md-12 col-lg-10 d-flex justify-content-center">
        <div class="create-post-wrapper mt-5 mb-5">
            <form @submit.prevent="submitForm" class="form-centered mt-3">
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
                    <input type="file" class="form-control" id="fileInput" accept="image/*" @change="handleImageUpload" />
                </div>

                <div class="mb-3">
                    <label for="Instructions" class="visually-hidden">Instructions</label>
                    <textarea class="form-control form-control-lg" id="instructions" v-model="form.instructions" rows="5" placeholder="Put your recipe's instructions here..." required></textarea>
                </div>

                <button type="submit" class="btn submit">Submit Recipe</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';

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

    data() {
        return {
            form: {
                title: '',
                country: '',
                image: null as File | null,
                instructions: '',
            },
            countries: ['Italy', 'France', 'Japan', 'China', 'India', 'Mexico', 'Spain', 'Thailand', 'Greece', 'Turkey'],
        }
    },

    methods: {
        submitForm() {

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

.create-post-wrapper {
    outline: solid 2px $transparent-black;
    border-radius: 10px;
    width: 60%;
    height: fit-content;
    color: $post-text-color;

    h3 {
        font-weight: bold;
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
</style>