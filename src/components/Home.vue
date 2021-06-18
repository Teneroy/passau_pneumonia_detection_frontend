<template>
  <main>
    <section >
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
  main {
    max-width: 1100px;
    min-width: 500px;
    width: 60%;
    margin: auto;
    background-color: #fff;
    padding: 0 20px 20px 20px;
    box-shadow: 0 2px 2px rgba(0,0,0,.2);
  }

  p {
    text-align: justify;
  }

  h1 {
    background-color: rgba(0,141,201,0.85);
    color: #ffffff;
    padding: 20px;
    margin-left: -20px;
    margin-right: -20px;
    font-size: 24px;
  }
</style>