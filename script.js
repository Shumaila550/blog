const blogs = [
    {
        id:1,
        title:"How I Built My First Web App",
        content:"This is a professional blog post explaining how a developer built their first production-ready web application..."
    },
    {
        id:2,
        title:"Top JavaScript Tips for Clean Code",
        content:"In this article we explore clean coding patterns, modular JS structure, and maintainable logic..."
    },
    {
        id:3,
        title:"Backend vs Frontend — What Should You Learn?",
        content:"Choosing between backend and frontend depends on your interest in logic, design, and system architecture..."
    }
];

const container = document.getElementById("blogContainer");
const searchInput = document.getElementById("search");

function renderBlogs(list){
    container.innerHTML="";
    list.forEach(blog=>{
        container.innerHTML+=`
            <div class="card" onclick="openBlog(${blog.id})">
                <h3>${blog.title}</h3>
                <p>${blog.content.substring(0,80)}...</p>
            </div>
        `;
    });
}

renderBlogs(blogs);

/* SEARCH */
searchInput.addEventListener("input",()=>{
    const term = searchInput.value.toLowerCase();
    const filtered = blogs.filter(b=>b.title.toLowerCase().includes(term));
    renderBlogs(filtered);
});

/* OPEN BLOG */
function openBlog(id){
    const blog = blogs.find(b=>b.id===id);

    document.getElementById("blogTitle").innerText = blog.title;
    document.getElementById("blogContent").innerText = blog.content;

    document.getElementById("blogView").classList.remove("hidden");
    container.classList.add("hidden");

    loadComments(id);
    localStorage.setItem("currentBlog",id);
}

function goBack(){
    document.getElementById("blogView").classList.add("hidden");
    container.classList.remove("hidden");
}

/* COMMENTS */
function loadComments(id){
    const list = document.getElementById("commentList");
    list.innerHTML="";

    const comments = JSON.parse(localStorage.getItem("comments_"+id)) || [];

    comments.forEach(c=>{
        list.innerHTML += `<p>• ${c}</p>`;
    });
}

function addComment(){
    const input = document.getElementById("commentInput");
    const text = input.value.trim();
    if(!text) return;

    const id = localStorage.getItem("currentBlog");
    const comments = JSON.parse(localStorage.getItem("comments_"+id)) || [];

    comments.push(text);
    localStorage.setItem("comments_"+id,JSON.stringify(comments));

    input.value="";
    loadComments(id);
}
