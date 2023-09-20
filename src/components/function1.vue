<template>
  <div class="StepFirst" ref="piano">
    
    <audio ref="audio">
      <source :src="musicUrl" />
    </audio>
    <audio ref="virtual">
      <source :src="virtualUrl" />
    </audio>

    <div style="position: absolute; top: 20px; left: 20px">
      <img @click="jump" src="../assets/f1/arrow.png" alt="" style="width: 20px;height: 30px;cursor: pointer;">
    </div>
<div class="mid">
    <div class="standard1">
      <!-- <div class="imgbox"> -->
        <img src="../assets/f1/standard.png" @click="standardplay" alt="">
      <!-- </div> -->
      
    </div>
    <div class="guide1">
      <div class="board1">
        <img src="../assets/f1/board.png" alt="" style="width: 100%;height: 100%;">
      </div>
      <div class="score1"><!--得分-->
        <span class="tens" data-score="tensscore">
            {{ tensscore }}
        </span>
        <span class="ones" data-score="onesscore">
          {{ onesscore }}
        </span>
      </div>
      <div class="number1"><!--题目总数-->
        <span class="tens" data-score="tensnum">
            {{ tensnum }}
        </span>
        <span class="ones" data-score="onesnum">
          {{ onesnum }}
        </span>
      </div>
      <div class="ansman1">
        <img :src="imgSrc[logicstate]" alt=""  style="width: 100%;height: 100%;position: absolute;">
      </div>
       
    </div>
    <div class="test1">
        <img src="../assets/f1/test.png" alt="" @click="startstep">
        <div class="question1">
          <p class="ques">{{ items }}</p>
        </div>
    </div>
</div>
    

    <keyboard @send="getMyKey" ref="keyboard"></keyboard>

  </div>
</template>

