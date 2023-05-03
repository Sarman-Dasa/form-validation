<template>
    <h2>Welcome,{{ username }}</h2>
</template>

<script>
    export default {
        name:"HomePage",
        data() {
            return {
                username:null,
            }
        },
        mounted() {
            let user = JSON.parse(localStorage.getItem('users'));
            if(user) {               
                this.username = user.name;
            }
            else { 
                this.$router.push('/login');
            }
        }
    }
</script>