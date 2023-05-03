<template>
    <form id="signup-form" v-on:submit.prevent="submit">
        <div class="row">
            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="show">
                <strong>Invalid!</strong> User name & password
                <button type="button" class="close btn" @click="show = !show">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                <input type="email" v-model.trim="$v.email.$model" :class="{ 'is-invalid': validationStatus($v.email) }"
                    class="form-control form-control-lg">
                <div v-if="!$v.email.required" class="invalid-feedback">The email field is required.</div>
                <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Password <span class="text-danger">*</span></label>
                <input type="password" v-model.trim="$v.password.$model"
                    :class="{ 'is-invalid': validationStatus($v.password) }" class="form-control form-control-lg">
                <div v-if="!$v.password.required" class="invalid-feedback">The password field is required.</div>
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4">Sign Up</button>
            </div>
            

        </div>
    </form>
</template>
<script>
import axios from 'axios';
import { required, email } from 'vuelidate/lib/validators'
export default {
    name: "UserForm",
    data: function () {
        return {
            email: "",
            password: "",
            show: false,
        };
    },
    validations: {
        email: { required, email },
        password: { required },
    },
    methods: {
        resetData: function () {
            this.fullname = "";
            this.email = "";
            this.confirmPassword = "";
            this.password = "";
        },
        validationStatus: function (validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error)
                return;
            this.login();
        },
        async login() {
            let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`);
            if (result.status == 200 && result.data.length > 0) {
                localStorage.setItem("users", JSON.stringify(result.data[0]));
                this.$v.$reset();
                this.resetData();
                this.$router.push("/");
            }
            else {
                this.show = true;
            }
        }
    },
    mounted() {
       let user = localStorage.getItem("users");
       if(user) {
            this.$router.push({name:"Home"});
       }
    }
}
</script>
<style>
.btn-vue {
    margin-top: 5%;
    background: #53B985;
    color: #31485D;
    font-weight: bold;
}

label {
    text-align: justify;
}</style>