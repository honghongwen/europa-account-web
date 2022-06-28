<template>
  <div>
    <el-card>
      <div class="t_query_group">
        <div class="flex-1">
          <span class="t-query-group-text">地址：</span>
          <el-input
            placeholder="请输入消费地址"
            v-model="tableQuery.company"
            class="input-width"
            clearable
          >
          </el-input>
        </div>
        <div class="flex-2">
          <span class="t-query-group-text">消费人：</span>
          <el-input
            placeholder="请选择消费人"
            v-model="tableQuery.name"
            class="input-width"
            clearable
          >
          </el-input>
        </div>
        <div class="flex-3">
          <span class="t-query-group-text">金额：</span>
          <el-input
            placeholder="请选择数目"
            v-model="tableQuery.mobile"
            class="input-width"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="t_btn_group">
        <div class="t_btn_group_left">
          <el-button type="primary" icon="el-icon-s-custom" @click="handleAdd"
            >新增</el-button
          >
          <el-button type="primary" icon="el-icon-files">导入</el-button>
        </div>
        <div class="t_btn_group_right">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getSendManList"
            >查询</el-button
          >
        </div>
      </div>

      <div class="t_table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="人员"> </el-table-column>
          <el-table-column prop="mobile" label="金额"> </el-table-column>
          <el-table-column prop="company" label="消费地址"> </el-table-column>
          <el-table-column prop="company" label="登记时间"> </el-table-column>
          <el-table-column prop="company" label="修改时间"> </el-table-column>
          <el-table-column prop="address" label="说明">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>
                  {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area
                  }}{{ scope.row.town }}
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.address }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-popconfirm
                title="确定删除此消费记录吗？"
                @confirm="successconfirm(scope.row.id)"
              >
                <el-button
                  size="mini"
                  slot="reference"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pageNation">
        <!--分页区域-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableQuery.pageNum"
          :page-sizes="[10, 20]"
          :page-size="tableQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <!-- Form -->
      <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="sendManForm">
          <el-form-item
            label="寄件人："
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="寄件人手机："
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="form.mobile"
              autocomplete="off"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="寄件人电话：" :label-width="formLabelWidth">
            <el-input
              v-model="form.phone"
              autocomplete="off"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="省/市/区/县："
            :label-width="formLabelWidth"
            prop="region"
          >
            <region-group
              :town="true"
              v-model="form.region"
              @change="regionChange"
            />
          </el-form-item>
          <el-form-item
            label="详细地址："
            :label-width="formLabelWidth"
            prop="address"
          >
            <el-input
              v-model="form.address"
              autocomplete="off"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="寄件人公司："
            :label-width="formLabelWidth"
            prop="company"
          >
            <el-input
              v-model="form.company"
              autocomplete="off"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddSendMan">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import PageNation from "@/components/pageNation";
import { RegionGroup, RegionText } from "v-region";
import {
  addSendMan,
  delSendMan,
  editSendMan,
  listSendMan,
} from "@/api/sendMan";

export default {
  components: {
    PageNation,
    RegionGroup,
    RegionText,
  },
  data() {
    return {
      dialog_title: "新增常用收件人",
      dialog_edit_type: 0, // 0-新增1-编辑
      total: 0,
      tableQuery: {
        company: "",
        name: "",
        address: "",
        mobile: "",
        pageNum: 1,
        pageSize: 10,
      },
      tableData: [
        {
          id: "",
          name: "",
          mobile: "",
          company: "",
          address: "",
        },
      ],
      dialogFormVisible: false,
      form: {
        name: "",
        mobile: "",
        phone: "",
        region: {},
        regionJson: "",
        address: "",
        company: "",
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          {
            required: true,
            message: "请输入寄件人名",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入寄件人手机号",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "请选择省市区",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    regionChange(data) {
      this.form.regionJson = JSON.stringify(data);
    },
    submitAddSendMan() {
      this.$refs["sendManForm"].validate((valid) => {
        debugger;
        if (valid) {
          // 新增收件人
          if (this.dialog_edit_type === 0) {
            addSendMan(this.form).then((successResponse) => {
              let resData = successResponse.data;
              if (resData.code === 200) {
                this.dialogFormVisible = false;
                // 添加记录成功后再次查询列表
                this.getSendManList();
              } else {
                this.$notify.error(resData.message);
                return false;
              }
            });
          } else {
            editSendMan(this.form).then((successResponse) => {
              let resData = successResponse.data;
              if (resData.code === 200) {
                this.getSendManList();
              } else {
                this.$notify.error(resData.message);
                return false;
              }
            });
          }
        } else {
          this.$notify.warning("请先填写必填项");
          return false;
        }
      });
    },
    getSendManList() {
      listSendMan(this.tableQuery).then((successResponse) => {
        let resData = successResponse.data;
        if (resData.code === 200) {
          this.tableData = resData.data.data;
          this.total = resData.data.total;
        } else {
          this.$message.error(resData.message);
          return false;
        }
      });
    },
    handleSelectionChange() {},
    handleSizeChange(val) {
      this.tableQuery.pageSize = val;
      this.getSendManList();
    },
    handleCurrentChange(val) {
      this.tableQuery.pageNum = val;
      this.getSendManList();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleAdd() {
      (this.dialog_title = "新增常用寄件人"),
        (this.dialog_edit_type = 0),
        (this.dialogFormVisible = true);
      this.form = {
        name: "",
        mobile: "",
        phone: "",
        region: undefined,
        regionJson: "",
        address: "",
        company: "",
      };
    },
    handleEdit(index, row) {
      this.dialog_edit_type = 1;
      this.dialog_title = "编辑常用寄件人";
      this.form = row;
      this.form.region = row.regionCode;
      this.dialogFormVisible = true;
    },
    successconfirm(id) {
      delSendMan({ id: id })
        .then((successResponse) => {
          if (successResponse.data.code === 200) {
            this.getSendManList();
            this.$message.success(successResponse.data.data);
          } else {
            this.$message.error(successResponse.data.message);
            return false;
          }
        })
        .catch((failResponse) => {
          this.$message.error(failResponse.data.message);
          return false;
        });
    },
  },
  created() {
    this.getSendManList();
  },
};
</script>

<style lang="scss" scoped>
.t_query_group {
  display: flex;
  justify-content: space-between;
}

.t_btn_group {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.t_table {
  margin-top: 50px;
}

.pageNation {
  margin-top: 30px;
  padding-bottom: 20px;
  float: right;
}
</style>
