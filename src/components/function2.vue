<template>
  <div class="StepFirst" ref="piano">
    

    <audio ref="audio">
      <source :src="musicUrl" />
    </audio>
    <audio ref="virtual">
      <source :src="virtualUrl" />
    </audio>
    <div style="position: absolute; top: 20px; left: 20px">
      <img @click="$router.replace('/piano')" src="../assets/f1/arrow.png" alt="" style="width: 20px;height: 30px;cursor: pointer;">
    </div>
    
    <div class="mid">
      <div class="standardselect">
        <div class="up">
          <img src="../assets/f2/uparrow.png" alt="" class="left" @click="up">
          <img src="../assets/f2/uparrow.png" alt="" class="right"  @click="majorup">
        </div>
        <div class="standard">
      <img src="../assets/f2/standard.png" @click="standardplay" alt="">
      <span class="count">
        <p>{{ num }}</p>
      </span>
      <div class="name">
        <p>{{mm}}</p>
        <p v-show="visible" class="guobiao">国标音</p>
      </div>
        </div>
        <div class="down">
          <img src="../assets/f2/downarrow.png" alt="" class="left" @click="down">
          <img src="../assets/f2/downarrow.png" alt="" class="right" @click="majordown">
        </div>

      </div>
    
    <div class="guide2">
      <div class="board2">
        <img src="../assets/f2/board.png" alt="" style="width: 100%;height: 100%;">
      </div>
      <div class="score2"><!--得分-->
        <span class="tens" data-score="tensscore">
            {{ tensscore }}
        </span>
        <span class="ones" data-score="onesscore">
          {{ onesscore }}
        </span>
      </div>
      <div class="number2"><!--题目总数-->
        <span class="tens" data-score="tensnum">
            {{ tensnum }}
        </span>
        <span class="ones" data-score="onesnum">
          {{ onesnum }}
        </span>
      </div>
      <div class="ansman2">
        <img :src="imgSrc[logicstate]" alt="" style="width: 100%;height: 100%;position: absolute;">
        
      </div>
      <div class="majorq">
        <img src="../assets/f2/Q.png" alt="" style="width: 100%;height: 100%;">
        <div class="clear">
        <div class="ans">{{ correct }}</div>
      </div>
      </div>
    </div>

    <div class="test2">
        <img src="../assets/f1/test.png" alt="" @click="startstep" >
        <div class="question2">
          <p class="ques">{{ items }}</p>
        </div>
    </div>
    </div>

    <keyboard @send="getMyKey" ></keyboard>
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
      //默认false 弹框隐藏状态    
      visible: true,
      mark:5,
      //得分板
      onesscore:0,
      tensscore:0,
      //题目序号
      tensnum:0,
      onesnum:0,
      //回答对错判断
      imgSrc:[require('../assets/f1/normal.png'),require('../assets/f1/yes.png'),require('../assets/f1/no.png'),],
      logicstate:0,

      items:'?',
      singnum:0,//大调中的第几个
      correct:'?',//横大调=？
      musicUrl: "",
      virtualUrl: "",
      dialogResVisible: false,
      dialogFormVisible: false,
      keepReading: false,
      reader: null,
      dataArray: [],
      index: -1,
      stepIndex: 0,
      isAnswer:true,
      Major: 0,
      currentmajor: 0,

      fields: {
        得分: "score",
      },
      MajorName:["C","D","E","F","G","A","B"],
      SingName:["Do","Re","Mi","Fa","Sol","La","Si"],
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
      myName:0,
      num:6,
      mm:'A',
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

    getMyKey(e) {
      this.myKey = e[0];
      this.va=this.tone-28;
      this.myName=e[1];
      console.log(this.myName);
      //虚拟键盘

      if(this.stepIndex<=this.stepList.length){
        if (this.Major != 0) {
        //比较逻辑
        if (this.currentmajor == this.myName) {
          this.score+=1;
          this.logicstate=1;
          //correct
        } else {
          this.logicstate=2;

        }
        this.onesscore=this.score%10;
        this.tensscore=Math.floor(this.score/10);
        this.correct=this.currentmajor;
        this.Major = 0; 
        this.currentmajor=0;
        this.singnum=0;
        this.isAnswer=true;  
      }
      else{
        const audio2 = this.$refs.virtual;
      this.virtualUrl = require(`../assets/audio/${this.myKey}.wav`);
      audio2.load();
      audio2.play();
      console.log(this.isAnswer);
      }

      }
    },

    startstep(){
      const audio=this.$refs.audio;
      if(this.Major==0){
      this.Major = Math.floor(Math.random()*7)+1;
      this.singnum=Math.floor(Math.random()*7+1);
      this.currentmajor=this.MajorName[this.Major-1];
      this.items=this.SingName[this.singnum-1];
      console.log("click" + this.Major);
      console.log("click" + this.isAnswer);

}
      this.musicUrl = require(`../assets/audio/sing/major${this.currentmajor}${this.singnum}.wav`);
      audio.load();
      audio.play();
      console.log("当前大调是：" + this.MajorName[this.Major-1]);
      console.log(this.items);
      if(this.Major!=0&&this.isAnswer==true){
        if(this.stepIndex<this.stepList.length){
        this.stepIndex+=1;
        this.onesnum=this.stepIndex%10;
        this.tensnum=Math.floor(this.stepIndex/10);
        this.logicstate=0;
        this.isAnswer=false;
        this.correct='?';
      }else{
        alert("您的得分是" + this.score);
      }
    }

    },

    standardplay(){
      const audio=this.$refs.audio;
      this.musicUrl = require(`../assets/audio/sing/major${this.mm}${this.num}.wav`);
      audio.load();
      audio.play();
      console.log("play",this.mm,this.num);
    },

    up(){ 
      if(this.num<7){
        this.num++;
        console.log(this.num);
      }
      else {
        this.num=1;
      }
    },
    down(){
      if(this.num>1 ){
        this.num-=1;
        console.log(this.num);
      }
      else {
        this.num=7;
      }
    },
    majorup(){
   
      if(this.mark>0&&this.mark<6){
        this.mark++;
        console.log(this.mark);
        if(this.mark!=5){
          this.visible=false;
        }else{
          this.visible=true;
        }
      }
      else {
        this.mark=0;
        console.log(this.mark);
      }
      this.mm=this.MajorName[this.mark];
    },

    majordown(){
      if(this.mark>0&&this.mark<7){
        this.mark--;
        console.log(this.mark);
        if(this.mark!=5){
          this.visible=false;
        }else{
          this.visible=true;
        }
      }
      else {
        this.mark=6;
        console.log(this.mark);
      }
      this.mm=this.MajorName[this.mark];
    }
  },
};
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
  background-image: url("../assets/f1/背景图.png");
  min-width: 1000px;
}
.mid{
  width: 100%;
  position: relative;
  top: 50px;
  border: 0px solid ;
  display: flex;
  justify-content: center;
  align-items: center;
}
.standardselect{
  position:absolute;
  left: 50px;
  top:50%;
  transform:translate(0, -50%);
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  margin-right: 0;
  overflow: hidden;
  z-index: 5;
}
.standard{
  width: 100%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0;

}
.standard img{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.name,
.count{
  display: inline-block;
  height: 100%;
  text-align: center;
  z-index: 3;
  font-size: 5vw;
  font-weight: bold;
  color: #0c00ff;
  position: absolute;
  
}
.count{
  width: 25%;
  left: 2%;
}
.count>*{
  width: 100%;
  position: absolute;
  top: 50%;
  transform:translateY(-50%);
}
.name{
 right: 0;
 width: 40%;
} 

.name :first-child{
  width:100%;
  position:absolute;
  top:50%;
  transform:translateY(-50%);
}
.name :last-child{
  width: 100%;
  font-size: 1vw;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom:10%;
  letter-spacing: 1px;
  opacity: 0.5;
}
.up,
.down{
  width: 100%;
  height: 25%;
  position: absolute;
  left: 0;
  cursor: pointer;
}
.up{
  top: 0;
}
.up img{
  bottom: 0;
}
.down{
  bottom: 0;
}
.down img{
  top: 0;
}
.left {
  height: 50%;
  width: 25%;
  position: absolute;
  left: 2%;
/*   transform: translateY(-50%); */
}

.right{
  height: 50%;
  width: 40%;
  position: absolute;
  right: 0%;
/*   transform: translateY(-50%); */
}


.guide2 {
  margin: 20px auto;
  text-align: center;
  height: 0;
  width: 45%;
  padding-bottom: 25%;
  position: relative;
  align-self: center;
}
.test2{
  position: absolute;
  right: 30px;
  top: 50%;
  transform:translate(0, -50%);
  width: 20%;
  height: 0;
  padding-bottom: 20%;
  margin-right: 0;
  overflow: hidden;
}
.test2 img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  cursor:pointer;
}
.question2{
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
.question2 p{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.ansman2{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 50%;
  padding-right: 25%;
}
.board2{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  align-self: center;
}
.board2 img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.score2,
.number2{
  width: 20%;
  height: 33.34%;
  position: absolute;
}
@media screen and (max-width: 1700px){
  .score2,
  .number2{
    top: 45%;
  }
}
@media screen and (min-width: 1700px){
  .score2,
  .number2{
    top: 46%;
  }
}
.guide2 span{
  width: 50%;
/* height: 100%; */
text-align: center;
font-size: 6vw;
font-weight: bold;
position: absolute;
top: 50%;
transform: translateY(-50%);
}
.score2{
  left: 27%;
}
.score2 span{
color: #0da733;
}
.score2 :first-child{
  left: 0%;
}
.score2 :last-child{
  left: 48%;
}
.number2{
  right: 27%;
}
.number2 span{
color: #0a83ee;
}
.number2 :first-child{
right: 48%;
}
.number2 :last-child{
  right: 0%;
}
.majorq{
  position: absolute;
  left: 50%;
  bottom: -20%;
  transform: translateX(-50%);
  z-index: 5;
}
.majorq .clear{
  width: 100%;
}
.majorq .ans{
  width: 11%;
  height: 26.7%;
  position: absolute;
  right:19%;
  top: 50%;
  transform: translateY(-50%);
  color:#fff;
  font-size: 2vw;
  font-weight: bold;
  text-align: center;
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
  margin:10px;
}

.imgs{
  margin:40px;
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