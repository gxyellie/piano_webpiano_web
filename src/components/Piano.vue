<template>
  <div ref="piano" class="piano">
    
    <div class="header">
      <div class="navi">
        <img src="../assets/nav/title.png" alt="" class="title">
      </div>
    </div>


    <div class="box">
      <!-- <div slot="header" class="header"> -->
        <div class="navi">
          <img @click="testf1" src="../assets/nav/1.png" alt="" class="function">
          <img @click="testf2" src="../assets/nav/2.png" alt="" class="function">
        </div>
      <!-- </div> -->
    </div>

    <div class="footer">
      <div class="ins">
        <img src="../assets/nav/instrument.png" alt="">
      </div>
   
    </div>
    

    
    

    
  </div>
</template>
<script>
export default {
  methods: {
    testf1() {
      this.$router.replace("/f1");
    },
    testf2() {
      this.$router.replace("/f2");
    },
    testf3(){
      this.$router.replace("/f3");
    } 

    
  },
  // mounted() {
  //   setInterval(() => {
  //     console.log(11)

  //                   }, 1000);
  //   }

};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.body{
  -webkit-user-select:none ;
-moz-user-select:none;
user-select:none;

}
div{
  box-sizing: border-box;
}
.html{
  height: 100%;
}
.piano{
  min-width: 1000px;
  min-height: 500px;
}
.box{
  margin: auto
}
.title{
  max-height: 100%;
  min-height: 100px;
  width: auto;
}
.navi{
width: 100%;
margin: 20px;
margin-left:0;
text-align: center;
}
.header{
  width: 100%;
  height: 16%;
  margin-top: 6%;
}
.header .navi{
  width: 100%;
  height: 100%;
  min-height: 120px;
  background-color: rgba(255,255,255,0.5);
  display: flex;
  justify-content: center;
}
.box{
  width: 100%;
  height: 33%;
}
.box .navi{
  height: 100%;
  display: flex;
  justify-content: center;
}
.box .navi .function{
  max-height: 100%;
  height: auto;
  width: auto;
  cursor:pointer;
}
.footer{
  width: 100%;
  height: 33%;
  margin:auto;
text-align: center;
position: absolute;
bottom: 0;
background-image: url("../assets/nav/instrubg.png");
  background-size: cover;
} 
.footer .ins{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 90%;
  margin: auto;
}
.footer .ins img{
  width: 100%;
  height: 100%;

}

.function{
  width: 240px;
  height: 240px;
  padding: 40px;
}
.body {
  color: #909399;
  font-size: 18px;
}
.btn {
  padding: 10px 20px;
  float: right;
}
.piano {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/nav/bg.png");
  overflow: hidden;
}


</style>
