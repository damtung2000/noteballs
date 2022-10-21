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
                  type="password"
                  placeholder="Password" />
              </div>
              <p v-if="error" class="help is-danger">
                Password must be at least 6 characters
              </p>
            </div>
            <div class="field is-grouped is-grouped-right">
              <p v-if="!register" class="control">
                <button
                  @click.prevent="loginTestUser"
                  class="button is-primary">
                  Login with Test User
                </button>
              </p>
              <p class="control">
                <button class="button is-primary" type="sumbit">
                  {{ formTitle }}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, reactive, watch } from 'vue';
  import { useStoreAuth } from '@/stores/storeAuth';
  import {
    MINIMUM_PASSWORD_LENGTH,
    TEST_CREDENTIALS,
  } from '../helpers/constants';

  const error = ref(false);
  const register = ref(false);
  const formTitle = computed(() => (register.value ? 'Register' : 'Login'));

  //credentials
  const credentials = reactive({
    email: '',
    password: '',
  });

  const storeAuth = useStoreAuth();

  //submit
  function onSubmit() {
    if (!credentials.email || !credentials.password) {
      alert('Please enter email and password');
      return;
    }
    if (credentials.password.length < MINIMUM_PASSWORD_LENGTH) {
      error.value = true;
      return;
    }
    if (register.value) {
      storeAuth.registerUser(credentials);
    } else {
      storeAuth.loginUser(credentials);
    }
  }

  function loginTestUser() {
    const credentials = {
      email: TEST_CREDENTIALS.email,
      password: TEST_CREDENTIALS.password,
    };
    storeAuth.loginUser(credentials);
  }

  watch(credentials, () => {
    error.value = false;
  });
</script>

<style>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
