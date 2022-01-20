<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
    <v-card light>
        <v-card-title>
            Data Type Alert
        </v-card-title>
        <v-card-text>
            The file you are uploading contains non-numeric values in the first 10 rows. Please ensure that
            the file contains only numeric values as non-numeric types (e.g. String) are not currently supported.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
            return this.abort ? false : this.$store.state.fileUpload.dataTypeAlert
        },
    },
  }
</script>