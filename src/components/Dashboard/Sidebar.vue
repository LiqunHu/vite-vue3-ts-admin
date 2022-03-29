<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :default-openeds="['0']"
      :unique-opened="true"
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
                <el-menu-item :index="subItem.menu_path"
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
import { computed } from 'vue'
import { useStore } from 'vuex'

const { state } = useStore()
const userInfo = computed(() => state.access.userInfo)
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
