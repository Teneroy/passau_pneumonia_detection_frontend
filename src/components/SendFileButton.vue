<template>
  <div>
    <button class="action-button" v-on:click="sendData">Predict</button>
  </div>
</template>

<script>

import ImageProcessingService from '@/services/ImageProcessingService.js';

export default {
  name: "SendFileButton",
  props: {
    image: String
  },
  methods: {
    sendData() {
      const size = ImageProcessingService.extractImageSizeById('data_image');
      const image = ImageProcessingService.readImageById('data_image');
      const grayScaleImage = ImageProcessingService.grayScaleImage(image);
      const resizedImage = ImageProcessingService.resizeImage(grayScaleImage);
      ImageProcessingService.predictPneumonia(resizedImage, size).then(response => {
        console.log(response);
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
</style>