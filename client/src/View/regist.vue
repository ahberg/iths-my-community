<template lang="html">
  <div id="RegistPage">
    <div class="RegistFormContainer">
      <div class="Wrapper">
        <div class="RegistText">
          <span>Create account</span>
        </div>
        <div class="ErrHint alert alert-danger" v-if="errHint">
          {{ errHint }}
        </div>
        <div class="RegistInput">
          <div class="username">
            <input type="text" v-model="username" placeholder="username (only lowercase)">
          </div>
          <div class="name">
            <input type="text" v-model="name" placeholder="Name">
            </div>
          <div class="bio input">
            <textarea type="textarea" v-model="bio" placeholder="About you"></textarea>
          </div>
          <div class="password">
            <input type="password" v-model="password" placeholder="password">
          </div>
        </div>
        <div class="Submit">
          <button class="btn submit" type="button" @click="registEventHandler">Done</button>
        </div>
      </div>
    </div>
    <div class="LoginHint">
      <div class="Wrapper">
        <div class="hint">
          <span>Already registered ?</span>
          <router-link to="/login">sign in »</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistPage',
  data () {
    return {
      name: null,
      username: null,
      bio: null,
      password: null,
      password2: null,
      errHint: ''
    }
  },
  methods: {
    async registEventHandler () {
      let res = await this.$store.dispatch('regist', {
        name: this.name,
        username: this.username,
        bio: this.bio,
        password: this.password
      })
      if (res.success === false) {
        console.log(res,333)
        this.errHint = res.message
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="css" scoped>
#RegistPage {
  height: calc(100vh - 46px);
  margin-top: 46px;
  padding-top: 10px;
  background-color: #e6ecf0;
}

.RegistFormContainer {
  max-width: 840px;
  padding: 15px;
  margin: 0 auto;
}

.RegistFormContainer {
  background-color: white;
}

.Wrapper {
  max-width: 585px;
  padding: 0 10px;
  margin: 0 auto;
}

.RegistText {
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 20px;
}
.RegistInput textarea,
.RegistInput input {
  margin-bottom: 15px;
  width: 97%;
  max-width: 280px;
  padding: 4px;
  border: 1px solid #e6ecf0;
  border-radius: 3px;
  outline: none;
  font-size: 14px;
  line-height: 20px;
}

.RegistInput input:focus {
  outline: 0;
  color: #14171a;
  border-color: rgba(0,132,180,0.5);
}

.Submit {
  margin-top: 30px;
}

.Submit button {
  background-color: #1da1f2;
  border: 1px solid #1da1f2;
  color: #fff;
  border-radius: 100px;
  box-shadow: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}

.Submit button:hover {
  border-color: #1da1f2;
  background-color: #006dbf;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #71c9f8;
}

.LoginHint {
  padding: 20px 10px;
  background-color: #f5f8fa;
  font-size: 14px;
  line-height: 20px;
  color: #657786;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  max-width: 840px;
  margin: 0 auto;
}
</style>
