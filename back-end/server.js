const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
  useNewUrlParser: true
});

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: String,
  article: String
});

const authorSchema = new mongoose.Schema({
  name: String,
  location: String,
  biography: String
})

const Article = mongoose.model('Article', articleSchema);

const Author = mongoose.model('Author', authorSchema);

app.post('/api/articles', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    article: req.body.article
  });
  try {
    await article.save();
    res.send(article);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    let articles = await Article.find();
    res.send(articles);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    let article = await Article.findOne({
      _id: req.params.id
    });
    article.title = req.body.title;
    article.author = req.body.author;
    article.date = req.body.date;
    article.article = req.body.article;
    article.save();
    await Article.findOne({
      _id: req.params.id
    });
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    await Article.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api/authors', async (req, res) => {
  const author = new Author({
    name: req.body.name,
    location: req.body.location,
    biography: req.body.biography
  });
  try {
    await author.save();
    res.send(author);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/authors', async (req, res) => {
  try {
    let authors = await Author.find();
    res.send(authors);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.put('/api/authors/:id', async (req, res) => {
  try {
    let author = await Author.findOne({
      _id: req.params.id
    });
    author.name = req.body.name;
    author.location = req.body.location;
    author.biography = req.body.biography;
    author.save();
    res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/authors/:id', async (req, res) => {
  try {
    await Author.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log("Server is listening to port 3000"))
