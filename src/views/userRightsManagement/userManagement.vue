<template>
  <div class="userRightManagement" v-loading="loading">
    <div class="search-bar control display_center">
      <div class="control-form">
        <el-form ref="searchform" :model="searchForm" label-width="80px">
          <el-row>
            <el-col :span='5'>
              <el-form-item label="账户"><el-input size="mini" v-model.trim="searchForm.accmount"></el-input></el-form-item>
            </el-col>
            <el-col :span='5'>
              <el-form-item label="姓名"><el-input size="mini" v-model.trim="searchForm.name"></el-input></el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="cus-item">
                <el-checkbox v-model="searchForm.checked">仅自营账户</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item class="cus-item">
                <el-button size='mini' type="primary" @click="queryUserData">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" size="mini" @click="addData">新增</el-button>
        <!-- <el-button type="primary" size="mini">导出</el-button> -->
        <ExportFileCom :beforeExportFile="beforeExportFile" @handleCurrentChange="handleCurrentChange" />
      </div>
    </div>
    <div class="query-result">
      <DragTable
        :columnList="tableColumnList"
        :tableData="tableData"
        :noDrag='true'
        :paginationShow="true"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #cus-table-column="data">
          <el-table-column
          v-for="(item, idx) in data.columnData"
          :type="item.type"
          :key="idx"
          :prop="item.prop"
          :label="item.label"
          :width="item.width || ''"
          :resizable="false"
          align="center"
          >
          <template slot-scope="scope">
            <!-- 序号 -->
            <div v-if="item.prop === 'index'">{{scope.$index + 1}}</div>
            <!-- 操作 -->
            <div v-else-if="item.prop === 'cus_todo'" class="todo-btn">
              <el-button type='text'>启</el-button>
              <el-button type='text' @click="editData(item, scope)">改</el-button>
              <el-button type='text'>删</el-button>
              <el-button type='text'>解</el-button>
            </div>
            <!-- 是否类型 -->
            <div v-else-if="item.prop === 'isactivated'">
              {{scope.row[item.prop] === 'Y' ? '是' : '否'}}
            </div>
            <!-- 正常展示 -->
            <div v-else>{{scope.row[item.prop]}}</div>
          </template>
          </el-table-column>
        </template>
      </DragTable>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="85%"
      :show-close="false">
      <FormBody
        v-if="dialogTableVisible"
        :dialogType="dialogType"
        :editData='editUserData'
        :editUserId="editUserId"
        @closeDialog="handleDrawClose"
        @onSubmit="saveData"
      />
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import tableColumn, { TableColumns } from './ts/tableColumnConfig';
import FormBody from './formBody.vue';
import DragTable from '@/components/DragTable/index.vue';
import ExportFileCom from '@/components/exportFile/index.vue';
interface QueryParams {
  page: number;
  pageSize: number;
}

@Component({
  name: 'userRightManagement',
  components: { FormBody, DragTable, ExportFileCom }
})
export default class UserRightManagement extends Vue {
  loading = false;
  title = '用户管理';
  searchForm: any = {
    accmount: '',
    name: '',
    checked: ''
  };
  queryUserDataParam: QueryParams = {
    page: 1,
    pageSize: 10
  }
  tableColumnList: TableColumns[] = tableColumn;
  tableData: any[] = [];
  dialogTableVisible = false; // 新增、修改用户
  dialogType = 'edit'; // 新增：add, 修改：edit
  editUserId = '';
  editUserData: any = {};
  mounted() {
    this.queryUserData();
  };
  // methods
  getQueryParams() { // 处理请求参数
    const { page, pageSize } = this.queryUserDataParam;
    const form = { ...this.searchForm };
    return { page, pageSize, ...form };
  }
  queryUserData() {
    if (this.loading) return;
    this.loading = true;
    const param = this.getQueryParams();
    this.$http.get('/auth/userList', { params: param }).then((res: any) => {
      const { data: resultData } = res;
      if (resultData && resultData.data) {
        this.tableData = resultData.data.length ? resultData.data : [];
      }
      this.loading = false;
    }).catch((err: any) => {
      console.log('查询用户列表数据失败：', err);
      this.loading = false;
    });
  };
  handleSizeChange(arg: any) { // 翻页
    const [pageSize] = arg;
    Object.assign(this.queryUserDataParam, { page: 1, pageSize });
    this.queryUserData();
    console.log('size change', pageSize);
  };
  handleCurrentChange(arg: any) { // 翻页
    const [page] = arg;
    Object.assign(this.queryUserDataParam, { page });
    this.queryUserData();
    console.log('current change', page);
  }
  editData(item: any, row: any) { // 编辑数据按钮
    const { id } = row; // 获得id
    this.editUserId = id || '10000022';
    this.dialogType = 'edit';
    if (!id) {
      this.editUserData = row;
    } else {
      this.editUserData = {};
    }
    this.dialogTableVisibleToggle();
  };
  addData() { // 新增数据按钮
    this.dialogType = 'add';
    this.dialogTableVisibleToggle();
  };
  handleDrawClose() { // 关闭前回调
    this.$confirm('确认关闭当前编辑内容？').then(() => {
      this.dialogTableVisibleToggle();
    }).catch(() => { console.log('取消'); });
  };
  saveData() { // 保存数据
    console.log('保存数据');
    this.dialogTableVisibleToggle();
  };
  dialogTableVisibleToggle() {
    this.dialogTableVisible = !this.dialogTableVisible;
  };
  beforeExportFile(done: any) { // 导出拦截
    console.log('0000导出拦截');
    if (done && typeof done === 'function') {
      done();
    }
  }
}
</script>
<style lang="less">
  .cus-item {
    .el-form-item__content {
      color: red;
      margin-left: 10px !important;
    }
  }
  .userRightManagement {
    .search-bar {
      border: 1px solid #ccc;
      padding: 3px 0;
      justify-content: space-between;
      padding-right: 15px;
      .control-form {
        flex: 1;
      }
      .btn-wrap {
        flex-shrink: 0;
      }
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .query-result {
      padding: 20px;
      .todo-btn {
        color: #409EFF;
        white-space: nowrap;
        span {
          margin: 0 3px;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
</style>
