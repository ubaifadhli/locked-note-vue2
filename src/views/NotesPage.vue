<template>
  <div class="dashboard">
    <navigation-bar />

    <c-box maxW="100vw" w="xl" p="6" mx="auto">
      <c-flex align="center" justify="space-between">
        <c-heading py="8" size="xl">Notes</c-heading>
        <c-button left-icon="add" @click="openNewNoteModal" variant-color="blue">New note</c-button>
      </c-flex>


      <NoteList v-for="note in notes" :key="note.id" :note="note"  />

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
            <c-button variant-color="green" @click="showDate" mx="2">Create</c-button>
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
      },

      notes: [
        {
          id: '1',
          name: 'File A',
          unlockedDate: 'June 5, 2021',
        },
        {
          id: '2',
          name: 'File B',
          unlockedDate: 'June 10, 2021',
        },
        {
          id: '3',
          name: 'File C',
          unlockedDate: 'June 12, 2021',
        },
        {
          id: '4',
          name: 'File D',
          unlockedDate: 'June 20, 2021',
        },
      ]
    }
  },

  methods: {
    openNewNoteModal() {
      this.elementState.isNewNoteModalOpen = true
      this.newNote.pickedDate = null
    },
    closeNewNoteModal() {
      this.elementState.isNewNoteModalOpen = false
      this.newNote.pickedDate = null
    },

    showDate() {
      console.log(this.newNote.pickedDate)
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
    }

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