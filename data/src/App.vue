<template>
  <div id="app">
    <el-container>
      <el-header>
        <stu_head class="stu_head"
                  v-if="isShow"
                  @click.native="showMenu"></stu_head>
        <a v-else>
          <i style="line-height: 60px;color: #fff; font-size: 16px"
             :class="isMobileDevices ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="showMenu"></i>
        </a>
        <stu_search class="stu_search"></stu_search>
      </el-header>
      <el-container>
        <el-aside :width=asideWidth
                  v-show="!isMobileDevices"
                  :class="isMobileDevices && '_me-border-r'">
          <stu_leftMenu></stu_leftMenu>

        </el-aside>
        <el-main style="overflow-y: auto">
          <router-view/>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import stu_head from "./components/stu_head";
  import stu_search from "./components/stu_search";
  import stu_leftMenu from "./components/stu_leftMenu";
  import {mapMutations, mapState} from 'vuex'

  export default {
    data() {
      return {
        isShow: true,
        asideWidth: '200px'
      }
    },
    created() {
      this.setMobileDevices(window.innerWidth < 900);
      this.isShow = window.innerWidth > 900;
      this.asideWidth = !this.isMobileDevices ? '200px' : '64px';
    },
    computed: {
      ...mapState(['isMobileDevices'])
    },
    methods: {
      ...mapMutations(['setMobileDevices']),
      showMenu() {
        this.setMobileDevices(!this.isMobileDevices);
      }
    },
    components: {
      stu_head,
      stu_search,
      stu_leftMenu,
    }
  }
</script>
<style>
  #app .el-container .el-header {
    background: #4d5e70;
    position: relative;
    padding: 0 10px;
  }

  .el-container .el-header .stu_head,
  .el-container .el-header .stu_search {
    display: inline-block;
  }

  .el-container .el-header .stu_search {
    position: absolute;
    left: 50%;
    margin-left: -150px;
    line-height: 60px;
  }


  .el-container .el-aside._me-border-r {
    border-right: 1px solid #eeeeee;
  }

</style>
