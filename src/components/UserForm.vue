<template>
    <form id="signup-form" v-on:submit.prevent="submit">
        <div class="row">
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Full Name <span class="text-danger">*</span></label>
                <input type="text" v-model.trim="$v.fullname.$model" :class="{'is-invalid': validationStatus($v.fullname)}" class="form-control form-control-lg">
                <div v-if="!$v.fullname.required" class="invalid-feedback">The full name field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                <input type="email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                <div v-if="!$v.email.required" class="invalid-feedback">The email field is required.</div>
                <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Password <span class="text-danger">*</span></label>
                <input type="password" v-model.trim="$v.password.$model" :class="{'is-invalid': validationStatus($v.password)}" class="form-control form-control-lg">
                <div v-if="!$v.password.required" class="invalid-feedback">The password field is required.</div>
                <div v-if="!$v.password.minLength" class="invalid-feedback">You must have at least {{ $v.password.$params.minLength.min }} letters.</div>
                <div v-if="!$v.password.maxLength" class="invalid-feedback">You must not have greater then {{ $v.password.$params.maxLength.min }} letters.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Confirm Password <span class="text-danger">*</span></label>
                <input type="password" v-model.trim="$v.confirmPassword.$model" :class="{'is-invalid': validationStatus($v.confirmPassword)}" class="form-control form-control-lg">
                <div v-if="!$v.confirmPassword.required" class="invalid-feedback">The confirm password field is required.</div>
                <div v-if="!$v.confirmPassword.sameAspassword" class="invalid-feedback">Confirm password does not match.</div>
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4">Sign Up</button>
            </div>
        </div>
    </form>
    
</template>
<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios';
export default {
    name: 'UserForm',
    data: function() {
        return {
            fullname: '', 
            email: '', 
            password: '',
            confirmPassword: ''
        }
    }, 
    validations: {
        fullname: {required},
        email: {required, email},
        password: {required, minLength: minLength(6), maxLength: maxLength(18)},
        confirmPassword: {required, sameAspassword:sameAs('password')}
    },
    methods: {
        resetData: function() {
            this.fullname = '';
            this.email = '';
            this.confirmPassword = '';
            this.password = '';
        },

        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        submit: function() {

            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            this.register();
        },
        async register() {
            let result = await axios.post(" http://localhost:3000/users",{
                name: this.fullname,
                email: this.email,
                password:this.password,
            });
            this.$v.$reset();
            this.resetData();
            alert("data save success full");
            console.log(result);
        }
    }
}
</script>
<style>
.btn-vue{
    background: #53B985;
    color: #31485D;
    font-weight: bold;
}
label {
    text-align: justify;
}
</style>