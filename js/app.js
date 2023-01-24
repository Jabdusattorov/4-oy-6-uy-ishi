const postsTableBody = document.querySelector("#posts-table-body");
const userModalBody = document.querySelector("#user-modal-body");
const paginationLinks = document.querySelectorAll(".page-link");
const nextLink = document.querySelector(".next-link");
const previousLink = document.querySelector(".previous-link");

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

let page = 1;
const limit = 10;

async function getPosts() {
  let { data } = await axios.get(`/posts?_limit=${limit}&_page=${page}`);
  return data;
}

function renderPosts(posts) {
  postsTableBody.innerHTML = "";
  posts.forEach((post) => {
    let tr = document.createElement("tr");
    let idTd = document.createElement("td");
    let titleTd = document.createElement("td");
    let bodyTd = document.createElement("td");
    let userIdTd = document.createElement("td");
    let actionsTd = document.createElement("td");
    let userModelBtn = document.createElement("button");
    let commentsModelBtn = document.createElement("button");

    userModelBtn.classList.add("btn", "btn-primary");
    commentsModelBtn.classList.add("btn", "btn-success", "ms-3", "commentsBtn");

    userModelBtn.innerText = "User Info";
    userModelBtn.setAttribute("type", "button");
    userModelBtn.setAttribute("data-bs-toggle", "modal");
    userModelBtn.setAttribute("data-bs-target", "#userInfoModal");
    userModelBtn.setAttribute("data-user-id", post.userId);

    commentsModelBtn.innerText = "Comments";
    commentsModelBtn.setAttribute("type", "button");
    commentsModelBtn.setAttribute("data-bs-toggle", "modal");
    commentsModelBtn.setAttribute("data-bs-target", "#commentsModal");
    commentsModelBtn.setAttribute("data-comments", post.id);

    actionsTd.append(userModelBtn, commentsModelBtn);

    idTd.innerText = post.id;
    titleTd.innerText = post.title;
    bodyTd.innerText = post.body;
    userIdTd.innerText = post.userId;

    tr.append(idTd, titleTd, bodyTd, userIdTd, actionsTd);

    postsTableBody.append(tr);

    userModelBtn.addEventListener("click", (e) => {
      const userId = e.target.getAttribute("data-user-id");

      displayUser(userId);
    });
  });
}

const displayPost = async () => {
  let posts = await getPosts();

  renderPosts(posts);
};

async function getUser(id) {
  let { data } = await axios.get(`/users/${id}`);
  return data;
}

function renderUser(user) {
  userModalBody.innerHTML = `
    <dl>
      <dt>Name</dt>
      <dd>${user.name}</dd>
      <dt>Username</dt>
      <dd>${user.username}</dd>
      <dt>Email</dt>
      <dd><a href="mailto:${user.email}">${user.email}</a></dd>
      <dt>Phone Number</dt>
      <dd><a href="tel:${user.phone}">${user.phone}</a></dd>
      <dt>Website</dt>
      <dd><a href="${user.website}" target="_blank">${user.website}</a></dd>
      <dt>Company</dt>
      <dd>${user.company.name}</dd>
      <dt>Address</dt>
      <dd>${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</dd>
    </dl>
  `;
}

function renderUser(user) {
  userModalBody.innerHTML = `
    <dl>
      <dt>Name</dt>
      <dd>${user.name}</dd>
      <dt>Username</dt>
      <dd>${user.username}</dd>
      <dt>Email</dt>
      <dd><a href="mailto:${user.email}">${user.email}</a></dd>
      <dt>Phone Number</dt>
      <dd><a href="tel:${user.phone}">${user.phone}</a></dd>
      <dt>Website</dt>
      <dd><a href="${user.website}" target="_blank">${user.website}</a></dd>
      <dt>Company</dt>
      <dd>${user.company.name}</dd>
      <dt>Address</dt>
      <dd>${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</dd>
    </dl>
  `;
}

const displayUser = async (id) => {
  let user = await getUser(id);

  renderUser(user);
};

displayPost();

paginationLinks.forEach((paginationLink) => {
  paginationLink.addEventListener("click", (e) => {
    let clickedPage = e.target.innerText;
    let activeLink = document.querySelector(".page-item.active");

    if (page !== 1) {
      previousLink.removeAttribute("disabled");
    }

    if (page !== 10) {
      nextLink.removeAttribute("disabled");
    }

    if (clickedPage === "Next") {
      page++;

      activeLink.classList.remove("active");
      paginationLinks[page].parentElement.classList.add("active");
    } else if (clickedPage === "Previous") {
      page--;
    } else {
      page = +clickedPage;
    }

    if (page === 1) {
      previousLink.setAttribute("disabled", true);
    }

    if (page === 10) {
      nextLink.setAttribute("disabled", true);
    }

    activeLink.classList.remove("active");
    paginationLinks[page].parentElement.classList.add("active");

    displayPost();
  });
});

const ComModalBody = document.getElementById("comments-modal-body");
const commentsBtn = document.querySelector(".commentsBtn")

function cMB(postId, id, name, email, body){
  ComModalBody.innerHTML += `<h2>PostID: ${postId}</h2> <h2>ID: ${id}</h2><h3>Name: ${name}</h3><h4>Email: <a href="mailto: ${email}">${email}</a></h4><p>Body: ${body}</p> <hr>`}
postsTableBody.addEventListener("click", (e)=>{
    let result = e.target
    if(result.innerText == "Comments"){
      async function getInfo(){
        let linkCom = "https://jsonplaceholder.typicode.com/posts"
        let info = await fetch(`${linkCom}/${result.dataset.comments}/comments`)
        let infoData = await info.json()
        ComModalBody.innerHTML = ""
        for(let i = 0; i < infoData.length; i++){
          cMB(
              infoData[i].postId,
              infoData[i].id,
              infoData[i].name,
              infoData[i].email,
              infoData[i].body,
          )
        }
    }getInfo()
  }
})