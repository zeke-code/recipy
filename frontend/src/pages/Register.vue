<template>
    <div class="col-sm-12 col-md-12 col-lg-10 offset-lg-2">
        <div class="d-flex pt-5 flex-column justify-content-center align-items-center">
            <form @submit.prevent="onSubmit">
                <h1>Register On Recipy!</h1>
                <div class="mb-3">
                  <label for="usernameForm" class="form-label">Username</label>
                  <input type="text" v-model="username" class="form-control" id="usernameForm" placeholder="Username" aria-describedby="usernameHelp">
                  <div id="usernameHelp" class="form-text">Your username will be visible to everyone on Recipy.</div>
                </div>
                <div class="mb-3">
                  <label for="passwordForm" class="form-label">Password</label>
                  <input type="password" v-model="password" class="form-control" placeholder="Password" id="passwordForm">
                  <label for="passwordConfirmation" class="form-label">Password Confirmation</label>
                  <input type="password" v-model="confirmPassword" class="form-control" placeholder="Password Confirmation" id="passwordFormConfirmation">
                  <div id="passwordHelp" class="form-text">Make sure it's secure and not something like your date of birth.</div>
                </div>
                <button type="submit" class="btn btn-danger">Register</button>
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
            title: 'Sign Up | Recipy',
            meta: [{
                name: 'description',
                content: 'Page where to sign up in Recipy'
            }]
        })
    },
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
        }
    },
    methods: {
        async onSubmit() {
            if (this.password != this.confirmPassword) {
                alert('The two passwords are not equal.')
                return
            }
            try {
                await axios.post('/api/auth/register', {
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