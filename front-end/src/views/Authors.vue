<template>
<div class="authors">
  <h1>Authors</h1>

  <div class="author-info" v-for="author in authors" :key="author.id">
    <h2>{{author.name}}</h2>
    <p>{{author.location}}</p>
    <p>{{author.biography}}</p>
  </div>

</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Authors',
  data() {
    return {
      authors: [],
    }
  },
  created() {
    this.getAuthors();
  },
  methods: {
    async getAuthors() {
      try {
        let response = await axios.get("/api/authors");
        this.authors = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style media="screen">

.author-info p {
  margin-top: -1em;
  margin-left:25em;
  margin-right: 25em;
}

.author-info {
  margin-bottom: 3em;
}

@media only screen and (max-width: 600px) {
  .author-info p {
    margin-left: 1.5em;
    margin-right: 1.5em;
  }
}


</style>
