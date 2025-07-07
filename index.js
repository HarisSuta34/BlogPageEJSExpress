import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let postId = 0;

const posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
  res.render("index.ejs")
});

app.post("/posts", (req, res)=>{
  const postContent = req.body.postContent;
  const date = new Date(); 
  const hours = date.getHours(); 
  const minutes = date.getMinutes();

  if (postContent && postContent.trim() !== "") {
    posts.push({
      id: postId++,
      content: postContent.trim(),
      postHour: hours,
      postMinutes: minutes
  });
  }

  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { postsList: posts });
});


app.post("/posts/:id/delete", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/posts");
});


app.post("/posts/:id/edit", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newContent = req.body.newContent;
  const post = posts.find((p) => p.id === id);
  if (post && newContent && newContent.trim() !== "") {
    post.content = newContent.trim();
  }
  res.sendStatus(200);
});

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})