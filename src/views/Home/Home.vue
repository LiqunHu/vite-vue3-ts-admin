<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <panel title="维护">
    <template slot="beforeBody">
      111111
    </template>
    <img alt="Vue logo" src="../../../assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </panel>
</template>

<style></style>
