<template>
    <div class="column is-4 is-offset-4 formSign">
        <h1 class="title">Login</h1>
        <hr>
        <section>
            <b-field label="Email">
                <b-input v-model="email"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input v-model="password" 
                type="password"
                password-reveal></b-input>
            </b-field>
            <b-button type="is-info"
                @click.prevent="btnLogin">
                Sign In
            </b-button>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        btnLogin(){
            let form = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('getCarts');
            this.$store.dispatch('login', form)
                .then((result) => {
                    this.email = '';
                    this.password = '';
                    this.$swal(
                        {
                            icon: 'success',
                            title: 'Welcome!',
                            text: `${result}`,
                        }
                    )
                    this.$router.push('/');
                })
                .catch((err) => {
                    this.$swal(
                        {
                            icon: 'error',
                            title: 'Error!',
                            text: `${err}`,
                        }
                    )
                });
        }
    }
}
</script>