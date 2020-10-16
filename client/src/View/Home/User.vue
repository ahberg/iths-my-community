<template lang="html">
  <div class="UserHomeContainer">
    <ErrorMessageBar :text="errorMessage" v-if="errorMessage"/>
    <div class="UserHomeWrapper">
      <div class="LeftSideContainer">
        <div class="ProfileCardContainer" v-if="user">
          <div tag="div" :to="{name: 'PersonPosts', params: {PersonAccount: userAccount}}" class="ProfileWallImg" :style="`background-image: url(${userWallImg})`"></div>
          <div class="ProfileContentContainer">
            <img :src="userImg" class="ProfileUserImg">
            <div class="ProfileName">
             {{userName}}
            </div>
            <div class="ProfileAccount">
                @{{userAccount}}
            </div>
            <div class="ProfileBio">
             <p> {{userBio}}</p>
            </div>
            <div class="ProfileInfo">
              <div class="ProfilePosts">
                <div class="Title">
                  <span>Total Posts</span>
                </div>
                <div class="Count">
                  <span>{{userPostsCount}}</span>
                </div>
              </div>
              <div class="ProfileFollowing">
                <div class="Title">
                  <span>Following</span>
                </div>
                <div class="Count">
                  <span>{{userFollowingCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="RightSideContainer">
        <LoadingAnimationComponent :class="{loadingAnimation: true, loaded: postLoaded}" />
        <PostCreaterComponent @newPost="newPostEventHandler"/>
        <PostsBoxComponent :posts="posts" detailPostRouteName="UserDetailPostInfo" @deletePost="deletePostEventHandler" v-if="postLoaded"/>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfoAPI from '@/API/User/Info'
import PostCreaterComponent from '@/components/Post/PostCreater'
import PostsBoxComponent from '@/components/Post/PostsBox'
import LoadingAnimationComponent from '@/components/Animate/Loading'
import ErrorMessageBar from '@/components/Bar/ErrorMessageBar'

export default {
  name: 'UserHome',
  components: {
    PostCreaterComponent,
    PostsBoxComponent,
    LoadingAnimationComponent,
    ErrorMessageBar
  },
  data () {
    return {
      user: null,
      posts: [],
      userLoaded: false,
      postLoaded: false,
      errorMessage: ''
    }
  },
  computed: {
    userName: function () {
      return this.user ? this.user.name : ''
    },
    userAccount: function () {
      return this.user ? this.user.username : ''
    },
    userImg: function () {
      return this.user ? this.user.profileImg : ''
    },
    userBio: function () {
      return this.user ? this.user.bio : ''
    },
    userWallImg: function () {
      return '/static/img/default-user-bkg-img.jpg'
    },
    userPostsCount: function () {
      return this.user ? this.user.posts.length : 0
    },
    userFollowingCount: function () {
      return this.user ? this.user.following.length : 0
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPosts()
  },
  methods: {
    getUserInfo: async function () {
      this.userLoaded = false
      this.user = null

      let res = await UserInfoAPI.getBasicInfo()
      this.userLoaded = true

      if (!res.success) {
        return
      }

      this.user = res.user
      document.title = `${this.user.name} (@${this.user.username})`
    },
    getPosts: async function () {
      this.postLoaded = false
      this.posts = []

      let res = await UserInfoAPI.getPosts()
      this.postLoaded = true

      if (!res.success) {
        this.errorMessage = res.errMsg
        return
      }

      this.posts = res.posts
    },
    newPostEventHandler (newPost) {
      this.posts.unshift(newPost)
    },
    deletePostEventHandler (id) {
      let removeIndex = this.posts.map(item => item.id).indexOf(id)
      this.posts.splice(removeIndex, 1)
    }
  }
}
</script>

<style lang="css" scoped>
.UserHomeContainer {
  margin-top: 46px;
  min-height: calc(100vh - 46px);
  background-color: #e6ecf0;
}

.UserHomeWrapper {
  max-width: 890px;
  margin: 0 auto;
  padding: 8px 14px 15px;
  display: flex;
}

.ProfileCardContainer {
  position: relative;
  background-color: white;
}

.LeftSideContainer {
    width: 290px;
    position: fixed;
}

.ProfileWallImg {
  height: 95px;
  background-position: center;
  background-size: cover;
}

.ProfileUserImg {
  border-radius: 50%;
  height: 72px;
  width: 72px;
  border: 2px solid #fff;
  box-sizing: border-box;
  overflow: hidden;
  color: #fff;
  margin: -30px 0 0 8px;
}

.ProfileName {
  position: absolute;
  top: 103px;
  left: 90px;
  width: 185px;
  font-weight: bold;
  font-size: 18px;
}

.ProfileAccount {
  position: absolute;
  top: 130px;
  left: 90px;
  width: 185px;
  font-size: 12px;
  color: #66757f;
}

.ProfileBio p {
  padding-left: 16px;
  padding-top: 8px;
  color:#66757f;

}

.ProfileInfo {
  padding: 16px;
  display: flex;
}

.ProfilePosts,
.ProfileFollowing {
  width: 50%;
  font-size: 12px;
  font-weight: bold;
  color: #657786;
}

.Count {
  color: #1DA1F2;
  font-size: 18px;
  font-weight: bold;
  padding-top: 3px;
}

.RightSideContainer {
  margin-left: 12px;
  width: calc(100% - 300px);
  margin-left: auto;
}

.loadingAnimation {
  height: 100px;
  overflow: hidden;
  transition: 1s;
  display: flex;
  align-items: center;
}

.loadingAnimation.loaded {
  height: 0;
}
</style>
