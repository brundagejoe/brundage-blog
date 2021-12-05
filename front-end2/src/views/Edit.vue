<template>
<div class="Edit">
  <h1>Article Editor</h1>

  <div class="add">
    <h2>Add Blog Post</h2>
    <div class="form">
      <input v-model="title" placeholder="Article Title">
      <p></p>
      <input v-model="author" placeholder="Author">
      <p></p>
      <input v-model="date" placeholder="Date (Month #, YYYY)">
      <p></p>
      <textarea v-model="article" placeholder="Post"></textarea>
      <p></p>
      <button @click="upload">Post</button>
    </div>
    <div class="article-uploaded" v-if="addItem">
      <h3>Added article: {{addItem.title}}</h3>
    </div>
  </div>

  <div class="delete">
    <h2>Edit/Delete Blog Post</h2>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}} by {{s.author}} ({{s.date}})
          </div>
        </div>
      </div>
    </div>

    <div class="upload" v-if="findArticle">
      <input v-model="findArticle.title">
      <p></p>
      <input v-model="findArticle.author">
      <p></p>
      <input v-model="findArticle.date">
      <p></p>
      <textarea v-model="findArticle.article"></textarea>
    </div>

    <div class="actions" v-if="findArticle">
      <button @click="editArticle(findArticle)">Edit</button>
      <p></p>
      <button @click="deleteArticle(findArticle)">Delete</button>
    </div>
  </div>

  <h1>Author Editor</h1>
  <div class="add">
    <h2>Add author</h2>
    <div class="form">
      <input v-model="authorName" placeholder="Author Name">
      <p></p>
      <input v-model="location" placeholder="Place of Residence">
      <p></p>
      <textarea v-model="biography" placeholder="Biography"></textarea>
      <p></p>
      <button @click="addAuthor">Add</button>
    </div>
    <div class="author-uploaded" v-if="addedAuthor">
      <h3>{{addedAuthor.name}} is now registered as an author.</h3>
    </div>
  </div>

  <div class="delete">
    <h2>Edit/Delete Author</h2>
    <div class="edit">
      <div class="suggestions">
        <div class="suggestion" v-for="a in authors" :key="a.id" @click="selectAuthor(a)">{{a.name}}
        </div>
      </div>
    </div>

    <div class="upload" v-if="findAuthor">
      <input v-model="findAuthor.name">
      <p></p>
      <input v-model="findAuthor.location">
      <p></p>
      <textarea v-model="findAuthor.biography"></textarea>
    </div>

    <div class="actions" v-if="findAuthor">
      <button @click="editAuthor(findAuthor)">Edit</button>
      <p></p>
      <button @click="deleteAuthor(findAuthor)">Delete</button>
    </div>

    <div class="space">
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Edit',
  data() {
    return {
      title: "",
      author: "",
      date: "",
      article: "",
      addItem: null,
      articles: [],
      findTitle: "",
      authors: [],
      findArticle: null,
      authorName: "",
      biography: "",
      location: "",
      addedAuthor: null,
      findAuthorName: "",
      findAuthor: null
    }
  },
  computed: {
    suggestions() {
      let articles = this.articles.filter(article => article.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return articles.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getArticles();
    this.getAuthors();
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/articles', {
          title: this.title,
          author: this.author,
          date: this.date,
          article: this.article
        });
        this.addItem = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAuthors() {
      try {
        let response = await axios.get('/api/authors');
        this.authors = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getArticles() {
      try {
        let response = await axios.get('/api/articles');
        this.articles = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(article) {
      this.findTitle = "";
      this.findArticle = article;
    },
    selectAuthor(author) {
      this.findAuthorName = "";
      this.findAuthor = author;
    },
    async deleteArticle(article) {
      try {
        await axios.delete('/api/articles/' + article._id);
        this.findArticle = null;
        this.getArticles();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editArticle(article) {
      try {
        await axios.put('/api/articles/' + article._id, {
          title: this.findArticle.title,
          author: this.findArticle.author,
          date: this.findArticle.date,
          article: this.findArticle.article
        });
        this.findArticle = null;
        this.getArticles();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addAuthor() {
      console.log("in addAuthor")
      try {
        let r1 = await axios.post('/api/authors', {
          name: this.authorName,
          location: this.location,
          biography: this.biography
        });
        this.addedAuthor = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async editAuthor(author) {
      try {
        await axios.put('/api/authors/' + author._id, {
          name: author.name,
          location: author.location,
          biography: author.biography,
        });
        this.findAuthor = null;
        this.getAuthors();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAuthor(author) {
      try {
        await axios.delete('/api/authors/' + author._id);
        this.findAuthor = null;
        this.getAuthors();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }

}
</script>

<style media="screen">
input,
textarea,
select,
button {
  font-family: 'Garamond', serif;
  font-size: 1em;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  margin: 1em auto;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.space {
  margin: 5em;
}
</style>
