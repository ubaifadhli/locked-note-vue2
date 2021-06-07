<template>
  <div>
    <c-box p="4" border-width="2px" background="white">
      <c-flex align="center" justify-content="space-between">
        <c-heading size="lg">LockedNote</c-heading>
        <c-button size="sm" variant-color="red" @click="signOut">Sign out</c-button>
      </c-flex>
    </c-box>
  </div>
</template>

<script>
import {
  CBox,
  CFlex,
  CButton,
  CHeading,
} from '@chakra-ui/vue'
import router from "@/router";

export default {
  name: "NavigationBar",
  components: {
    CBox,
    CFlex,
    CButton,
    CHeading,
  },
  methods: {
    signOut() {
      router.push('/')
    }
  }
}
</script>

<style scoped>

</style>