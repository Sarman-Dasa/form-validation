<template>
  <div id="app" class="h-100">
    <div class="container-fluid h-100">
      <div class="nav">
        <div v-if="show">
          <router-link to="/login">Login</router-link>
          <router-link to="/registration">Registration</router-link>
        </div>
        <div v-if="!show">
          <router-link to="/">Home</router-link>
          <router-link to="/todo">Todo</router-link>
          <router-link to="/file-upload">uplaod Image</router-link>
          <router-link to="/user-list">User</router-link>
          <a @click="logout()">Logout</a>
        </div>
      </div>
      <div class="row h-100">
        <!-- <div class="col-md-3 vue-bg h-100% d-flex justify-content-center align-items-center">
          <img alt="Vue logo" src="./assets/logo.png" width="100">
        </div> -->
        <div class="col-md-9 h-100 d-flex justify-content-center align-items-center">
          <div class="col-md-8 rounded px-5 py-4 shadow bg-white text-left">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      tab: "UserForm",
      show: true,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('users');
      this.$router.push('/login');
    }
  },
  updated() {
    let user = localStorage.getItem("users");
    if (user) {
      this.show = false
    }
    else { this.show = true }
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

.nav {
  width: 100%;
  background-color: #2c3e50;
  color: #fff;
  overflow: hidden;
}

a {
  color: #fff;
  text-decoration: none !important;
  font-size: large;
  padding: 20px 25px;
  font-weight: bold;
  float: left;
}

a:hover {
  background-color: green;
  border-radius: 10px;
}

.nav-rigth {
  float: right;
}
</style>
