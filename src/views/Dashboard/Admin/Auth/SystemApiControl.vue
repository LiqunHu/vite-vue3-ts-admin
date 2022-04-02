<template>
  <panel title="">
    <template v-slot:beforeBody>
      <div class="panel-toolbar">
        <el-row>
          <el-button type="primary">增加目录</el-button>
          <el-button type="primary">增加菜单</el-button>
          <el-button type="primary">编辑</el-button>
        </el-row>
      </div>
    </template>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :show-checkbox="false"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="handleCheckChange"
    />
  </panel>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import http from '@/lib/http'
import common from '@/lib/common'
const apiUrl = '/v1/api/node/admin/auth/SystemApiControl/'
let pagePara = ref(),
  treeData = ref(),
  actNode = ref()

const defaultProps = {
  id: 'systemmenu_id',
  label: 'name',
  children: 'children',
}

const initPage = async () => {
  try {
    let response = await http.POST(apiUrl + 'init', {})
    pagePara.value = JSON.parse(JSON.stringify(response.data.info))
    await getTreeData()
  } catch (error) {
    common.commonFault(error)
  }
}

const getTreeData = async () => {
  let response = await http.POST(apiUrl + 'search', {})
  treeData.value = response.data.info
}

const handleCheckChange = (
  data: any,
  checked: boolean,
  indeterminate: boolean
) => {
  actNode.value = data
}
initPage()
</script>
<style scoped></style>
