<template>
  <div class="app-container">
    讲师添加
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="选择讲师头衔">
          <!--
数据类型一定要和取出的json中的一致，否则没法回填
因此，这里value使用动态绑定的值，保证其数据类型是number
-->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher";
export default {
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
      saveBtnDisabled: false, //保存按钮是否禁用
    };
  },
  created() {
      this.init()
  },
  watch:{
      $route(to,from){
          this.init()
      }
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        //console.log(id)
        this.getInfo(id);
      } else {
        this.teacher = {};
      }
    },
    //获得讲师信息
    getInfo(id) {
      teacherApi.getTeacherInfo(id).then((response) => {
        this.teacher = response.data.item;
      });
    },
    saveOrUpdate() {
      //this.saveBtnDisabled = true;
      if (!this.teacher.id) {
        this.saveData();
      } else {
        this.updateTeacher();
      }
    },
    // 保存
    saveData() {
      teacherApi.addTeacher(this.teacher).then((response) => {
        //添加成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },

    updateTeacher() {
      teacherApi.updateTeacher(this.teacher).then((resp) => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
  },
};
</script>