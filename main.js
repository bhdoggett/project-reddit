const postButton = document.getElementById("submit-post");
const postForm = document.getElementById("post-form");
const allPosts = [];

let postID = 0;
let commentID = 0;

const addPost = () => {
  const postObject = {
    person: document.getElementById("name").value,
    message: document.getElementById("message").value,
    ID: postID.toString(),
    comments: [],
  };

  //for each post I want to create the appropriate divs, etc. with the information i have from the post object in the array
  // 1. remove button, comments button, postPerson, Post Message with "Posted By:- " prefix

  allPosts.push(postObject);

  postID++;
};

const renderPosts = () => {
  const postsDiv = document.getElementsByClassName("posts")[0];
  const allPostDivs = document.getElementsByClassName("post");

  for (let i = allPostDivs.length - 1; i >= 0; i--) {
    postsDiv.removeChild(allPostDivs[i]);
  }

  for (let i = 0; i < allPosts.length; i++) {
    const postedBy = ` - Posted By: ${allPosts[i].person}`;

    const postOwner = document.createElement("span", postedBy);
    postOwner.style.fontWeight = "500";
    postOwner.innerHTML = ` - Posted By: ${allPosts[i].person}`;

    const postMessage = document.createElement("span");
    postMessage.innerHTML = allPosts[i].message;

    const remove = document.createElement("button");
    remove.innerHTML = "remove";
    remove.className = "btn btn-link";
    remove.style.fontWeight = "bold";

    const newPost = document.createElement("div");
    newPost.setAttribute("class", "post");
    newPost.setAttribute("data-postID", postID); // DO I NEED THIS?

    const commentsButton = document.createElement("button");
    commentsButton.innerHTML = "comments";
    commentsButton.className = "btn btn-link";
    commentsButton.style.fontWeight = "bold";
    commentsButton.style.display = "inline-block";

    const commentSection = document.createElement("div");
    commentSection.className = "comments";
    // commentSection.style.display = "none";

    // const comments = document.createElement("div");
    // comments.className = "comments";
    // commentSection.appendChild(comments);

    const commentForm = document.createElement("form");
    commentForm.style = "margin-top:30px";
    commentForm.onsubmit = (event) => event.preventDefault();

    const commentHeader = document.createElement("h3");
    commentHeader.innerHTML = "Add a Comment";
    commentForm.appendChild(commentHeader);

    const commentMessageDiv = document.createElement("div");
    commentMessageDiv.className = "form-group";

    const commentMessageArea = document.createElement("textarea");
    commentMessageArea.id = "comment-message";
    commentMessageArea.type = "text";
    commentMessageArea.class = "form-control";
    commentMessageArea.placeholder = "Your comment";

    commentMessageDiv.appendChild(commentMessageArea);
    commentForm.appendChild(commentMessageDiv);

    const commenterDiv = document.createElement("div");
    commenterDiv.className = "form-group";

    const commenterInputField = document.createElement("input");
    commenterInputField.id = "comment-name";
    commenterInputField.type = "text";
    commenterInputField.class = "form-control";
    commenterInputField.placeholder = "Your Name";
    commenterDiv.appendChild(commenterInputField);
    commentForm.appendChild(commenterDiv);

    commentSection.appendChild(commentForm);

    const addComment = () => {
      const commentObject = {
        person: document.getElementById("comment-name").value,
        message: document.getElementById("comment-message").value,
        ID: postID.toString(),
        status: "live", // deleted comments will have a value of 'deleted'
      };

      allPosts[i].comments.push(commentObject);
    };

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.id = "submit-comment";
    commentSubmitButton.class = "btn btn-primary";
    commentSubmitButton.innerHTML = "Submit Comment";
    commentForm.appendChild(commentSubmitButton);

    const renderComments = () => {
      const commentUl = document.createElement("ul");

      // for (let c = allPostDivs[i].length - 1; c >= 0; c--) {
      //   commentSection.removeChild(allPostDivs[i]);
      // }

      for (let c = 0; c < allPosts[i].comments.length; c++) {
        const commentBy = document.createElement(
          "span",
          allPosts[i].comments[c].person
        );

        const commentLi = document.createElement("li");

        const x = document.createElement("button");
        x.innerHTML = "X";
        x.className = "btn btn-link";
        x.style.fontWeight = "bold";

        x.addEventListener("click", function () {
          commentUl.removeChild(commentLi);
        });

        commentBy.style.fontWeight = "500";
        commentBy.innerHTML = ` - Comment By: ${allPosts[i].comments[i].person}`;

        const commentMessage = document.createElement("span");
        commentMessage.innerHTML = allPosts[i].comments[c].message;

        commentLi.appendChild(x);
        commentLi.appendChild(commentMessage);
        commentLi.appendChild(commentBy);
        commentUl.appendChild(commentLi);

        commentSection.appendChild(commentUl);
      }
    };
    commentsButton.addEventListener("click", () => {
      //toggle comments secotn on off while toggling the posts form off and on
    });

    commentSubmitButton.addEventListener("click", () => {
      addComment();
      renderComments();
    });

    commentSection.appendChild(commentForm);

    renderComments();

    newPost.appendChild(remove);
    newPost.appendChild(commentsButton);
    newPost.appendChild(postMessage);
    newPost.appendChild(postOwner);
    newPost.appendChild(commentSection);

    // newPost.appendChild(hr);

    remove.addEventListener("click", function () {
      allPosts.splice([i], 1);
      postsDiv.removeChild(newPost);
    });

    if (
      document.getElementById("name").value &&
      document.getElementById("message").value
    ) {
      postsDiv.appendChild(newPost);
    } else {
      alert("Please enter a message and your name.");
    }
  }
};

renderPosts();

postButton.addEventListener("click", (event) => {
  event.preventDefault();
  addPost();
});
postButton.addEventListener("click", (event) => {
  event.preventDefault();
  renderPosts();
});
// postButton.addEventListener("click", renderPosts);
