<template>
  <c-box rounded="lg" p="4" my="6" bg="white">
    <c-flex align="center" justify="space-between">
      <c-image rounded="full" size="14vh" :src="hasUnlocked ? unlockedIcon : lockedIcon" />
      <c-box px="6">
        <c-tag size="sm" :variantColor="hasUnlocked ? unlockedColor : lockedColor" my="2">{{ hasUnlocked ? unlockedTag : lockedTag }}</c-tag>
        <c-heading size="lg">{{note.name}}</c-heading>
        <c-text>Unlocked in {{note.unlockedDate}}</c-text>
      </c-box>

      <c-box align="center">
        <c-button @click="openDetailModal" size="sm" :isDisabled="!hasUnlocked" m="2" variant-color="gray">Open</c-button>
        <c-button @click="openDeleteModal" size="sm" variant-color="red">Delete</c-button>
      </c-box>

    </c-flex>


    <c-modal
        size="sm"
        :is-open="isDetailModalOpen"
        :on-close="closeDetailModal"
        :closeOnOverlayClick="false"
        :closeOnEsc="false"
    >
      <c-modal-content pb="4">
        <c-modal-header>{{ note.name }} - Detail</c-modal-header>
        <c-modal-close-button />
        <c-modal-body >
          <c-text mb="2">Here is the password for this note :</c-text>

          <c-flex justify="space-between" align="center">
            <c-input isDisabled v-model="password">
            </c-input>
          </c-flex>
        </c-modal-body>
        <c-modal-footer>
          <c-button
              v-clipboard="() => password"
              v-clipboard:success="onClipboardSuccess"
              v-clipboard:error="onClipboardError">
            Copy to Clipboard
          </c-button>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>

    <c-modal
        size="sm"
        :is-open="isDeleteModalOpen"
        :on-close="closeDeleteModal"
        :closeOnOverlayClick="false"
        :closeOnEsc="false"
    >
      <c-modal-content pb="4">
        <c-modal-header>{{ note.name }} - Delete</c-modal-header>
        <c-modal-close-button />
        <c-modal-body >
          <c-text mb="2">Do you really want to delete this note? The password inside it will also be deleted.</c-text>
        </c-modal-body>
        <c-modal-footer>
          <c-button @click="deleteNote" variant-color="red" mx="2">Delete</c-button>
          <c-button @click="closeDeleteModal" >Cancel</c-button>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </c-box>
</template>

<script>
import {
  CBox,
  CFlex,
  CImage,
  CHeading,
  CText,
  CButton,
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalCloseButton,
  CTag,
  CInput,
} from "@chakra-ui/vue";

export default {
  name: "Note",
  components: {
    CBox,
    CFlex,
    CImage,
    CHeading,
    CText,
    CButton,
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalCloseButton,
    CTag,
    CInput,
  },

  props: {
    note: Object,
  },

  data() {
    return {
      isDetailModalOpen: false,
      isDeleteModalOpen: false,
      lockedIcon: require('@/assets/locked-icon.png'),
      unlockedIcon: require('@/assets/unlocked-icon.png'),
      lockedTag: 'Locked',
      unlockedTag: 'Unlocked',
      lockedColor: 'red',
      unlockedColor: 'green',
      hehe: 'hehe',
      // Fetch password using API, should be using mount stuff
      password: 'password1'
    }
  },

  methods: {
    openDetailModal() {
      this.isDetailModalOpen = true;
    },

    closeDetailModal() {
      this.isDetailModalOpen = false;
    },

    openDeleteModal() {
      this.isDeleteModalOpen = true;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },

    deleteNote() {
      // fetch API to delete Note here
      this.closeDeleteModal()
    },

    onClipboardSuccess() {
      this.showDetailToast(
          'Password Copied.',
          'Your password has been copied.',
          'success'
      )
    },

    onClipboardError() {
      this.showDetailToast(
          'Failed to Copy.',
          'Unable to copy password. Please try again.',
          'error'
      )
    },

    showDetailToast(title, description, status) {
      this.$toast({
        title: title,
        description: description,
        status: status,
        duration: 5000
      })
    },
  },

  computed: {
    hasUnlocked() {
      return this.note.unlockedDate !== 'June 10, 2021'
    },
  }
}
</script>

<style scoped>

</style>