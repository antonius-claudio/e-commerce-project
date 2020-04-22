<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item>
                <router-link to="/">Home</router-link>
            </b-navbar-item>
            <b-navbar-item>
                <router-link to="/about">About</router-link>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <div v-if="$store.state.isLogged === false">
                        <router-link to="/register">
                            <a class="button is-light">
                                Sign up
                            </a>
                        </router-link>
                    </div>
                    <div v-if="$store.state.isLogged === false">
                        <router-link to="/login">
                            <a class="button is-light">
                                Sign in
                            </a>
                        </router-link>
                    </div>
                    <div v-if="$store.state.isLogged === true">
                        <a class="button is-danger" @click.prevent="btnLogout">
                            Log out
                        </a>
                    </div>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>
export default {
    methods: {
        btnLogout() {
            this.$store.commit('SET_ISLOGGED', false);
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('address');
            localStorage.removeItem('phone');
            this.$router.push('/');
        }
    }
}
</script>