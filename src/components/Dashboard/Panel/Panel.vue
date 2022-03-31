<template>
  <div class="panel">
    <div class="panel-heading">
      <slot name="header"></slot>
      <h4 class="panel-title" v-if="!hasHeaderSlot">
        {{ title }}
      </h4>
    </div>
    <slot name="beforeBody"></slot>
    <div class="panel-body" v-if="!noBody" :class="bodyClass">
      <slot></slot>
    </div>
    <slot v-else></slot>
    <slot name="outsideBody"></slot>
    <div class="panel-footer" v-if="hasFooterSlot" v-bind:class="footerClass">
      <slot name="footer"></slot>
    </div>
    <slot name="afterFooter"></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Panel',
}
</script>

<script setup lang="ts">
import { toRefs, useSlots } from 'vue'
const props = defineProps({
  title: String,
  noBody: Boolean,
  noButton: Boolean,
  bodyClass: String,
  footerClass: String,
  panelClass: String,
})
const { title, noBody, bodyClass, footerClass, panelClass } = toRefs(props)
const hasHeaderSlot = !!useSlots().header
const hasFooterSlot = !!useSlots().footer
</script>
<style scoped>
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 3px;
}
.panel-heading {
  padding: 10px 15px;
  border: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background: #242a30;
}
.panel-title {
  line-height: 20px;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
  color: inherit;
}

.panel-body {
  padding: 15px;
}
</style>
