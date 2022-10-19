<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          @click.prevent="register = false"
          :class="{ 'is-active': !register }">
          <a>Login</a>
        </li>
        <li @click.prevent="register = true" :class="{ 'is-active': register }">
          <a>Register</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div class="content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="credentials.email"
                  class="input"
                  type="email"
                  placeholder="Email input" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="credentials.password"
                  class="input"
                  type="email"
                  placeholder="Password" />
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <a class="button is-primary">{{ formTitle }}</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, reactive } from 'vue';

  const register = ref(false);
  const formTitle = computed(() => (register.value ? 'Register' : 'Login'));

  //credentials
  const credentials = reactive({
    email: '',
    password: '',
  });
  //submit
  function onSubmit() {
    if (!credentials.email || !credentials.password) {
      alert('Please enter email and password');
      return;
    }
    if (register.value) {
      console.log('Register', credentials.email);
    } else {
      console.log('Login', credentials.email);
    }
  }
</script>

<style>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
