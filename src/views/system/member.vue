<template>
  <div class="member_main">
    <el-card>
      <div class="member_query">
        <div class="flex-1">
          <span class="member_query_name">姓名：</span>
          <el-input placeholder="请输入姓名" v-model="tableQuery.name" class="input-width" clearable>
          </el-input>
        </div>
        <div class="flex-2">
          <span class="member_query_gender">性别：</span>
          <el-select v-model="tableQuery.gender" placeholder="请选择" clearable>
            <el-option v-for="item in genderList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="member_button">
        <div class="member_button_add">
          <el-button type="primary" icon="el-icon-s-custom" @click="handleAdd">新增</el-button>
        </div>
        <div class="member_button_query">
          <el-button type="primary" icon="el-icon-search" @click="getMemberList">查询</el-button>
        </div>
      </div>

      <div class="member_table">
        <el-table ref="multipleTable" :data="tableData" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="id" label="ID" width="100px"></el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">
              <el-tag :type="scope.row.gender | genderClass">{{scope.row.gender | genderText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="mark" label="备注"> </el-table-column>
          <el-table-column prop="createTime" label="录入时间"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="operation" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="showDetail(scope.$index, scope.row)"
                class="member_table_info">详情</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popconfirm title="确定删除此成员吗？" @confirm="successconfirm(scope.row.id)">
                <el-button size="mini" slot="reference" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="member_page_util">
        <!--分页区域-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="tableQuery.pageNum" :page-sizes="[10, 20]" :page-size="tableQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <!-- Form -->
      <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="memberForm">
          <el-form-item label="姓名：" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="性别：" :label-width="formLabelWidth">
            <el-select v-model="form.gender" placeholder="请选择性别" class="input-width">
              <el-option v-for="item in genderList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="form.mark" type="textarea" autocomplete="off" class="input-width-large"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import PageNation from "@/components/pageNation";
  import {
    RegionGroup,
    RegionText
  } from "v-region";
  import {
    addMember,
    delMember,
    editMember,
    listMember
  } from "@/api/member";

  export default {
    components: {
      PageNation,
      RegionGroup,
      RegionText,
    },
    data() {
      return {
        dialog_title: "新增成员",
        dialog_edit_type: 0, // 0-新增1-编辑
        total: 0,
        genderList: [{
            value: 1,
            label: '男'
          },
          {
            value: 0,
            label: '女'
          }
        ],
        tableQuery: {
          name: "",
          gender: undefined,
          pageNum: 1,
          pageSize: 10,
        },
        tableData: [{
          id: "",
          name: "",
          gender: undefined,
          mark: "",
          createTime: "",
          updateTime: "",
        }, ],
        dialogFormVisible: false,
        form: {
          id: null,
          name: "",
          gender: 0,
          mark: ""
        },
        formLabelWidth: "120px",
        rules: {
          name: [{
            required: true,
            message: "请输入寄件人名",
            trigger: "blur",
          }, ],
          gender: [{
            required: true,
            message: "请选择性别",
            trigger: "blur",
          }, ],
        },
      };
    },
    filters: {
      genderText(val) {
        if (val === undefined) return
        if (val === 1) {
          return '男'
        } else if (val === 0) {
          return '女'
        }
      },
      genderClass(val) {
        if (val === undefined) return
        if (val === 0) {
          return 'danger'
        } else if (val === 1) {
          return 'success'
        }
      }
    },
    methods: {
      regionChange(data) {
        this.form.regionJson = JSON.stringify(data);
      },
      submitDialog() {
        this.$refs["memberForm"].validate((valid) => {
          if (valid) {
            // 新增收件人
            if (this.dialog_edit_type === 0) {
              addMember(this.form).then((response) => {
                this.dialogFormVisible = false;
                // 添加记录成功后再次查询列表
                this.getMemberList();
              });
            } else {
              editMember(this.form).then((response) => {
                this.dialogFormVisible = false;
                this.getMemberList();
                this.$notify.success(response.data);
              });
            }
          } else {
            this.$notify.warning("请先填写必填项");
            return false;
          }
        });
      },
      getMemberList() {
        listMember(this.tableQuery).then((response) => {
          this.tableData = response.data.data;
          this.total = response.data.total;
        });
      },
      handleSelectionChange() {},
      handleSizeChange(val) {
        this.tableQuery.pageSize = val;
        this.getMemberList();
      },
      handleCurrentChange(val) {
        this.tableQuery.pageNum = val;
        this.getMemberList();
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleAdd() {
        this.dialog_title = "新增成员";
        this.dialog_edit_type = 0;
        this.dialogFormVisible = true;
        this.form = {};
      },
      handleEdit(index, row) {
        this.dialog_edit_type = 1;
        this.dialog_title = "编辑成员";
        this.form = row;
        this.dialogFormVisible = true;
      },
      showDetail(index, row) {
        this.$router.push({
          path: "/system/memberInfo",
          query: {
            id: row.id,
          }
        });

      },
      successconfirm(id) {
        delMember({
            id: id
          })
          .then((response) => {
            this.getMemberList();
            this.$notify.success(response.data);
          })
      },
      formGender(row, column, cellValue) {
        if (cellValue === 1) {
          return '男';
        } else if (cellValue === 0) {
          return '女';
        }
      },
    },
    created() {
      this.getMemberList();
    },
  };

</script>

<style lang="scss" scoped>
  .member_query {
    display: flex;
    justify-content: space-between;
  }

  .member_button {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }

  .member_table {
    margin-top: 50px;
  }

  .member_page_util {
    margin-top: 30px;
    padding-bottom: 20px;
    float: right;
  }

  .member_table_info {
    margin-right: -10px;
  }

</style>
