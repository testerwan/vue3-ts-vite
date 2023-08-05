<template>
  <div>
    <el-card class="box-card">
      <el-button
        size="default"
        icon="Plus"
        type="primary"
        @click="addTrademark"
      >
        新增品牌
      </el-button>
      <el-table border style="margin: 10px 0px" :data="tradeMarkArr">
        <el-table-column
          prop="date"
          label="序号"
          width="100px"
          align="center"
          type="index"
        />
        <el-table-column label="品牌名称">
          <template #="{ row, $index }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌Logo">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            />
            <el-popconfirm
              :title="`确定要删除该品牌(${row.tmName})吗?`"
              width="240px"
              icon="Delete"
              icon-color="red"
              @confirm="removeTrademark(`${row.id}`)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :small="false"
        :background="true"
        :page-sizes="[5, 20, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changePageNo"
        @size-change="sizeChange"
        :total="total"
        :page-count="pageCount"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="trademarkParams.id ? '编辑品牌' : '新增品牌'"
      width="800px"
    >
      <el-form
        style="width: 60%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqHasTrademark,
} from '@/api/product/trademark'
import {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type.ts'
import { ElMessage, UploadProps } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let pageCount = ref<number>(0)
let tradeMarkArr = ref<Records>([])
let dialogVisible = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()

const getTradeMark = async () => {
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value,
  )
  if (result.code == 200) {
    tradeMarkArr.value = result.data.records
    total.value = result.data.total
    pageCount.value = result.data.pages
  }
}

onMounted(() => {
  getTradeMark()
})

const changePageNo = () => {
  getTradeMark()
}
const sizeChange = () => {
  pageNo.value = 1
  getTradeMark()
}

const addTrademark = () => {
  dialogVisible.value = true
}
const updateTrademark = (row) => {
  dialogVisible.value = true
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
}

const cancel = () => {
  dialogVisible.value = false
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
}
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '编辑品牌成功!' : '新增品牌成功!',
    })
    await getTradeMark()
    trademarkParams.id = 0
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '编辑品牌失败!' : '新增品牌失败!',
    })
  }
  dialogVisible.value = false
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 2) {
      return true
    } else {
      ElMessage.error('picture size can not exceed 2MB!')
    }
    return false
  } else {
    ElMessage.error('picture must be Jpg|Png|Gif format!')
    return false
  }
  return true
}

const uploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.logoUrl = response.data
}
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    //校验未通过返回的错误的提示信息
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    console.log('有图片')
    callBack()
  } else {
    console.log('没图片')
    callBack(new Error('LOGO图片务必上传'))
  }
}
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

const removeTrademark = async (id: any) => {
  const result: any = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '品牌删除成功!',
    })

    if (pageNo.value > 1) {
      pageNo.value =
        tradeMarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
    }
    await getTradeMark()
  } else {
    ElMessage({
      type: 'error',
      message: '品牌删除失败!',
    })
  }
}
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
