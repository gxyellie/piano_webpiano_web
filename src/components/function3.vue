<template>
    <div class="StepFirst" ref="piano">
      <audio ref="audio">
        <source :src="musicUrl" />
      </audio>
      <audio ref="virtual">
        <source :src="virtualUrl" />
      </audio>
      <div style="position: absolute; top: 10px; left: 10px">
        <el-button
          type="primary"
          @click="
            $router.replace('/piano');
          "
          >返回首页</el-button
        >
      </div>
      <div class="guide">
        <p class="title">根据听到的人声选择对应的大调</p>
        <div class ="imgg">
          <img  src="../assets/f1/trumpet.png" />
          
        </div>
        <!-- <div class="select">
          <ul>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectC" @click="getmajor(1)">C大调</el-button></li>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectD"  @click="getmajor(2)">D大调</el-button></li>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectE" @click="getmajor(3)">E大调</el-button></li>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectF" @click="getmajor(4)">F大调</el-button></li>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectG" @click="getmajor(5)">G大调</el-button></li>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectA" @click="getmajor(6)">A大调</el-button></li>
          <li><el-button type="primary" class="key_btn" :style="{fontSize:'18px'}" :plain="selectB" @click="getmajor(7)">B大调</el-button></li>
        </ul>
        </div> -->
      </div>
      <!-- <keyboard v-on:down="getMyKey" /> -->
    </div>
  </template>
  
  <script>
  import keyboard from "./pp.vue";
  import { stepList } from "../stepList/StepNine";
  import { setPiano } from "../util/size"; 
  
  export default {
    components: {
      keyboard,
    },
    data() {
      return {
        selectC: true,
        selectD: true,
        selectE: true,
        selectF: true,
        selectG: true,
        selectA: true,
        selectB: true,
  
        musicUrl: "",
        virtualUrl: "",
        dialogResVisible: false,
        dialogFormVisible: false,
        keepReading: false,
        reader: null,
        dataArray: [],
        index: -1,
        stepIndex: 1,
        Major: 0,
        name: "",
        sex: "",
        age: "",
        fields: {
          得分: "score",
        },
        MajorName:["C大调","D大调","E大调","F大调","G大调","A大调","B大调"],
        MajorMap: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
        },
        stepList,
        start: false,
        score: 0,
        myKey: 0,
        SongName:["欢乐颂","卖报歌"],
        Songindex: 0,
      };
    },
    
   /*  computed: {
      nowtime() {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let time = date.toLocaleTimeString();
        time = time.split(":");
        const nowtime =
          month + "月" + day + "日" + time[0] + "时" + time[1] + "分";
        return nowtime;
      },
    },
  
    async mounted() {
      setPiano(this);
    }, */
  
  
  }
  </script>
  
  <style>
  * {
    padding: 0;
    margin: 0;
  }
  .StepFirst {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .guide {
    margin: 10px auto;
    text-align: center;
    margin-top: 50px;
  }
  .title {
    font-size: 25px;
    font-weight: bold;
    margin: 20px 40px;
    font-family: "Helvetica Neue";
    color: #303133;
  }
  
  .description {
    margin: 10px auto;
    font-size: 16px;
    font-family: "Helvetica Neue";
    color: #606266;
  }
  .showArea {
    position: relative;
    width: 100%;
  }
  .btns {
    margin: 0 auto 30px auto;
    text-align: center;
  }
  .showLeft {
    position: absolute;
    left: 20%;
    top: 0;
    width: 30%;
  }
  .showRight {
    position: absolute;
    right: 20%;
    top: 0;
    width: 30%;
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* .btn{
    width:85px;
    height:50px;
  } */
  .ul {
    font-size: 20px;
    padding: 10px;
    background-color: lightpink;
    margin-right: 20px;
    width: 100px;
    border-radius: 20px;
  }
  
  .imgul{
    text-align:center;
    margin:150px;
  }
  
  .imgli{
    display:inline;
    margin:20px;
    margin-bottom:50px;
  }
  .imgg{
    margin:70px;
  }
  
  ul{
      height:50px;
      display: flex;
      list-style: none;
  }
  
  li{
      height:50px;
      margin:10px;
  }
  
  </style>