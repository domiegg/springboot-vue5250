<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="!showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-form-item label="综合测评名称">
          <el-input v-model="searchForm.name" placeholder="综合测评名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-content">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandler"
          style="width: 100%;"
        >
          <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
          <el-table-column prop="name" header-align="center" align="center" sortable label="综合测评"></el-table-column>
          <el-table-column
            prop="time"
            header-align="center"
            align="center"
            sortable
            label="综合考试时长/分钟"
          >
            <template slot-scope="scope">{{scope.row.time}}</template>
          </el-table-column>
          <!-- <el-table-column prop="status" header-align="center" align="center" sortable label="综合测评状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status==1" type="info">启用</el-tag>
              <el-tag v-if="scope.row.status==0" type="warning">禁用</el-tag>
            </template>
          </el-table-column>-->
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                size="small"
                @click="addOrUpdateHandler(scope.row.id)"
              >综合考试</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination-content"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: false,
      user: {}
    };
  },
  mounted() {
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.user = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
    this.init();
    this.getDataList();
  },
  components: {},
  methods: {
    init() {},
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: "id",
        status: "1"
      };
      if (this.searchForm.name) {
        params["name"] = `%${this.searchForm.name}%`;
      }
      this.$http({
        url: this.$api.exampaperpage,
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id) {
      this.$http({
        url: `examrecord/deleteRecords?userid=${this.user.id}&paperid=${id}`,
        method: "post",
        data: {}
      }).then(({ data }) => {});
      this.$router.push({
        name: "adminexam",
        params: {
          id: id
        }
      });
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: this.$api.exampaperdelete,
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-content {
	background: transparent;
}
.table-content {
	background: transparent;
}
</style>
