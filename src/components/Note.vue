<template>
  <c-box rounded="lg" p="4" my="6" bg="white">
    <c-flex align="center" justify="space-between">
      <c-image rounded="full" size="14vh" :src="hasUnlocked ? unlockedIcon : lockedIcon" />
      <c-box px="6">
        <c-tag size="sm" :variantColor="hasUnlocked ? unlockedColor : lockedColor" my="2">{{ hasUnlocked ? unlockedTag : lockedTag }}</c-tag>
        <c-heading size="lg">{{note.name}}</c-heading>
        <c-text>Unlocked in {{ printFormattedDate() }}</c-text>
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
          <c-flex v-if="isFetchingNote" justify="center">
            <c-spinner
                thickness="4px"
                speed="0.65s"
                empty-color="blue.200"
                color="blue.500"
                size="md"
            />
          </c-flex>

          <c-box v-else>
            <c-text mb="2">Here is the password for this note :</c-text>

            <c-box justify="space-between" align="center">
              <c-input isDisabled v-model="note.password">
              </c-input>
            </c-box>
          </c-box>
        </c-modal-body>
        <c-modal-footer>
          <c-button
              :isDisabled="isFetchingNote"
              v-clipboard="() => note.password"
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
  CSpinner,
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
    CSpinner
  },

  props: {
    note: Object,
  },

  data() {
    return {
      isFetchingNote: false,

      isDetailModalOpen: false,
      isDeleteModalOpen: false,

      lockedIcon: require('@/assets/locked-icon.png'),
      unlockedIcon: require('@/assets/unlocked-icon.png'),
      lockedTag: 'Locked',
      unlockedTag: 'Unlocked',
      lockedColor: 'red',
      unlockedColor: 'green',
    }
  },

  methods: {
    openDetailModal() {
      this.isDetailModalOpen = true;
      this.getNotePassword()
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

    getNotePassword() {
      this.isFetchingNote = true

      this.axios
          .get('https://locked-note-spring.herokuapp.com/api/v1/notes/' + this.note.id)
          .then(response => {
            this.note = response.data
          })
          .catch(error => {
                console.log('fail fetch')
                console.log(error)
          })
          .finally(() => this.isFetchingNote = false)
    },

    deleteNote() {
      this.axios
          .delete('https://locked-note-spring.herokuapp.com/api/v1/notes/' + this.note.id)
          .then(response => {
            this.$emit('delete:note', this.note.id)
            console.log(response)
            this.showDetailToast(
                'Note deleted.',
                'Your note has been deleted.',
                'success'
            )
          })
          .catch(error => {
            console.log(error)
            this.showDetailToast(
                'Deletion failed.',
                'Error occured. Your note has not been deleted.',
                'error'
            )
          })

      this.closeDeleteModal()
    },

    printFormattedDate() {
      const parsedDatetime = new Date(this.note.unlockedDate)
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      const formattedDate = parsedDatetime.toLocaleDateString("en-US", options)
      const formattedTime = parsedDatetime.toLocaleTimeString()

      return formattedDate + ', ' + formattedTime

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
      const parsedDatetime = new Date(this.note.unlockedDate)
      return parsedDatetime < new Date()
    },
  }
}
</script>

<style scoped>

</style>