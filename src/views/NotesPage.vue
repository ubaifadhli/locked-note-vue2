<template>
  <div class="dashboard">
    <navigation-bar />

    <c-box maxW="100vw" w="xl" p="6" mx="auto">
      <c-flex align="center" justify="space-between">
        <c-heading py="8" size="xl">Notes</c-heading>
        <c-button left-icon="add" @click="openNewNoteModal" variant-color="blue">New note</c-button>
      </c-flex>

      <c-flex v-if="elementState.isFetchingNotes" justify="center">
        <c-spinner
            thickness="4px"
            speed="0.65s"
            empty-color="blue.200"
            color="blue.500"
            size="xl"
        />
      </c-flex>

      <NoteList v-else v-for="note in notes" :key="note.id" :note="note" @delete:note="deleteNote"  />

      <c-modal
          size="sm"
          :is-open="elementState.isNewNoteModalOpen"
          :on-close="closeNewNoteModal"
          :closeOnOverlayClick="false"
          :closeOnEsc="false"
      >
        <c-modal-content pb="4">
          <c-modal-header>New Note</c-modal-header>
          <c-modal-close-button />
          <c-modal-body >

            <c-form-control is-required>
              <c-form-label for="notename">Name</c-form-label>
              <c-input id="notename" v-model="newNote.name" placeholder="Note name" mb="2" />

              <c-form-label for="password">Password</c-form-label>
              <c-flex align="center" direction="horizontal" mb="2">
                <c-input id="password" v-model="newNote.password" placeholder="Password" />
                <c-button ml="4" @click="generatePassword">Generate</c-button>
              </c-flex>

              <c-form-label>Unlock datetime</c-form-label>
            </c-form-control>

            <date-picker
                v-model="newNote.pickedDate"
                type="datetime"
                :disabled-date="notBeforeCurrentDate"
                :disabled-time="notBeforeCurrentTime"
                placeholder="Select date range" />

          </c-modal-body>
          <c-modal-footer>
            <c-button variant-color="green" @click="createNote" mx="2">Create</c-button>
            <c-button @click="closeNewNoteModal" >Cancel</c-button>
          </c-modal-footer>
        </c-modal-content>
        <c-modal-overlay />
      </c-modal>

    </c-box>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import NoteList from "@/components/Note";
import DatePicker from 'vue2-datepicker';
import {
  CHeading,
  CBox,
  CFlex,
  CButton,
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalCloseButton,
  CFormControl,
  CFormLabel,
  CInput,
  CSpinner,
} from "@chakra-ui/vue";

export default {
  name: "NotesPage",
  components: {
    DatePicker,
    NavigationBar,
    CHeading,
    CBox,
    CFlex,
    CButton,
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalCloseButton,
    CFormControl,
    CFormLabel,
    CInput,
    CSpinner,
    NoteList,
  },
  data() {
    return {
      newNote: {
        name: "",
        password: "",
        pickedDate: "",
      },

      elementState: {
        isNewNoteModalOpen: false,
        isFetchingNotes: false,
        isCreatingNote: false,
      },

      notes: []
    }
  },

  mounted() {
    this.getNotes()
  },

  methods: {
    openNewNoteModal() {
      this.elementState.isNewNoteModalOpen = true
      this.newNote.pickedDate = null
      this.newNote.name = null
      this.newNote.password = null
    },
    closeNewNoteModal() {
      this.elementState.isNewNoteModalOpen = false
      this.newNote.pickedDate = null
      this.newNote.name = null
      this.newNote.password = null
    },

    createNote() {
      this.elementState.isCreatingNote = true

      this.axios
          .post('https://locked-note-spring.herokuapp.com/api/v1/notes/', {
            'name': this.newNote.name,
            'password': this.newNote.password,
            'unlockedDate': Date.parse(this.newNote.pickedDate)
          })
          .then(response => {
            console.log(response.data)
            this.notes.push(response.data)
            this.showDetailToast(
                'Note Created.',
                'Your note has been created.',
                'success'
            )
          })
          .catch(error => {
            console.log(error)
            this.showDetailToast(
                'Failed to Create Note.',
                'Unable to create note. Please try again.',
                'error'
            )
          })
          .finally(() => {
            this.elementState.isCreatingNote = false
            this.closeNewNoteModal()
          })

    },

    notBeforeCurrentDate(date) {
      return date < new Date().setHours(0, 0, 0, 0)
    },

    notBeforeCurrentTime(date) {
      return date < new Date()
    },

    generatePassword() {
      const bottomThreshold = 33
      const upperThreshold = 126
      const characterLimit = 12

      let generatedPassword = ""

      for (var i = 0; i < characterLimit; i++) {
        const charAscii = Math.floor(Math.random() * (upperThreshold - bottomThreshold)) + bottomThreshold
        generatedPassword += String.fromCharCode(charAscii)
      }

      console.log(generatedPassword)

      this.newNote.password = generatedPassword

      console.log(this.newNote.password)
    },

    async getNotes() {
      this.elementState.isFetchingNotes = true

      this.axios
          .get('https://locked-note-spring.herokuapp.com/api/v1/notes/')
          .then(response => {
            console.log(response.data)
            this.notes = response.data
          })
          .catch(error => console.log(error))
          .finally(() => this.elementState.isFetchingNotes = false)
    },

    deleteNote(noteId) {
      const noteIndex = this.notes.findIndex(note => note.id === noteId)
      this.notes.splice(noteIndex, 1)
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
    hasUserPickedDate() {
      return this.newNote.pickedDate !== null
    },


  }
}
</script>

<style scoped>
.dashboard {
  background-color: #EDF2F7;
}
</style>