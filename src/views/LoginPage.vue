<template>
    <div class="container">
      <c-box
          justify-content="center"
          h="md"
          d="flex"
          flex-dir="column">

        <c-heading text-align="center">LockedNote</c-heading>
        <c-text text-align="center">Reliable temptation locker.</c-text>

        <c-collapse v-if="progress.error" is-open>
          <c-alert status="error" my="2">
            <c-alert-icon />
            Wrong email or password.
          </c-alert>
        </c-collapse>

        <c-form-control text-align="center">

          <c-input @focus="resetError" v-model="credentials.email" placeholder="Email" my="2" type="email"/>
          <c-input @focus="resetError" v-model="credentials.password" placeholder="Password" my="2" type="password"/>
          <c-button v-bind:is-loading="progress.loading" variant-color="blue" my="4" @click="authorizeLogin">Log in</c-button>
        </c-form-control>

      </c-box>
    </div>
</template>

<script>
import {
  CBox,
  CFormControl,
  CInput,
  CText,
  CHeading,
  CButton,
  CAlert,
  CAlertIcon,
  CCollapse,
} from '@chakra-ui/vue';

export default {
  name: "LoginPage",

  components: {
    CBox,
    CFormControl,
    CInput,
    CHeading,
    CButton,
    CText,
    CAlert,
    CAlertIcon,
    CCollapse,
  },

  data() {
    return {
      progress: {
        loading: false,
        error: false,
      },

      credentials: {
        email: '',
        password: '',
      }
    }
  },

  methods: {
    authorizeLogin(e) {
      e.preventDefault()
      this.progress.loading = true

      if (this.credentials.email === 'ubai' && this.credentials.password === '123')
        this.$router.push('notes')
      else
        this.progress.error = true

      this.progress.loading = false

      this.credentials.email = ''
      this.credentials.password = ''
    },

    resetError() {
      this.progress.error = false
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>