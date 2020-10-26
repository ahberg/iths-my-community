<template lang="html">
  <div class="Post" >
    <div class="LeftSide">
      <div class="ProfileImg">
        <img :src="post.author.profileImg" alt="">
      </div>
    </div>
    <div class="RightSide">
      <div class="Info">
        <div v-if="isCurrentProfile()" >
          <router-link tag="div" :to="{ name: 'UserProfile', params: {Username:authorUser.username} }" v-if="!isAuthor(post.author)" class="UserName">
            {{ authorUser.name }}
          </router-link>
          <div v-else class="UserName"> {{this.$store.state.Auth.user.name }} </div>
          </div>
          <div class="Date">{{RegPostDate(post.createdAt)}}</div>
        </div>
      <div class="Content" v-html="post.content"></div>
      <div class="OperationBtns" v-if="isAuthor(post.author)">
          <div class="DeleteBtn Btn" >
          <span class="BtnWrapper" @click.stop="deletePost(post.id)">
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import postAPI from '@/API/Post'

export default {
  name: 'PostItem',
  props: ['post', 'detailPostRouteName'],
  components: {},
  data () {
    return {
      likes: [],
      showReplyBox: false,
      authorUser: this.$store.state.Auth.user.following.find(
        (a) => a.id === this.post.author
      )
    }
  },
  computed: {
    RegPostDate: function () {
      return (date) => moment(date).format('YYYY-MM-DD H:mm')
    }
  },
  methods: {
    async toggleLike (postId) {
      let res = await postAPI.ToggleLike(postId)

      if (res.result) {
        this.likes = res.likes
      }
    },
    async deletePost (postId) {
      let res = await postAPI.DeletePost(postId)
      if (res.success) {
        this.$emit('deletePost', postId)
      }
    },
    openReplyBox () {
      if (!this.$store.getters.isLogin) {
        return this.$router.push({
          name: 'login'
        })
      }

      this.showReplyBox = true
    },
    replySuccessEventHandler (comments) {
      this.comments = comments
    },
    isAuthor: function (postId) {
      if (postId === this.$store.getters.userID) {
        return true
      }
      return false
    },
    isCurrentProfile () {
      if (this.$route.name === 'UserProfile') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="css" scoped>
.Post {
  border-bottom: 1px solid #e6ecf0;
  cursor: pointer;
  display: flex;
  background-color: white;
}

.Post:hover {
  background-color: #f5f8fa;
}

.Post .LeftSide {
  width: 48px;
  margin-right: 10px;
  flex-shrink: 0;
}

.Post .ProfileImg {
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.Post .ProfileImg img {
  width: 100%;
}

.Post .RightSide {
  flex-grow: 1;
}

.Post .Info {
  display: flex;
}

.Post .Info .Name {
  word-break: break-all;
  font-size: 14px;
  font-weight: bold;
}

.Post .Info .UserName,
.Post .Info .Date {
  color: #657786;
  font-size: 14px;
  margin-right: 5px;
}


.Post .Content {
  font-size: 14px;
  line-height: 20px;
}

.Post .OperationBtns {
  display: flex;
  margin: 10px 0 2px;
}

.Post .OperationBtns .Btn {
  min-width: 60px;
  font-size: 16px;
  display: flex;
}

.Post .OperationBtns .Count {
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
  line-height: 1.35;
}

.Post .BtnWrapper {
  display: flex;
}

.Post .ReplyBtn:hover {
  color: #1da1f2;
}

.Post .LikeBtn:hover,
.Post .LikeBtn[isLiked="true"] {
  color: #e0245e;
}
</style>
