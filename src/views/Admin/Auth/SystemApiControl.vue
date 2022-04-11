<template>
  <panel title="">
    <template #beforeBody>
      <div class="panel-toolbar">
        <el-row>
          <el-button type="primary" @click="addFolderModal">增加目录</el-button>
          <el-button type="primary" @click="addMenuModal">增加菜单</el-button>
          <el-button type="primary" @click="editNodeModal">编辑</el-button>
        </el-row>
      </div>
    </template>
    <div style="width:800px">
      <el-tree :data="treeData" :props="defaultProps" :show-checkbox="false" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="handleCheckChange">
        <template #default="{ node, data }">
          <span class="tree-node">
            <span> <i class="fa-regular fa-folder m-r-5" v-if="data.node_type == '00'"></i>{{ node.label }}</span>
            <span v-if="data.systemmenu_id != 0">
              <el-button size="small" circle @click="removeNode(data)"><i class="fa-solid fa-xmark"></i></el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </panel>
  <el-dialog v-model="modal.folderModal" title="目录" width="30%">
    <el-form ref="folderFormRef" :model="workPara" status-icon :rules="rules.folderRules" label-width="120px">
      <el-form-item label="目录名称" prop="systemmenu_name">
        <el-input v-model="workPara.systemmenu_name" />
      </el-form-item>
      <el-form-item label="图标" prop="systemmenu_icon">
        <el-input v-model="workPara.systemmenu_icon"
          ><template #prepend> <i class="fa-solid fa-magnifying-glass" @click="modal.iconModal = true"></i> </template
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
  <el-dialog v-model="modal.menuModal" title="菜单" width="30%">
    <el-form ref="menuFormRef" :model="workPara" status-icon :rules="rules.menuRules" label-width="120px">
      <el-form-item label="功能名称" prop="systemmenu_name">
        <el-input v-model="workPara.systemmenu_name" />
      </el-form-item>
      <el-tabs v-model="workPara.api_type" class="demo-tabs">
        <el-tab-pane label="菜单&授权API" name="0">
          <el-form-item label="菜单路径" prop="api_path">
            <el-input v-model="workPara.api_path" />
          </el-form-item>
          <el-form-item label="授权功能" prop="api_function">
            <el-input v-model="workPara.api_function" />
          </el-form-item>
          <el-form-item label="权限校验" prop="auth_flag">
            <el-select v-model="workPara.auth_flag" placeholder=" ">
              <el-option v-for="item in pagePara.authInfo" :key="item.id" :label="item.text" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="api_remark">
            <el-input v-model="workPara.api_remark" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="菜单" name="1">
          <el-form-item label="菜单路径" prop="api_path">
            <el-input v-model="workPara.api_path" />
          </el-form-item>
          <el-form-item label="备注" prop="api_remark">
            <el-input v-model="workPara.api_remark" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="授权API" name="2">
          <el-form-item label="授权功能" prop="api_function">
            <el-input v-model="workPara.api_function" />
          </el-form-item>
          <el-form-item label="权限校验" prop="auth_flag">
            <el-select v-model="workPara.auth_flag" placeholder=" ">
              <el-option v-for="item in pagePara.authInfo" :key="item.id" :label="item.text" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="api_remark">
            <el-input v-model="workPara.api_remark" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modal.menuModal = false">取消</el-button>
        <el-button type="primary" @click="submitMenu">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { reactive, ref } from 'vue'
import { FormInstance, ElMessageBox } from 'element-plus'
import request from '@/lib/request'
import common from '@/lib/common'
import icons from '@/assets/icon.json'

const apiUrl = '/v1/api/node/admin/auth/SystemApiControl/'
let pagePara = ref(),
  treeData = ref(),
  actNode = ref(),
  workPara = ref(),
  action = ref(''),
  folderFormRef = ref<FormInstance>(),
  menuFormRef = ref<FormInstance>()
