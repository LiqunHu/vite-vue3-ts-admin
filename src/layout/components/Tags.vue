<template>
  <div class="tags">
    <div class="tags-body">
      <ul>
        <li
          class="tags-li"
          v-for="(item, index) in tagsList"
          :class="{ active: isActive(item.path) }"
          :key="index"
        >
          <router-link :to="item.path" class="tags-li-title">{{
            item.title
          }}</router-link>
          <span class="tags-li-icon" @click="closeTags(index)">
            <i class="fa-solid fa-xmark"></i>
          </span>
        </li>
      </ul>

      <div class="tags-close-box">
        <el-dropdown @command="handleTags">
          <el-button size="small" type="primary">
            标签选项
            <i class="m-l-5 fa-solid fa-angle-down"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu size="small">
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isActive = (path: string) => {
  return path === route.fullPath
}

const { state, commit } = useStore()
const tagsList = computed(() => state.dashboard.tagsList)

// 关闭单个标签
const closeTags = (index: number) => {
  const delItem = tagsList.value[index]
  commit('dashboard/delTagsItem', { index })
  const item = tagsList.value[index]
    ? tagsList.value[index]
    : tagsList.value[index - 1]
  if (item) {
    delItem.path === route.fullPath && router.push(item.path)
  } else {
    router.push('/dashboard/home')
  }
}

// 设置标签
const setTags = (route: any) => {
  const isExist = tagsList.value.some((item: any) => {
    return item.path === route.fullPath
  })
  if (!isExist) {
    if (tagsList.value.length >= 8) {
      commit('dashboard/delTagsItem', { index: 0 })
    }
    commit('dashboard/setTagsItem', {
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
    })
  }
}
setTags(route)
onBeforeRouteUpdate(to => {
  setTags(to)
})

// 关闭全部标签
const closeAll = () => {
  commit('dashboard/clearTags')
  router.push('/dashboard/home')
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item: any) => {
    return item.path === route.fullPath
  })
  commit('dashboard/closeTagsOther', curItem)
}
const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll()
}

// 关闭当前页面的标签页
// store.commit("closeCurrentTag", {
//     $router: router,
//     $route: route
// });
</script>

<style scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  padding: 2px 5px;
  box-shadow: 0 5px 10px #ddd;
}

.tags-body {
  width: 100%;
  height: 100%;
  background: #fff;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  background-color: #409eff;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 5px;
  top: 5px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  background: #fff;
  z-index: 10;
}
</style>
