<template>
  <div>
    <el-container>
      <el-header style="padding: 0px; height:auto"><v-header /></el-header>
      <el-container style="height:100%">
        <el-aside><v-sidebar /></el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import vHeader from '@/components/Dashboard/Header.vue'
import vSidebar from '@/components/Dashboard/Sidebar.vue'
</script>
