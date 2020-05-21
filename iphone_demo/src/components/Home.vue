<template>
  <div class="hello">
      <img :src="src" />
      <h3>{{name}}</h3>
      <el-button type="primary" @click="load">新导入数据加载</el-button>
      <el-button type="primary" @click="upload">跳过当前图片</el-button>
      <el-button type="primary" @click="dialogVisible = true">已采集数据重置</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定重置所有数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="reset">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      src: '',
      name: '打开手机开始采集人脸',
      dialogVisible: false
    }
  },
  async created () {
    await this.timmer()
  },
  methods: {
    timmer: async function () {
      // eslint-disable-next-line no-new
      await new Promise((resolve, reject) => {
        setInterval(async () => {
          console.log('loop')
          let res = await this.$axios.post(`/api/web/show`)
          if (res.data.name) {
            this.name = res.data.name
            this.src = `/img/${this.name}`
          }
          resolve()
        }, 3500)
      })
    },
    load: async function () {
      console.log('load')
      await this.$axios.post(`/api/web/load`)
    },
    reset: async function () {
      console.log('reset')
      this.dialogVisible = false
      await this.$axios.post(`/api/web/resetAll`)
    },
    upload: async function () {
      console.log('upload')
      await this.$axios.post(`/api/web/upload`, {
        name: this.name,
        info: '跳过了此图片'
      })
      await this.$axios.post(`/api/web/next`)
    },
    // 对话框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
        })
        .catch(_ => {
          console.log('quxiao')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    border: 2px solid black;
    height: 540px;
  }
  button {
    height: 50px;
  }
</style>
