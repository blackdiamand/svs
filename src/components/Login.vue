<template>
  <div class="login-block">
    <div
      v-if="!$auth.isAuthenticated"
      class="buttons"
    >
      <button
        class="button"
        @click="login"
      >
        Log in with Discord
      </button>
    </div>
    <div
      v-if="$auth.isAuthenticated"
      class="buttons"
    >
      <router-link
        to="/profile"
      >
        <button class="button">
          <span class="icon is-small"><i class="fas fa-user"></i></span>
          <span>{{ user.name }}</span>
        </button>
      </router-link>
      <button
        class="button"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$auth.user
    }
  },
  mounted () {
    console.log(this.$auth)
  },
  methods: {
    login () {
      console.log("Login")
      this.$auth.loginWithRedirect()
        .then(res => { console.log(res) })
    },
    logout () {
      console.log("Log out")
      this.$auth.logout()
      .then(res => { console.log(res) })
    }
  }
}

</script>