const modal = reactive({
  folderModal: false,
  iconModal: false,
  menuModal: false,
})
const rules = reactive({
  folderRules: {
    systemmenu_name: [{ required: true, trigger: 'change', message: '缺少名称' }],
    systemmenu_icon: [{ required: true, trigger: 'change', message: '缺少图标' }],
  },
  menuRules: {
    systemmenu_name: [{ required: true, trigger: 'change', message: '缺少名称' }],
  },
})

const defaultProps = {
  id: 'systemmenu_id',
  label: 'name',
  children: 'children',
}

const initPage = async () => {
  try {
    let response = await request.post(apiUrl + 'init', {})
    pagePara.value = JSON.parse(JSON.stringify(response.data.info))
    await getTreeData()
  } catch (error) {
    common.fault(error)
  }
}

const getTreeData = async () => {
  let response = await request.post(apiUrl + 'search', {})
  treeData.value = response.data.info
}

const handleCheckChange = (data: any, checked: boolean, indeterminate: boolean) => {
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
  if (_.isEmpty(actNode.value)) {
    return common.warning('请选择一个目录')
  } else {
    if (actNode.value.node_type === '01') {
      return common.warning('菜单下不允许新增内容')
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
        await request.post(apiUrl + 'addFolder', workPara.value)
        common.success('增加目录成功')
      } else if (action.value === 'modify') {
        await request.post(apiUrl + 'modifyFolder', workPara.value)
        common.success('增加目录成功')
      }

      await getTreeData()
      modal.folderModal = false
    } catch (error) {
      common.fault(error)
    }
  }
}

const addMenuModal = () => {
  workPara.value = { api_type: '1' }
  action.value = 'add'
  menuFormRef.value?.resetFields()
  if (_.isEmpty(actNode.value)) {
    return common.warning('请选择一个目录')
  } else {
    if (actNode.value.node_type === '01') {
      return common.warning('菜单下不允许新增内容')
    }
    modal.menuModal = true
  }
}

const submitMenu = async () => {
  if (!menuFormRef.value) return
  const valid = await menuFormRef.value.validate()
  if (valid) {
    try {
      if (action.value === 'add') {
        workPara.value.parent_id = actNode.value.systemmenu_id
        await request.post(apiUrl + 'addMenu', workPara.value)
        common.success('增加菜单成功')
      } else if (action.value === 'modify') {
        await request.post(apiUrl + 'modifyMenu', workPara.value)
        common.success('修改菜单成功')
      }
      await getTreeData()
      modal.menuModal = false
    } catch (error) {
      common.fault(error)
    }
  }
}

const editNodeModal = () => {
  if (_.isEmpty(actNode.value)) {
    return common.warning('请选择一个节点')
  }
  action.value = 'modify'
  if (actNode.value.node_type === '00') {
    workPara.value = {}
    folderFormRef.value?.resetFields()
    workPara.value.systemmenu_id = actNode.value.systemmenu_id
    workPara.value.systemmenu_name = actNode.value.systemmenu_name
    workPara.value.systemmenu_icon = actNode.value.systemmenu_icon
    modal.folderModal = true
  } else if (actNode.value.node_type === '01') {
    workPara.value = {}
    menuFormRef.value?.resetFields()
    workPara.value.systemmenu_id = actNode.value.systemmenu_id
    workPara.value.systemmenu_name = actNode.value.systemmenu_name
    workPara.value.api_type = actNode.value.api_type
    workPara.value.api_path = actNode.value.api_path
    workPara.value.api_function = actNode.value.api_function
    workPara.value.api_remark = actNode.value.api_remark
    workPara.value.auth_flag = actNode.value.auth_flag
    modal.menuModal = true
  }
}

const removeNode = (node: any) => {
  ElMessageBox.confirm('确认要删除选定的对象？', '警告', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }).then(async () => {
    try {
      await request.post(apiUrl + 'remove', { systemmenu_id: node.systemmenu_id })
      common.success('删除成功')
      await getTreeData()
    } catch (error) {
      common.fault(error)
    }
  })
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
