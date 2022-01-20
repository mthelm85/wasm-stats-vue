<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
    <v-card light>
        <v-card-title>
            File Size Alert
        </v-card-title>
        <v-card-text>
            The file you are uploading is {{ Math.round(size) }} MB. Please ensure that
            the file contains only the necessary data elements in order to reduce its size
            as much as possible. Large files may cause your browser to crash 💥
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            @click="toggleFileSizeAlert"
          >
            Continue Loading
          </v-btn>
          <v-btn
            color="red"
            @click="abort = true"
          >Abort</v-btn>
        </v-card-actions>
    </v-card>
      
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data: () => ({
        abort: false
    }),
    computed: {
        show () {
            return this.abort ? false : this.$store.state.fileUpload.fileSizeAlert
        },

        size () {
            return this.$store.state.fileUpload.fileSize
        }
    },

    methods: {
        toggleFileSizeAlert () {
            this.$store.commit('fileUpload/toggleFileSizeAlert')
        }
    }
  }
</script>