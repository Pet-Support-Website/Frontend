<template>
  <div class="container">
    <div class="header">
      <h1 style="color: darkslategray">
        ADMINISTRATOR
        <a style="color: #1fdda4">LOGIN</a>
      </h1>
      <p style="margin-top: 15px">
        Data management system for Administrators only.
      </p>
    </div>
    <div class="card card-container">
      <div class="row">
        <div
          class="col-5"
          style="
            border-right: lightgray 1px solid;
            border-radius: 5px;
            padding: 10px 50px;
          "
        >
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <Form @submit="handleLogin" :validation-schema="schema">
            <div class="form-group">
              <label for="username">Username</label>
              <Field
                v-model="username"
                name="username"
                type="text"
                class="form-control"
              />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <Field
                v-model="password"
                name="password"
                type="password"
                class="form-control"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group">
              <button
                class="login-btn"
                :disabled="loading"
                @click="this.$store.dispatch('login')"
              >
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                />
                <span>Login</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ massage }}
              </div>
            </div>
          </Form>
        </div>
        <div class="col-7">
          <img class="image" src="@/assets/infographic1.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'LoginView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required('Username is required!'),
      password: yup.string().required('Password is required!')
    })
    return {
      loading: false,
      message: '',
      schema
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.username
      },
      set(input) {
        this.$store.commit('setUsernameInput', input)
      }
    },
    password: {
      get() {
        return this.$store.state.password
      },
      set(input) {
        this.$store.commit('setPasswordInput', input)
      }
    }
  }
}
</script>
<style scoped>
.header {
  margin-top: 50px;
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
}

label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 100%;
}
.card {
  background-color: white;
  width: 100%;
  padding: 30px 10px;
  margin: 0 auto;
  margin-bottom: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 5px;
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.image {
  display: block;
  margin-left: 20px;
  margin-right: auto;
  margin-top: 30px;
  height: 38vh;
  width: auto;
}
.error-feedback {
  color: red;
}

.login-btn {
  margin-top: 20px;
  color: white;
  background-color: #1fdda4;
  padding: 10px 50px;
  width: 100%;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}
.login-btn:hover {
  background-color: #1bbf8c;
}
</style>
