<template>
  <div class="app-container">
    讲师列表

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
            @click="removeDataById(scope.row.id)"
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
    getList(page=1) {
        this.page=page  //调用时,如果不传page 默认第一页,如果传了,则赋值给this.page
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
  },
};
</script>