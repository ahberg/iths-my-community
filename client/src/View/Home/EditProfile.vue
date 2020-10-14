<template lang="html">
  <div id="EditProfile">
    <div class="RegistFormContainer">
      <div class="Wrapper">
        <div class="RegistText">
          <span>Edit profile</span>
        </div>
        <div class="ErrHint alert alert-danger" v-if="errHint">
          {{ errHint }}
        </div>
        <div class="RegistInput">
          <div class="name input">
            <input type="text" v-model="name" placeholder="Name">
            </div>
          <div class="password input">
            <input type="password" v-model="password" placeholder="password">
          </div>
           <div class="bio input">
            <textarea type="textarea" v-model="bio" placeholder="About you"></textarea>
          </div>
        </div>
        <div class="Submit">
          <button class="btn submit" type="button" @click="saveUser">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAction from '@/API/User/Action'

export default {
  name: 'EditProfile',
  data () {
    return {
      name: null,
      username: null,
      bio: null,
      user: {},
      password: null,
      errHint: ''
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    async saveUser () {
      let fields = {}
      if (this.name) {
        fields.name = this.name
      }
      if (this.password) {
        fields.password = this.password
      }
      if (this.bio) {
        fields.bio = this.bio
      }
      let res = await UserAction.updateUser(this.user.id, fields)

      
      this.errHint = res.message
      
    },
    async getUserData () {
      this.user = this.$store.state.Auth.user
      this.name = this.user.name
      this.bio = this.user.bio
    }

  }
}
</script>

<style lang="css" scoped>
#EditProfile {
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

.RegistInput .input {
  margin-bottom: 15px;
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

</style>
