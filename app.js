const express = require("express");
const app = express();
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
// const ejs=require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

//uuid -- to generate unique id 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

//methodoverride is used to convert post request to patch request
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuid(),
        user: "jhon",
        text: "this is first comment"
    },
    {
        id: uuid(),
        user: "harry",
        text: "this is first comment"
    },
    {
        id: uuid(),
        user: "ron",
        text: "this is first comment"
    }
]

app.get("/comments", function (req, res) {
    res.render('index', { comments });
})

app.get("/comments/new", function (req, res) {
    res.render("new");
})

//displaying particular comment
app.get('/comments/:commentid', (req, res) => {
    //  console.log(req.params);
    const { commentid } = req.params;
    const foundComment = comments.find((comment) => comment.id === (commentid));
    //console.log(foundComment);
    res.render('show', { comment: foundComment });
})

app.get('/comments/:commentid/edit', (req, res) => {
    const { commentid } = req.params;
    const foundComment = comments.find((comment) => comment.id === (commentid));
    res.render('edit', { comment: foundComment });
})
app.patch('/comments/:commentid', (req, res) => {
    const { commentid } = req.params;
    const foundComment = comments.find((comment) => comment.id === (commentid));
    const { text } = req.body;

    foundComment.text = text;
    res.render('index', { comments });
})
app.delete('/comments/:commentid',(req,res)=>{
    const {commentid} = req.params;
    const newCommentsArray=comments.filter((comment)=>comment.id !== commentid);
    comments=newCommentsArray;
    res.redirect('/comments');
})
app.post("/comments", function (req, res) {

    // const nid=req.body.id;
    const nuser = req.body.user;
    const ntext = req.body.text;
    comments.push({
        id: uuid(),
        user: nuser,
        text: ntext
    })
    res.redirect("/comments");
})






app.listen(3000, function () {
    console.log("Server is running at port 3000...")
})
/*

CSR - client side rendering 
SSR- server side rendering

*/