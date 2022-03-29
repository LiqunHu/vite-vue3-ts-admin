<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      router
    >
      <template v-for="(item, i) in userInfo.menulist">
        <template v-if="item.sub_menu">
          <el-sub-menu :index="i + ''">
            <template #title>
              <i :class="item.menu_icon" style="margin-right: 5px"></i>
              <span>{{ item.menu_name }}</span>
            </template>
            <template v-for="(subItem, j) in item.sub_menu">
              <template v-if="subItem.sub_menu">
                <el-sub-menu :index="i + '_' + j">
                  <template #title>{{ subItem.menu_name }}</template>
                  <el-menu-item
                    v-for="(threeItem, k) in subItem.sub_menu"
                    :index="subItem.menu_path"
                  >
                    {{ threeItem.menu_name }}</el-menu-item
                  >
                </el-sub-menu>
              </template>
              <template v-else>
                <el-menu-item
                  :index="subItem.menu_path"
                  >{{ subItem.menu_name }}
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="i + ''">
            <i :class="item.icon"></i>
            <template #title>{{ item.menu_name }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const { state } = useStore()
const userInfo = computed(() => state.access.userInfo)

const items = [
  {
    icon: 'el-icon-lx-home',
    index: '/dashboard',
    title: '系统首页',
  },
  {
    icon: 'el-icon-lx-cascades',
    index: '/table',
    title: '基础表格',
  },
  {
    icon: 'el-icon-lx-copy',
    index: '/tabs',
    title: 'tab选项卡',
  },
  {
    icon: 'el-icon-lx-calendar',
    index: '3',
    title: '表单相关',
    subs: [
      {
        index: '/form',
        title: '基本表单',
      },
      {
        index: '/upload',
        title: '文件上传',
      },
      {
        index: '4',
        title: '三级菜单',
        subs: [
          {
            index: '/editor',
            title: '富文本编辑器',
          },
        ],
      },
    ],
  },
  {
    icon: 'el-icon-lx-emoji',
    index: '/icon',
    title: '自定义图标',
  },
  {
    icon: 'el-icon-pie-chart',
    index: '/charts',
    title: 'schart图表',
  },
  {
    icon: 'el-icon-lx-global',
    index: '/i18n',
    title: '国际化功能',
  },
  {
    icon: 'el-icon-lx-warn',
    index: '7',
    title: '错误处理',
    subs: [
      {
        index: '/permission',
        title: '权限测试',
      },
      {
        index: '/404',
        title: '404页面',
      },
    ],
  },
  {
    icon: 'el-icon-lx-redpacket_fill',
    index: '/donate',
    title: '支持作者',
  },
]

const route = useRoute()

const onRoutes = computed(() => {
  console.log(route)
  return route.path
})
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
