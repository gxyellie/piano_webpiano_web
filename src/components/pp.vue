<template>
    <div 
    class="keyboard" 
    ref="keyboard" 
    :style="{ transform: `scale(${scale}) translateX(-${left}px)` }"
    :class="{ hidenum: !cacheConf.showKbdNum }">
    <audio ref="virtual">
      <source :src="virtualUrl" />
    </audio>
        <div class="pianowrap">
            <div class="whitegroup">
                <div class="wkey" v-for="note in whitekeys" :key="note.keyCode" :data-keyCode="note.keyCode" :data-name="note.name" :data-index="note.id"
                @click="playmusic($event,note.id,note.name)">
                     <div class="notesname" >
                        <div class="keyname" >
                        <p v-html="note.name"></p>
                        </div>
                     </div>
                </div>
            </div>

            <div class="blackgroup broup1">
                <div class="bkey" v-for="note in blackkeys1" :key="note.keyCode" :data-keyCode="note.keyCode" :data-name="note.name" :data-index="note.id"
                @click="playmusic($event,note.id,note.name)" >                    
            </div>

            </div>
            <div class="blackgroup broup2">
                <div class="bkey" v-for="note in blackkeys2" :key="note.keyCode" :data-keyCode="note.keyCode" :data-name="note.name" :data-index="note.id"
                @click="playmusic($event,note.id,note.name)">                    
                </div>

            </div>
            <div class="blackgroup broup3">                
                <div class="bkey" v-for="note in blackkeys3" :key="note.keyCode" :data-keyCode="note.keyCode" :data-name="note.name" :data-index="note.id"
                @click="playmusic($event,note.id,note.name)">                    
                </div>
            </div>


        </div>
        
    </div>
</template>


<script>
import {blackkeys1, blackkeys2, blackkeys3, whitekeys} from '../util/notes' 
import store from "../store";
import { keyname } from '../stepList/StepNine';
 export default{
    name:'tpiano',
    data(){
        return{
            scale:1,
            left:0,
            mykey:0,
            pianoShow:false,
            whitekeys:whitekeys,
            blackkeys1:blackkeys1,
            blackkeys2:blackkeys2,
            blackkeys3:blackkeys3,
            virtualUrl:"",
            props:{
                ischange:{
                    type:Boolean,
                    required:true,
                }
            },
        }
        
    },

    computed: {
         cacheConf() {
      return store.state.cacheConf;
         },
         
     },

     mounted(){
        this.initPiano();
     },

     methods:{
        async initPiano() {
      setTimeout(() => {
        this.computedpiano();
        this.pianoShow = true
      }, 300)
      /* this.bindKeyBoradEvent() */
      

    //   this.synth = SmapleLibrary.load({
    //     instruments: "piano"
    //   }).toMaster()

      // this.synth = new Tone.PolySynth( 10 ).toMaster()
    },

    computedpiano(){
        var box=document.querySelectorAll(".whitegroup .notesname .keyname");
        for(var i=0;i<21;i++){
            var box1=box[i];
            var h=box1.clientHeight;
            box1.style.width=h+"px";
        }
        var n=document.querySelectorAll(".whitegroup .notesname .keyname p")
        for(var i=0;i<21;i++){
            var n1=n[i];
            n1.style.lineheight=h+"px";

        }
    },

    playmusic(e,id,code){
      this.mykey=id;
      console.log("play",id);
      this.$emit('send',[id,code])

    },
    change(){
        var nn=document.querySelector(".whitegroup :nth-child(13) .notesname .keyname");
        var standardkey=document.getElementsByClassName("wkey");
        console.log(nn);
        nn.style.background='#0c00ff';
        setTimeout(
            function(){
                nn.style.background='#409EFF'; 
            },1000
        )
    }
    

    

     }
 }

</script>

<style>
.keyboard{
    width: 100%;
    height: 33.3%;
    position: absolute;
    bottom: 15px;
}
.pianowrap{
    width: 100%;
    height: 100%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    
}
.whitegroup{
    width: 100%;
    height: 100%;
    z-index: 2;
}
.wkey{
    display: inline-block;
    height: 100%;
    width: 4.76%;
    background-color: #fff;
    background:linear-gradient(-30deg,#f5f5f5,#fff);
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 0 0 15px 15px;
}
.wkey:hover{
    box-shadow: 0px 0px 10px 10px rgba(247, 192, 42, 0.5) inset;
    
}
.bkey:hover{
    box-shadow: 0px 0px 10px 10px rgba(47, 151, 255, 0.5) inset;
}
.notesname{
    width: 4.76%;
    height: 15%;
    position: absolute;
    /* background-color: #fff; */
    bottom: 5%;
    text-align: center;
    font-size: 1.5vw;
}
.keyname{
/*     width: 66.7%; */
    height: 100%;
    margin-bottom: 5px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
}
.keyname p{
       height: 100%;
}
.whitegroup :nth-child(-n+14):nth-child(n+8) .keyname{
    background-color: #409EFF;
}
.whitegroup :nth-child(-n+7) .keyname{
    background-color: #FA8C35;
}

.whitegroup :nth-child(-n+21):nth-child(n+15) .keyname{
    background-color: #5CB87A;
}
.blackgroup{
    width: 33.3%;
    height: 70%;
    position: absolute;
    top: 0;
}
.broup1{
    left: 0;
    z-index: 4;
    /* position: absolute;
    top: 0; */
}
.broup2{
    left: 33.4%;
    z-index: 4;
}
.broup3{
    left: 66.7%;
    z-index: 4;
}
.bkey{
    display: inline-block;
    height: 100%;
    width: 10%;
    background:linear-gradient(-20deg,#333,#000,#333);
    position: absolute;
    top: 0;
    
}
.bkey:nth-child(1) { left: 9%; }
.bkey:nth-child(2) { left: 23%; }
.bkey:nth-child(3) { left: 51%; }
.bkey:nth-child(4) { left: 66%; }
.bkey:nth-child(5) { left: 80%; }


</style>