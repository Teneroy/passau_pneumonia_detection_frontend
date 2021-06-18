<template>
  <div>
    <p class="result-block">{{msg}}</p>
    <p class="error"></p>
    <button id="error_button" class="action-button" v-on:click="sendData(true)">I am sure, just do it!</button>
    <button id="sending_button" class="action-button" v-on:click="sendData(false)">Predict</button>
  </div>
</template>

<script>

import ImageProcessingService from '@/services/ImageProcessingService.js';

export default {
  name: "DataProcessingFrame",
  props: {
    image: String
  },
  data() {
    return {
      probability: 0,
      existence: false,
      evaluated: false
    }
  },
  created() {
    this.probability = 0;
    this.existence = false;
    this.evaluated = false;
  },
  computed: {
    msg : function () { return !this.evaluated ? '' : (this.existence ? 'Pneumonia presents on this picture with probability of ' + this.probability + ' percent'
        : 'Pneumonia does not present on this picture with probability of ' + this.probability + ' percent') }
  },
  methods: {
    sendData(forced) {
      const preloader = document.querySelector('.preloader-block');
      const resultBlock = document.querySelector('.result-block');
      const errorBlock = document.querySelector('.error');
      const sendingButton = document.querySelector('#sending_button');
      const errorButton = document.querySelector('#error_button');

      sendingButton.style.display = 'inline-block';
      errorButton.style.display = 'none';

      if(this.image == null) {
        errorBlock.textContent = 'Please, upload an image';
        errorBlock.style.display = 'flex';
        return;
      }

      resultBlock.classList.remove('result-detected');
      preloader.style.display = 'block';
      resultBlock.style.display = 'none';
      errorBlock.style.display = 'none';

      const size = ImageProcessingService.extractImageSizeById('data_image');
      const image = ImageProcessingService.readImageById('data_image');
      const rgbImage = ImageProcessingService.rgbImage(image);
      const resizedImage = ImageProcessingService.resizeImage(rgbImage);

      ImageProcessingService.predictPneumonia(resizedImage, size, forced).then(response => {
        console.log(response.data);
        if(!response.data.isXray) {
          errorBlock.textContent = 'It seems that this is not a chest x-ray image. Are you sure you want to evaluate it?';
          errorBlock.style.display = 'flex';
          preloader.style.display = 'none';
          sendingButton.style.display = 'none';
          errorButton.style.display = 'inline-block';
          return;
        }
        resultBlock.style.display = 'flex';
        this.probability = response.data.probability.toFixed(4);
        this.existence = response.data.existence;
        this.evaluated = true;
        if(this.existence)
          resultBlock.classList.add('result-detected');
        preloader.style.display = 'none';
      });
    }
  }
}
</script>

<style scoped>
.action-button {
  background-color: transparent;
  border: 1px solid #75aeca;
  border-radius: 3px;
  color: #548eaa;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  height: 36px;
  line-height: 36px;
  margin-top: 18px;
  padding: 0 13px;
  text-decoration: none;
  transition: 0.3s all;
}

.action-button:hover {
  background-color: #7aa1bd;
  border: 1px solid transparent;
  color: #fff;
}

.result-block, .error {
  width: auto;
  background-color: #0093d517;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: sans-serif;
  border: 1px solid #75aeca;
  color: #008dc9;
  transition: .3s all;
}

.result-detected, .error {
  background-color: #dc143c52;
  border-color: darkred;
  color: darkred;
}

#error_button {
  display: none;
}
</style>