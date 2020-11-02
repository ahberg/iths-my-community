<template lang="html">
  <div class="PostsBox">
    <transition-group  name="PostList" class="PostsContainer" tag="div" >
      <PostItemComponent class="PostItem" v-for="post in posts" :post="post" @deletePost="deletePost" :detailPostRouteName="detailPostRouteName" v-bind:key="post.id"/>
    </transition-group>
      <div class="NonPost" v-if="!posts.length">
        <!--<img src="/static/img/twitter-bird.png" alt="">-->
        <div class="txt">None post</div>
      </div>
  </div>
</template>

<script>
import PostItemComponent from '@/components/Post/PostItem'

export default {
  name: 'PostBox',
  components: {
    PostItemComponent
  },
  props: ['posts', 'detailPostRouteName'],
  methods: {
    async deletePost (postId) {
      this.$emit('deletePost', postId)
    }
  },
}
</script>

<style lang="css" scoped>
.PostsBox {
  background-color:#e6ecf0;

}

.NonPost {
  text-align: center;
  padding: 10px;
  font-size: 13px;
  color: #14171a;
}

.NonPost img {
  width: 30px;
  margin-bottom: 5px;

}


.PostItem {
  height: 100px;
  padding: 9px 12px;
}
.PostList-enter-active, .PostList-leave-active {
  transition: opacity 0.7s, padding 1s,height 1.5s;
}
.PostList-enter, .PostList-leave-to /* .list-leave-active below version 2.1.8 */ {
  height: 0;
  min-height: 0;
  padding: 0;
  opacity: 0;

}


</style>
