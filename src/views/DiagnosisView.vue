<template>
  <div class="container">
    <div class="header">
      <h1 style="color: darkslategray">
        PET
        <a style="color: #1fdda4">DIAGNOSIS</a>
      </h1>
      <p style="margin-top: 15px">
        An explanation on what is the Diagnosis system and how it works.
      </p>
    </div>
    <form @submit.prevent="diagnosis">
      <BaseSelect
        :options="petTypes"
        v-model="querys.petType"
        label="Type of your pet"
      />
      <br />
      <BaseInput v-model="querys.species" type="text" label="Species" />
      <br />
      <BaseInput v-model="querys.age" type="text" label="Age" />
      <br />
      <BaseInput
        v-model="querys.weight"
        type="text"
        label="Weight"
        optional="true"
      />
      <br />
      <BaseInput
        v-model="querys.height"
        type="text"
        label="Height"
        optional="true"
      />
      <br />
      <BaseSelect :options="sexOption" v-model="querys.sex" label="Sex" />
      <br />
      <BaseSelect
        :options="symtomsOption"
        v-model="querys.symtoms"
        label="Symptoms & behaviors"
      />
      <br />
      <BaseSelect
        :options="booleanOption"
        v-model="querys.castration"
        label="Castration & Neutering status"
        optional="true"
      />
      <br />
      <BaseInput
        v-model="querys.occurringAllergies"
        type="text"
        label=" Occurring Allergies"
        optional="true"
      />
      <br />
      <BaseInput
        v-model="querys.occurringDisease"
        type="text"
        label="Occurring disease and conditions"
        optional="true"
      />
      <br />
      <input type="submit" value="submit" />
    </form>
    {{ querys }}
    <div class="output">
      <div v-for="result in output" :key="result.score">
        {{ result.title }}
        {{ result.url }}
      </div>

      <!-- {{ output }} -->
    </div>
  </div>
</template>
<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import DiagnosisService from '@/services/DiagnosisService'
export default {
  components: {
    BaseInput,
    BaseSelect
  },
  data() {
    return {
      querys: {
        petType: '',
        species: '',
        age: '',
        weight: '',
        height: '',
        sex: '',
        symtoms: '',
        castration: '',
        occurringAllergies: '',
        occurringDisease: ''
      },
      petTypes: ['dog', 'cat', 'bird', 'rabbit'],
      sexOption: ['male', 'female', 'unknown'],
      symtomsOption: ['vomiting', 'agression', 'anxiety'],
      booleanOption: ['yes', 'no'],
      output: null
    }
  },
  methods: {
    diagnosis() {
      let query = this.querys.petType + ' ' + this.querys.symtoms
      DiagnosisService.diagnosisSearch(query)
        .then((response) => {
          this.output = response.data.results
          console.log(this.output)
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: 'Network Error',
              params: { resource: 'tag' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    }
  }
}
</script>
<style scoped>
.header {
  margin-top: 50px;
}
</style>