<script>
import keyboard from "./pp.vue";
import { stepList ,keyname } from "../stepList/StepNine";
import { setPiano } from "../util/size";
//import highlight from "../components/function2.vue"
export default {
  components: {
    keyboard,
  },
  props: {
    interval: {
      type: Number,
      default: 20,
    },
    
  },
  data() {
    return {
      opacity:1,
      msg: false,
      //默认false 弹框隐藏状态    

      musicUrl: "",
      virtualUrl: "",
      port: null,
      keepReading: false,
      reader: null,
      dataArray: [],
      stepIndex: 0,
      isAnswer:true, //number of question
      tone: 0,
      displaytone: 0,
      name: "",
      sex: "",
      age: "",
      //得分板
      score: 0,
      onesscore:0,
      tensscore:0,
      //题目序号
      tensnum:0,
      onesnum:0,

      MajorName:["C大调","D大调","E大调","F大调","G大调","A大调","B大调"],
      stepList,
      keyname:keyname,
      start: false,
      
      myKey: 0,
      Majorindex: 0,
      //answerman image src
      imgSrc:[require('../assets/f1/normal.png'),require('../assets/f1/yes.png'),require('../assets/f1/no.png'),],
      logicstate:0,
      va:0,  //keycode数组序号
      items:'?', //test答案

      //standard变色
      isChange:false,

    };
  },
  computed: {
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
  },
  methods: {
    //处理键盘得到的键号逻辑
    getMyKey(e) {
      this.myKey = e[0];
      console.log(this.myKey);
      //print the count of key
      const audio2 = this.$refs.virtual;
      this.virtualUrl = require(`../assets/audio/${this.myKey}.wav`);
      audio2.load();
      audio2.play();
      //musicplay
      if(this.stepIndex<=this.stepList.length){
        if (this.tone != 0) {
        //比较逻辑
        if (this.tone == this.myKey) {
          console.log('ok');
          this.score+=1;
          this.logicstate=1;
          //correct
        } else {
          this.logicstate=2;

        }
        this.va=this.tone-28;
        this.items=keyname[this.va];     
        this.onesscore=this.score%10;
        this.tensscore=Math.floor(this.score/10);
        this.tone = 0; 
        this.isAnswer=true;  
      }
      else{
        // this.isAnswer=false;
      }
      }
      
    },

    getmajor(e) {
      this.Majorindex=e;      
    },

    startstep(){
      const audio=this.$refs.audio;
      if(this.tone==0){
      this.tone = Math.floor(Math.random()*36)+28;
      this.displaytone = this.tone;
      }
      console.log("当前音阶是：" + this.tone);
      this.musicUrl = require(`../assets/audio/${this.tone}.wav`);
      audio.load();
      audio.play();
      if(this.tone!=0&&this.isAnswer==true){
        if(this.stepIndex<this.stepList.length){
        this.stepIndex+=1;
        this.onesnum=this.stepIndex%10;
        this.tensnum=Math.floor(this.stepIndex/10);
        this.logicstate=0;
        this.items='?';
        this.isAnswer=false;
      }else{
        alert("您的得分是" + this.score);
      }
      }
      
    },

    changeFlag(){
      this.msg = !this.msg
      this.getMyKey(49);
    },

    standardplay(){
      const audio=this.$refs.audio;
      this.musicUrl = require(`../assets/audio/49.wav`);
      audio.load();
      audio.play();
      this.$refs.keyboard.change();
    },

    jump(){
      this.$router.replace('/piano');
      console.log('jumpisok');
    }

 
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html{
  font-style: 20px;
}
.body{
  -webkit-user-select:none ;
-moz-user-select:none;
user-select:none;

}
.StepFirst {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/f1/背景图.png");
  min-width: 1000px;
}
.mid{
  width: 100%;
  position: relative;
  top: 5%;
  border: 0px solid ;
  display: flex;
  justify-content: center;
  align-items: center;
}

.standard1 img{
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.standard1{
  position:absolute;
  left: 50px;
  top: 50%;
  transform:translate(0, -50%);
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  margin-right: 0;
  overflow: hidden;
  z-index: 5;
}

.guide1 {
  margin: 20px auto;
  text-align: center;
  height: 0;
  width: 45%;
  padding-bottom: 25%;
  position: relative;
  align-self: center;
}
.test1{
  position: absolute;
  right: 30px;
  top: 50%;
  transform:translate(0, -50%);
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  margin-right: 0;
  overflow: hidden;
  z-index: 5;
}
.test1 img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  cursor: pointer;
}
.question1{
  width: 100%;
  height: 65%;
  position: absolute;
  top: 0;
  left: 50%;
  transform:translate(-50%, 0);
  text-align: center;
  font-size: 6vw;
  font-weight: bold;
  color: #0da733;
}
.question1 p{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.ansman1{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 50%;
  padding-right: 25%;
}

.board1{
  position: absolute;
  top: 0;left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  align-self: center;
}
.board1 img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  
}

.score1,
.number1{
  width: 20%;
  height: 33.34%;
  position: absolute;
}
@media screen and (max-width: 1700px){
  .score1,
  .number1{
    top: 45%;
  }
}
@media screen and (min-width: 1700px){
  .score1,
  .number1{
    top: 46%;
  }
}
.guide1 span{
  width: 50%;
text-align: center;
font-size: 6vw;
font-weight: bold;
position: absolute;
top: 50%;
transform: translateY(-50%);
}
.score1{
  left: 27%;
}
.score1 span{
color: #0da733;
}
.score1 :first-child{
  left: 0%;
}
.score1 :last-child{
  left: 48%;
}
.number1{
  right: 27%;
}
.number1 span{
color: #0a83ee;
}
.number1 :first-child{
right: 48%;
}
.number1 :last-child{
  right: 0%;
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
.ul {
  padding: 10px;
  background-color: lightpink;
  margin-right: 20px;
  width: 100px;
  border-radius: 20px;
}


.act {
        background-color: skyblue;
      }

      .point-state {
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: #eee;
      margin-left: 10px;
    }
    .outline {
      background: #d9001b;
    }
    .online {
      background: #10c504;
      box-shadow: 1px 1px 10px #b5ffae;
    }

.spark{
  background-color: #10c504;
  width:40px;
}

.high{
  margin-left: 380px;
  margin-top: 650px;
}
</style>