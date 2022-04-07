<template>
  <panel title="">
    <template #beforeBody>
      <div class="panel-toolbar">
        <el-row>
          <el-button type="primary" @click="addFolderModal">增加目录</el-button>
          <el-button type="primary">增加菜单</el-button>
          <el-button type="primary">编辑</el-button>
        </el-row>
      </div>
    </template>
    <div style="width:800px">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :show-checkbox="false"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleCheckChange"
      >
        <template #default="{ node, data }">
          <span class="tree-node">
            <span
              ><i class="m-r-5" :class="data.systemmenu_icon"></i
              >{{ node.label }}</span
            >
            <span v-if="data.systemmenu_id != 0">
              <i class="fa-solid fa-xmark" @click="removeNode(data)"></i>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </panel>
  <el-dialog v-model="modal.folderModal" title="目录" width="30%">
    <el-form
      ref="folderFormRef"
      :model="workPara"
      status-icon
      :rules="rules.folderRules"
      label-width="120px"
    >
      <el-form-item label="目录名称" prop="systemmenu_name">
        <el-input v-model="workPara.systemmenu_name" />
      </el-form-item>
      <el-form-item label="图标" prop="systemmenu_icon">
        <el-input v-model="workPara.systemmenu_icon"
          ><template #prepend>
            <i
              class="fa-solid fa-magnifying-glass"
              @click="modal.iconModal = true"
            ></i> </template
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modal.folderModal = false">取消</el-button>
        <el-button type="primary" @click="submitFolder">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="modal.iconModal" title="图标选择" width="30%">
    <el-table stripe :data="icons" style="width: 100%" @row-click="iconChoose">
      <el-table-column type="index" width="60" />
      <el-table-column prop="iconSource" label="图标">
        <template #default="scope">
          <i :class="scope.row.iconSource"></i>
        </template>
      </el-table-column>
      <el-table-column prop="iconSource" label="图标代码" />
    </el-table>
  </el-dialog>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import http from '@/lib/http'
import common from '@/lib/common'
import icons from '@/assets/icon.json'

const apiUrl = '/v1/api/node/admin/auth/SystemApiControl/'
let pagePara = ref(),
  treeData = ref(),
  actNode = ref(),
  workPara = ref(),
  action = ref(''),
  folderFormRef = ref<FormInstance>()
const modal = reactive({
  folderModal: false,
  iconModal: false,
})
const rules = reactive({
  folderRules: {
    systemmenu_name: [
      { required: true, trigger: 'change', message: '缺少名称' },
    ],
    systemmenu_icon: [
      { required: true, trigger: 'change', message: '缺少图标' },
    ],
  },
  ruleMenuModal: {
    systemmenu_name: [{ required: true, trigger: 'change' }],
  },
})

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

const iconChoose = (row: any, column: any, event: Event) => {
  workPara.value.systemmenu_icon = row.iconSource
  modal.iconModal = false
}

const addFolderModal = () => {
  workPara.value = {}
  action.value = 'add'
  folderFormRef.value?.resetFields()
  folderFormRef.value?.clearValidate()

  if (_.isEmpty(actNode.value)) {
    return common.commonWarning('请选择一个目录')
  } else {
    if (actNode.value.node_type === '01') {
      return common.commonWarning('菜单下不允许新增内容')
    }
    modal.folderModal = true
  }
}

const submitFolder = async () => {
  if (!folderFormRef.value) return
  const valid = await folderFormRef.value.validate()
  if (valid) {
    try {
      if (action.value === 'add') {
        workPara.value.parent_id = actNode.value.systemmenu_id
        await http.POST(apiUrl + 'addFolder', workPara.value)
        common.commonSuccess('增加目录成功')
      } else if (action.value === 'modify') {
        await http.POST(apiUrl + 'modifyFolder', workPara.value)
        common.commonSuccess('增加目录成功')
      }

      await getTreeData()
      modal.folderModal = false
    } catch (error) {
      common.commonFault(error)
    }
  }
}

const removeNode = async (node: any) => {
  try {
    await http.POST(apiUrl + 'remove', { systemmenu_id: node.systemmenu_id })
    common.commonSuccess('删除成功')
    await getTreeData()
  } catch (error) {
    common.commonFault(error)
  }
}

initPage()
</script>
<style scoped>
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
