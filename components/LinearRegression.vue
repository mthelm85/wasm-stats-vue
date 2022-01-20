<template>
    <v-card>
        <v-card-title>
            Define your model
        </v-card-title>
        <v-card-subtitle>
            <span v-if="!contents">
                Start by loading a CSV file with the menu on the left
            </span>
            Select from the available data elements to build your model
            <v-chip
                class="ma-2"
                color="orange"
                text-color="white"
                >
                <v-icon left>
                    mdi-star
                </v-icon>
                Important: The first element selected should be the dependent variable
            </v-chip>
        </v-card-subtitle>
        <v-card-text>
            <v-textarea
                readonly
                dense
                rounded
                filled
                v-model="userFormula"
                :auto-grow="true"
            >
            </v-textarea>
        <v-row>
            <v-col>
                <v-btn :disabled="!(selectedElements.length > 1)" color="primary" @click="estimate">Estimate Coefficients</v-btn>
            </v-col>
            <v-col>
                <v-expansion-panels :disabled="!coefs" hover flat>
                    <v-expansion-panel>
                    <v-expansion-panel-header>
                        Model Details
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        </v-card-text>
            <div v-if="contents" class="ml-2">
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
                <v-chip-group
                    active-class="primary--text"
                    column
                    class="ma-2"
                    v-model="selectedElements"
                    multiple
                >
                <v-chip
                v-for="tag in tags"
                :key="tag"
                :value="tag"
                @click="clear"
                >
                {{ tag }}
                </v-chip>
             </v-chip-group>
            </div>
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
    </v-card>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'LinearRegression',

data: () => ({
        coefs: null,
        formulaWithCoefs: null,
        selectedElements: [],
        wasm: null
    }),

async created () {
    let wasm = await import('wasm-stats')
    this.wasm = wasm
},

computed: {
    contents () {
        let contents = this.$store.state.fileUpload.contents
        return contents ? contents : null
    },

    loading () {
        return this.$store.state.loadingData
    },

    tags () {
        return this.contents ? this.contents[0] : []
    },

    userFormula () {
        if (this.formulaWithCoefs) {
            return this.formulaWithCoefs
        } else {
            let lhs = `${this.selectedElements[0]} =`
            let rhs = this.selectedElements.slice(1, this.selectedElements.length).join(' + ')
            return this.selectedElements.length > 0 ? `${lhs} ${rhs}` : null
        }

    }
},

methods: {
    ...mapMutations({
        toggleLoadingData: 'toggleLoadingData'
    }),

    clear () {
        this.formulaWithCoefs = null
        this.coefs = null
    },

    estimate () {
        this.formulaWithCoefs = null
        let idxs = []
        for (let i = 0; i < this.selectedElements.length; i++) {
            idxs.push(this.contents[0].indexOf(this.selectedElements[i]))
        }
        let res = this.wasm.lin_reg_qr(this.contents.slice(1, this.contents.length), idxs)
        this.coefs = res
        console.log(this.coefs)
        let formulaParts = [this.selectedElements[0], this.coefs[0]]
        for (let i = 1; i < this.coefs.length; i++) {
            formulaParts.push(this.coefs[i])
            formulaParts.push(this.selectedElements[i])
        }
        let formulaStart = `${formulaParts[0]} = ${Number.parseFloat(formulaParts[1]).toPrecision(3)} + `
        let formulaEnd = formulaParts.slice(2, formulaParts.length)
            .map(el => typeof el == 'number' ? Number.parseFloat(el).toPrecision(3) : el)
            .reduce((p,c,i) => p + (i % 2 == 1 ? '' : ' + ') + c)
        this.formulaWithCoefs = formulaStart + formulaEnd
    }
}
}
</script>