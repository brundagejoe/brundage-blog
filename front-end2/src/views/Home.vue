<template>
<div class="home">
  <h1>Featured Articles</h1>

  <div class="article-info" v-for="article in articles.reverse()" :key="article.id">
    <h2>{{article.title}}</h2>
    <p id="author-info">Written by {{article.author}} on {{article.date}}</p>
    <p id="featured-summary">{{article.article}}</p>
  </div>

</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      articles: [],
    }
  },
  created() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      try {
        let response = await axios.get("/api/articles");
        this.articles = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style media="screen">
.article-info {
  /* background-color: #F0f0f0; */
  margin: auto 20em;
  margin-bottom: 3em;
}

#author-info {
  margin-top: -1em;
}

#featured-summary {
  margin-top: -.5em;
  text-align: justify;
}

@media only screen and (max-width: 600px) {
  .article-info {
    margin-left: 1.5em;
    margin-right: 1.5em;
  }
}
</style>
