<template>
  <div class="row">
    <h2>Welcome,{{ username }}</h2>
    <h4>{{ emitted_data_text }}</h4>
    <Child @emitted_data="getEmittedData"/>
  </div>
</template>

<script>
import Child from './Child.vue';

    export default {
    name: "HomePage",
    data() {
        return {
            username: null,
            emitted_data_text:''
        };
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem("users"));
        if (user) {
            this.username = user.name;
        }
        else {
            this.$router.push("/login");
        }
    },
    methods: {
        getEmittedData(data) {
            this.emitted_data_text = data;
        }
    },
    components: { Child }
}
</script>