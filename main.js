const postButton = document.getElementById("submit-post");

let divID = 1;

const postsFrag = document.createDocumentFragment();

const allPosts = [];
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
    votes: 0,
    comments: [],
  };
  // parseInt(newPost.getAttribute("data-votes"), 10)

  const postedBy = `Posted By: ${postObject.person}`;
  const message = document.getElementById("message").value;
  const postsDiv = document.getElementsByClassName("posts")[0];
  const postTime = Date.now();

  const postOwner = document.createElement("p", postedBy);
  postOwner.style.fontWeight = "500";
  postOwner.innerHTML = postedBy;

  const postMessage = document.createElement("p");
  postMessage.innerHTML = message;

  const remove = document.createElement("button");
  remove.innerHTML = "remove";
  remove.style.marginRight = "5px";
  remove.className = "btn btn-link";
  remove.style.fontWeight = "bold";

  const hr = document.createElement("hr");

  const commentButton = document.createElement("button");
  commentButton.innerHTML = "comment";
  commentButton.style.marginRight = "5px";
  commentButton.className = "btn btn-link";
  commentButton.style.fontWeight = "bold";
  commentButton.style.display = "inline-block";

  const newPost = document.createElement("div");
  newPost.style.margin = "20px";
  newPost.setAttribute("class", "post");
  newPost.setAttribute("data-votes", postObject.votes);
  newPost.setAttribute("data-divID", divID);

  newPost.appendChild(postMessage);
  newPost.appendChild(postOwner);
  newPost.appendChild(remove);
  newPost.appendChild(commentButton);
  newPost.appendChild(hr);

  remove.addEventListener("click", function () {
    postsDiv.removeChild(newPost);
  });

  const addCommentField = () => {
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
    const commenterInput = document.createElement("input");
    commenterInput.id = "comment-name";
    commenterInput.type = "text";
    commenterInput.class = "form-control";
    commenterInput.placeholder = "Your Name";
    commenterDiv.appendChild(commenterInput);

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.id = "submit-comment";
    commentSubmitButton.class = "btn btn-primary";
    commentSubmitButton.innerHTML = "Submit Comment";

    commentSubmitButton.addEventListener("click", () => {});

    commentForm.appendChild(commentHeader);
    commentForm.appendChild(commentMessageDiv);
    commentForm.appendChild(commenterDiv);
    commentForm.appendChild(commentSubmitButton);

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

  commentButton.addEventListener("click", addCommentField);

  postsDiv.appendChild(newPost);

  allPosts.push(postObject);

  divID += 1;
};

postButton.addEventListener("click", addPost);
