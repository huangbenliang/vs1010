<template>
  <div class="app-container">
    讲师列表

    <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px"
    >
      <el-form-item label="名称">
        <el-input
          v-model="teacherQuery.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          placeholder="选择开始时间"
          v-model="teacherQuery.begin"
          format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          type="datetime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="选择截止时间"
          v-model="teacherQuery.end"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          type="datetime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格显示 -->
    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
    >
      <el-table-column prop="date" label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80"> </el-table-column>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id,scope.row.name)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
//引入teacher.js
import teacher from "@/api/edu/teacher";
export default {
  //写核心代码
  data() {
    //定义使用变量和初始值
    return {
      page: 1, //当前页
      limit: 5, //每页记录数
      teacherQuery: {}, //条件封装对象
      list: null,
      total: 0,
    };
  },
  created() {
    //在页面渲染之前执行,一般调用methods定义的方法
    this.getList();
  },
  methods: {
    //创建具体的方法,调用teacher.js定义的方法
    getList(page = 1) {
      this.page = page; //调用时,如果不传page 默认第一页,如果传了,则赋值给this.page
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((resp) => {
          // console.log(resp)
          this.list = resp.data.rows;
          this.total = resp.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //清空方法
    resetData() {
      //表单输入项数据清空
      this.teacherQuery = {};
      //查询所有讲师数据
      this.getList();
    },

    //删除讲师
    removeDataById(id,name) {
      //提示信息
      this.$confirm("此操作将永久删除该讲师记录["+name+"], 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        teacher.deleteTeacherById(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //重新打开列表
          this.getList();
        });
      });
    },
  }, //export
};
</script>