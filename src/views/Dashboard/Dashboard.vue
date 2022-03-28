<template>
  <div>
    <el-container>
      <el-header style="padding: 0px; height:auto"><v-header /></el-header>
      <el-container>
        <el-aside>ASIDE</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import vHeader from '@/components/Dashboard/Header.vue'
</script>
