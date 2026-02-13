const blogs = [
{
id:1,
title:"Designing Scalable Web Applications",
date:"Jan 2026",
content:"Scalability is not about handling millions of users on day one. It's about designing systems that can grow without breaking..."
},
{
id:2,
title:"Clean Code Principles Every Developer Should Know",
date:"Feb 2026",
content:"Readable code saves time, reduces bugs, and improves collaboration. In this article we explore naming, modularity, and architecture..."
},
{
id:3,
title:"From Junior to Senior Developer",
date:"Feb 2026",
content:"Progressing in your developer career isn't about years — it's about responsibility, decision making, and system thinking..."
}
];

const container=document.getElementById("blogContainer");
const search=document.getElementById("search");

function render(list){
container.innerHTML="";
list.forEach(b=>{
container.innerHTML+=`
<div class="card" onclick="openBlog(${b.id})">
<h3>${b.title}</h3>
<div class="meta">${b.date}</div>
<p>${b.content.substring(0,110)}...</p>
</div>`;
});
}

render(blogs);

/* SEARCH */
search.addEventListener("input",()=>{
const term=search.value.toLowerCase();
render(blogs.filter(b=>b.title.toLowerCase().includes(term)));
});

/* OPEN BLOG */
function openBlog(id){
const blog=blogs.find(b=>b.id===id);
document.getElementById("blogTitle").innerText=blog.title;
document.getElementById("blogDate").innerText=blog.date;
document.getElementById("blogContent").innerText=blog.content;

container.classList.add("hidden");
document.getElementById("blogView").classList.remove("hidden");

loadComments(id);
localStorage.setItem("blog",id);
}

function goBack(){
document.getElementById("blogView").classList.add("hidden");
container.classList.remove("hidden");
}

/* COMMENTS */
function loadComments(id){
const list=document.getElementById("commentList");
list.innerHTML="";
const comments=JSON.parse(localStorage.getItem("c"+id))||[];
comments.forEach(c=>list.innerHTML+=`<p>• ${c}</p>`);
}

function addComment(){
const input=document.getElementById("commentInput");
if(!input.value.trim())return;

const id=localStorage.getItem("blog");
const comments=JSON.parse(localStorage.getItem("c"+id))||[];
comments.push(input.value);
localStorage.setItem("c"+id,JSON.stringify(comments));
input.value="";
loadComments(id);
}
