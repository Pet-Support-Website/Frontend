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
    <div class="row" style="margin-bottom: 50px">
      <div class="col">
        <form class="input-container" @submit.prevent="diagnosis">
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
          <BaseSelect :options="sexOption" v-model="querys.sex" label="Sex" />
          <br />
          <BaseSelect
            :options="symtomsOption"
            v-model="querys.symtoms"
            label="Symptoms & behaviors"
          />
          <br />
          <div class="wrap-collabsible">
            <input id="collapsible" class="toggle" type="checkbox" />
            <label for="collapsible" class="lbl-toggle">Additional Info</label>
            <div class="collapsible-content">
              <div class="content-inner">
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    padding-bottom: 35px;
                  "
                >
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
                </div>
              </div>
            </div>
          </div>
          <br />
          <input class="about-btn" type="submit" value="Submit" />
        </form>
      </div>
      <div class="col in-container">
        <a>RESULTS</a>
        <div class="output">
          <div v-for="result in output" :key="result.score">
            <a
              style="text-decoration: none; color: darkslategray"
              :href="result.url"
              ><div class="diagnose-card">
                <h4
                  style="
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 20px;
                  "
                >
                  {{ result.title }}
                </h4>
              </div></a
            >
          </div>
        </div>
      </div>
    </div>
    <br />
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

.diagnose-card {
  border: 1px rgb(175, 174, 174) solid;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 10px;
  margin-bottom: 10px;
}

.diagnose-card:hover {
  background-color: rgba(243, 243, 243, 0.878);
}

.about-btn {
  margin-top: 10px;
  color: white;
  background-color: #1fdda4;
  padding: 10px 50px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}

.about-btn:hover {
  background-color: #1bbf8c;
}

.input-container {
  border-radius: 5px;
  border: 1px lightgray solid;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 246, 246, 0.945);
  padding: 20px 40px 35px;
}

.in-container {
  border-radius: 5px;
  border: 1px lightgray solid;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 35px;
  background-image: url('../assets/pet-support-3.png');
  background-repeat: no-repeat;
  background-position: center;
}

.wrap-collabsible {
  margin-bottom: 1.2rem 0;
}

input[type='checkbox'] {
  display: none;
}

.lbl-toggle {
  display: block;

  font-weight: bold;
  font-family: monospace;
  font-size: 1.2rem;
  text-transform: uppercase;
  text-align: center;

  padding: 1rem;

  color: #1fdda4;
  background-color: white;
  border: 1px rgb(175, 174, 174) solid;

  cursor: pointer;

  border-radius: 7px;
  transition: all 0.25s ease-out;
}

.lbl-toggle:hover {
  color: #1bbf8c;
  background-color: rgba(243, 243, 243, 0.878);
}

.lbl-toggle::before {
  content: ' ';
  display: inline-block;

  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid currentColor;
  vertical-align: middle;
  margin-right: 0.7rem;
  transform: translateY(-2px);

  transition: transform 0.2s ease-out;
}

.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}

.collapsible-content {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
}

.toggle:checked + .lbl-toggle + .collapsible-content {
  max-height: 100vh;
}

.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.collapsible-content .content-inner {
  border: 1px solid rgb(175, 174, 174);
  border-top-color: white;
  background-color: white;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  padding: 0.5rem 1rem;
}
</style>
