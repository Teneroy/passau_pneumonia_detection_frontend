<template>
  <section id="data_frame_widget">
    <DropAnImage />
  </section>
</template>

<script>
import DropAnImage from "@/components/DropAnImage";
export default {
  name: "DataFrame",
  components: {DropAnImage}
}
</script>

<style scoped>

#data_frame_widget {
  min-height: 200px;
  margin: auto;
}

</style>