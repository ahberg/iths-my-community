<template lang="html">
  <div class="ItemContainer" v-if="person">
    <div class="Item">
      <div class="BkgWall" :style="`background-image: url(${person.userImg})`"></div>
      <div class="Content">
        <div class="ProfileImg">
          <img :src="person.profileImg" alt="">
        </div>
        <div class="Btn">
        </div>
        <div class="ProfileInfo">
          <div class="Name">
            <router-link :to="`/profile/${person.username}`">
              {{person.name}}
            </router-link>
          </div>
          <div class="ID">
            @{{person.username}}
          </div>
          <div class="Bio">
            {{person.bio}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PeopleItem',
  props: ['person'],
  components: {
  }
}
</script>

<style lang="css" scoped>
.ItemContainer {
  padding: 0 5px;
  margin-bottom: 10px;
}

.Item {
  background-color: white;
}

.BkgWall {
  height: 90px;
  background-color: #dfdfdf;
  background-position: center;
  background-size: cover;
}

.Btn {
 display: flex;
 height: 33px;
}

.Content {
  padding: 13px 15px;
}

.ProfileImg {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: black;
  overflow: hidden;
  margin: -45px 2px 0 -3px;
  border: 3px solid white;
}

.ProfileImg img {
  position: relative;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ProfileInfo {
    margin-top: 8px;
    letter-spacing: 0.03em;
}

.Name {
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.ID {
  color: #66757f;
  font-size: 14px;
  font-weight: normal;
}

.Des {
  height: 125px;
}
</style>
