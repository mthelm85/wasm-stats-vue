<template>
    <v-card>
        <v-card-title>
            Metadata
        </v-card-title>
        <v-card-subtitle v-if="!contents">
            Start by loading a CSV file with the menu on the left
        </v-card-subtitle>
        <v-card-text>
            <v-chip
                class="ma-2"
                color="success"
                outlined
                >
                <v-icon left>
                    mdi-format-columns
                </v-icon>
                {{ numCols }} Columns
            </v-chip>
            <v-chip
                class="ma-2"
                color="success"
                outlined
                >
                <v-icon left>
                    mdi-table-row
                </v-icon>
                {{ numRows }} Rows
            </v-chip>
            <div class="my-6" v-if="contents.length > 0">
                <v-chip
                class="ma-2"
                color="purple"
                label
                text-color="white"
                >
                    <v-icon left>
                        mdi-label
                    </v-icon>
                    Data Elements
                </v-chip>
                <div>
                    <v-chip
                    v-for="tag in tags"
                    :key="tag"
                    class="ma-1"
                    >
                    {{ tag }}
                    </v-chip>
                </div>
            </div>
        </v-card-text>
        <v-overlay
          :absolute="true"
          :value="loading"
        >
            <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
        <DialogFileSize />
        <DialogDataTypes />
    </v-card>
</template>
<script>
export default {

name: 'Metadata',

data: () => ({

}),

computed: {
    contents () {
        return this.$store.state.fileUpload.contents
    },

    loading () {
        return this.$store.state.loadingData
    },

    numCols () {
        return this.contents.length > 0 ? this.contents[0].length : 0
    },

    numRows () {
        return this.contents.length > 0 ? this.contents.length : 0
    },

    tags () {
        return this.contents.length > 0 ? this.contents[0] : []
    }
}

}
</script>
