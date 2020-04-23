<template>
    <div class="column is-4 is-offset-4 formSign">
        <h1 class="title">Register</h1>
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
            <b-field label="Name">
                <b-input v-model="name"></b-input>
            </b-field>
            <b-field label="Address">
                <b-input v-model="address"></b-input>
            </b-field>
            <b-field label="phone">
                <b-input v-model="phone"></b-input>
            </b-field>
            <b-button type="is-info"
                @click.prevent="btnRegister">
                Sign Up
            </b-button>
        </section>
    </div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            address: '',
            phone: '',
        }
    },
    methods: {
        btnRegister() {
            let form = {
                email: this.email,
                password: this.password,
                name: this.name,
                address: this.address,
                phone: this.phone
            }
            this.$store.dispatch('register', form)
                .then((result) => {
                    this.email = '';
                    this.password = '';
                    this.name = '';
                    this.address = '';
                    this.phone = '';
                    this.$store.dispatch('transactions');
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
    },
}
</script>
<style>
    .formSign {
        margin-top:5%;
        background-color: #b9cae4;
        border-radius: 5px;
    }
</style>