<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2">
        <div class="d-flex pt-5 flex-column justify-content-center align-items-center">
            <form @submit.prevent="onSubmit">
                <h1>Login On Recipy</h1>
                <div class="mb-3">
                  <label for="usernameForm" class="form-label">Username</label>
                  <input type="text" v-model="username" class="form-control" id="usernameForm" placeholder="Username" aria-describedby="usernameHelp">
                  <div id="usernameHelp" class="form-text">Your username will be visible to everyone on Recipy.</div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" v-model="password" class="form-control" placeholder="Password" id="passwordForm">
                  <div id="passwordHelp" class="form-text">You don't have an account? <router-link to="/register">Click here to sign up</router-link></div>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { useHead } from '@unhead/vue';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        useHead({
            title: 'Login | Recipy',
            meta: [{
                name: 'description',
                content: 'Page where to Log In in Recipy'
            }]
        })
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async onSubmit() {
            try {
                await axios.post('/api/auth/login', {
                    username: this.username,
                    password: this.password,
                })
                window.location.href = '/'
            } catch (e: any) {
                if (e.response) {
                    alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
                } else {
                    alert(e.message)
                }
            }
        }
    }
})
</script>

<style scoped lang="scss">
.d-flex {


    form {
        width: 80%;
        @media (min-width: 768px) {
            width: 40%;
        }
    }
}

h1 {
    font-weight: 510;
}
</style>