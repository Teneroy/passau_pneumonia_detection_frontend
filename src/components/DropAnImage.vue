<template>
  <article>
    <div class="drop"
         :class="getClasses"
         @dragover.prevent="dragOver"
         @dragleave.prevent="dragLeave"
         @drop.prevent="drop($event)">

      <img id="data_image" :src="imageSource" v-if="imageSource" />
      <h1 v-if="wrongFile">Wrong file type</h1>
      <h1 v-if="!imageSource && !wrongFile">Drop an image</h1>
    </div>
    <DataProcessingFrame ref="dataProcessingFrame" :image=imageSource />
  </article>
</template>



<script>
import DataProcessingFrame from "@/components/DataProcessingFrame";
export default {
  name: 'DropAnImage',
  components: {DataProcessingFrame},
  data(){
    return {
      isDragging:false,
      wrongFile:false,
      imageSource:null
    }
  },
  computed:{
    getClasses(){
      return {isDragging: this.isDragging}
    }
  },
  methods:{
    dragOver(){
      this.isDragging = true
    },
    dragLeave(){
      this.isDragging = false
    },
    drop(e){
      this.$refs.dataProcessingFrame.evaluated = 0;
      const resultBlock = document.querySelector('.result-block');
      const errorBlock = document.querySelector('.error');
      document.querySelector('#sending_button').style.display = 'inline-block';
      document.querySelector('#error_button').style.display = 'none';

      resultBlock.style.display = 'none';
      errorBlock.style.display = 'none';
      let files = e.dataTransfer.files
      this.wrongFile = false
      // allows only 1 file
      if (files.length === 1) {
        let file = files[0]
        // allows image only
        if (file.type.indexOf('image/') >= 0) {
          var reader = new FileReader()
          reader.onload = f => {
            this.imageSource = f.target.result
            this.isDragging = false
          }
          reader.readAsDataURL(file)
        }else{
          this.wrongFile = true
          this.imageSource = null
          this.isDragging = false
        }
      }
    },
    onRequestUploadFiles(){

    }
  }
}
</script>



<style scoped>
.drop{
  width: auto;
  height: 100%;
  background-color: #0093d517;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: background-color .2s ease-in-out;
  font-family: sans-serif;
  border: 1px solid #75aeca;
  color: #008dc9;
}

.drop h1 {
  padding: 2rem;
}

.isDragging{
  background-color: #999;
  border-color: #fff;
}
img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>