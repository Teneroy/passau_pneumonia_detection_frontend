<template>
  <main>
    <section>
      <article>
        <h1>Pneumonia detection system</h1>
        <p>
          This system is aimed on pneumonia detection. You should upload JPEG or PNG images into the related field.
          <b><i>This system does not replace the proper diagnostic.</i></b>
            It can assist professionals to make a diagnosis as well as being a help for people who ae not able to get to the medical professionals.
        </p>
      </article>
    </section>

    <DataFrame />
  </main>
</template>

<script>
import DataFrame from "@/components/DataFrame";
export default {
  name: "Home",
  components: {DataFrame}
}
</script>

<style scoped>

</style>