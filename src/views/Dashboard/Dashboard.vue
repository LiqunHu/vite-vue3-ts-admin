<template>
  <div>
    <el-container>
      <el-header :height="'60'" style="padding: 0px; height:auto"><v-header /></el-header>
      <el-container>
        <el-aside :width="'200'" style="height: calc(100vh - 60px)"><v-sidebar /></el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import vHeader from '@/components/Dashboard/Header.vue'
import vSidebar from '@/components/Dashboard/Sidebar.vue'
</script>
