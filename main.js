const postButton = document.getElementById("submit-post");
const postForm = document.getElementById("post-form");
const allPosts = [];
const populatePosts = () => {
  for (let i = 0; i < allPosts.length; i++) {
    //for each post I want to create the appropriate divs, etc. with the information i have from the post object in the array
    // 1. remove button, comments button, postPerson, Post Message with "Posted By:- " prefix
  }
};

let divID = 1;

// const postsFrag = document.createDocumentFragment();

// const postPerson = document.getElementById("name").value;
// const postMessage = document.getElementById("message").value;

// const allPosts = Array.from(document.getElementsByClassName("post")).map(
//   (div) => ({
//     element: div,
//     votes: parseInt(div.getAttribute("data-votes"), 10),
//   })
// );

const addPost = () => {
  const postObject = {
    person: document.getElementById("name").value,
    message: document.getElementById("message").value,
    ID: divID.toString(),
    // votes: 0,
    comments: [],
  };
  // parseInt(newPost.getAttribute("data-votes"), 10)

  // const postedBy = ` - Posted By: ${postObject.person}`;
  // const message = document.getElementById("message").value;
  const postsDiv = document.getElementsByClassName("posts")[0];
  const postTime = Date.now();

  const postOwner = document.createElement("span", postedBy);
  postOwner.style.fontWeight = "500";
  postOwner.innerHTML = ` - Posted By: ${postObject.person}`;

  const postMessage = document.createElement("span");
  postMessage.innerHTML = postObject.message;

  const remove = document.createElement("button");
  remove.innerHTML = "remove";
  // remove.style.margin = "5px";
  remove.className = "btn btn-link";
  remove.style.fontWeight = "bold";

  // const hr = document.createElement("hr");

  const commentsButton = document.createElement("button");
  commentsButton.innerHTML = "comments";
  // commentsButton.style.marginRight = "5px";
  commentsButton.className = "btn btn-link";
  commentsButton.style.fontWeight = "bold";
  commentsButton.style.display = "inline-block";

  const commentsDiv = document.createElement("div");
  const commentsUl = document.createElement("ul");

  const newPost = document.createElement("div");
  // newPost.style.margin = "20px";
  newPost.setAttribute("class", "post");
  newPost.setAttribute("data-votes", postObject.votes);
  newPost.setAttribute("data-divID", divID);

  newPost.appendChild(remove);
  newPost.appendChild(commentsButton);
  newPost.appendChild(postMessage);
  newPost.appendChild(postOwner);

  // newPost.appendChild(hr);

  remove.addEventListener("click", function () {
    postsDiv.removeChild(newPost);
  });

  const toggleComments = () => {
    postForm.style.display = "none";
  };

  const addCommentForm = () => {
    const commentForm = document.createElement("form");
    commentForm.style = "margin-top:30px";
    commentForm.onsubmit = "event.preventDefault()";

    const commentHeader = document.createElement("h3");
    commentHeader.innerHTML = "Add a Comment";

    const commentMessageDiv = document.createElement("div");
    commentMessageDiv.className = "form-group";

    const commentMessageArea = document.createElement("textarea");
    commentMessageArea.id = "comment-message";
    commentMessageArea.type = "text";
    commentMessageArea.class = "form-control";
    commentMessageArea.placeholder = "Your comment";

    commentMessageDiv.appendChild(commentMessageArea);

    const commenterDiv = document.createElement("div");
    commenterDiv.className = "form-group";

    const commenterInputField = document.createElement("input");
    commenterInputField.id = "comment-name";
    commenterInputField.type = "text";
    commenterInputField.class = "form-control";
    commenterInputField.placeholder = "Your Name";
    commenterDiv.appendChild(commenterInputField);

    const commentLi = document.createElement("li");
    commentLi.innerHTML = `${commentMessageArea.value}, `;
    commentsUl.appendChild(commentLi);

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.id = "submit-comment";
    commentSubmitButton.class = "btn btn-primary";
    commentSubmitButton.innerHTML = "Submit Comment";

    commentSubmitButton.addEventListener("click", () => {
      alert("hi");
      // need to add the value of the comment message and the commentor to the post, and also need to toggle the comment form away and restore the add post form
      postForm.style.display = "block";
    });

    commentForm.appendChild(commentHeader);
    commentForm.appendChild(commentMessageDiv);
    commentForm.appendChild(commenterDiv);
    commentForm.appendChild(commentSubmitButton);

    toggleComments();
    newPost.appendChild(commentForm);

    //   <button id="submit" class="btn btn-primary">
    //     Submit Post
    //   </button>;
    //   {
    //     /* <div class="form-group">
    // //     <input */
    //   }
    //   //       id="name"
    //   //       type="text"
    //   //       class="form-control"
    //   //       placeholder="Your Name"
    //   //     ></input>
    //   //   </div>
  };

  commentsButton.addEventListener("click", addCommentForm);

  if (
    document.getElementById("name").value &&
    document.getElementById("message").value
  ) {
    postsDiv.appendChild(newPost);
    allPosts.push(postObject);
  } else {
    alert("Please enter a message and your name.");
  }

  divID += 1;
};

postButton.addEventListener("click", addPost);
