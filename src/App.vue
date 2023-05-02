<template>
  <div id="app" class="h-100">
    <div class="container-fluid h-100">
      <div class="nav">
        <button @click="tab='UserForm'">Add</button>
        <button @click="tab='UserLogin'">Login</button>
      </div>
      <div class="row h-100">
        <div class="col-md-3 vue-bg h-100% d-flex justify-content-center align-items-center">
          <img alt="Vue logo" src="./assets/logo.png" width="100">
        </div>
        <div class="col-md-9 h-100 d-flex justify-content-center align-items-center">
          <div class="col-md-8 rounded px-5 py-4 shadow bg-white text-left">
            <component :is="tab"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from './components/UserForm.vue';
import UserLogin from './components/Login.vue';
export default {
  name: 'App',
  data() {
    return {
      tab:"UserForm",
    }
  },
  components: {
    UserForm,
    UserLogin,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.vue-bg {
  background: #bce5d0;
}
.nav
{
    padding: 10px;
    background-color:aquamarine;
}
.nav button {
    background-color: aliceblue;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 0px 10px;
    font-size: large;
}
</style>
