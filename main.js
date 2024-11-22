const postButton = document.getElementById("submit-post");
const postForm = document.getElementById("post-form");
const allPosts = [];

const removeElementByClass = (elementClass) => {
  const allElementsWithClass = Array.from(
    document.getElementsByClassName(elementClass)
  );
  for (let i = 0; i < allElementsWithClass.length; i++) {
    const element = allElementsWithClass[i];
    element.remove();
  }
};

let postID = 0;

const addPost = () => {
  if (
    !document.getElementById("name").value ||
    !document.getElementById("message").value
  ) {
    alert("Please enter a message and your name.");
  } else {
    const postObject = {
      person: document.getElementById("name").value,
      message: document.getElementById("message").value,
      ID: postID,
      comments: [],
    };

    allPosts.push(postObject);
  }
};

const renderPosts = () => {
  const postsDiv = document.getElementsByClassName("posts")[0];
  // const allPostDivs = document.getElementsByClassName("post"); // DO I NEED THIS??

  if (
    !document.getElementById("name").value ||
    !document.getElementById("message").value
  ) {
    return;
  }

  if (document.getElementsByClassName("post")[0]) {
    removeElementByClass("post");
  }

  // let postIndex = 0;
  for (let p = 0; p < allPosts.length; p++) {
    const postedBy = ` - Posted By: ${allPosts[p].person}`;

    const postOwner = document.createElement("span", postedBy);
    postOwner.style.fontWeight = "500";
    postOwner.innerHTML = ` - Posted By: ${allPosts[p].person}`;

    const postMessage = document.createElement("span");
    postMessage.innerHTML = allPosts[p].message;

    const remove = document.createElement("button");
    remove.innerHTML = "remove";
    remove.className = "btn btn-link";
    remove.style.fontWeight = "bold";

    const newPost = document.createElement("div");
    newPost.setAttribute("class", "post");
    newPost.setAttribute("id", `postindex-${p}`);
    // newPost.setAttribute("data-postIndex", p); // DO I NEED THIS?

    const commentsButton = document.createElement("button");
    commentsButton.innerHTML = "comments";
    commentsButton.className = "btn btn-link";
    commentsButton.style.fontWeight = "bold";
    commentsButton.style.display = "inline-block";

    const commentSection = document.createElement("div");
    commentSection.className = "comments";
    commentSection.style.margin = "30px 50px 30px 50px";
    commentSection.style.display = "none";

    const commentUl = document.createElement("ul");
    commentSection.appendChild(commentUl);

    const commentForm = document.createElement("form");
    commentForm.style = "margin-top:30px";
    commentForm.className;
    commentForm.onsubmit = (event) => event.preventDefault();

    const commentHeader = document.createElement("h4");
    commentHeader.innerHTML = "Add a comment";
    commentForm.appendChild(commentHeader);

    const commentMessageDiv = document.createElement("div");
    commentMessageDiv.className = "form-group";

    const commentMessageArea = document.createElement("textarea");
    commentMessageArea.id = `comment-message-input-${p}`;
    commentMessageArea.type = "text";
    commentMessageArea.className = "form-control";
    commentMessageArea.placeholder = "Your comment";

    commentMessageDiv.appendChild(commentMessageArea);
    commentForm.appendChild(commentMessageDiv);

    const commenterDiv = document.createElement("div");
    commenterDiv.className = "form-group";

    const commenterInputField = document.createElement("input");
    commenterInputField.id = `comment-name-input-${p}`;
    commenterInputField.type = "text";
    commenterInputField.className = "form-control";
    commenterInputField.placeholder = "Your Name";
    commenterDiv.appendChild(commenterInputField);
    commentForm.appendChild(commenterDiv);

    let commentID = 0;

    const addComment = () => {
      const commentObject = {
        person: document.getElementById(`comment-name-input-${p}`).value,
        message: document.getElementById(`comment-message-input-${p}`).value,
        ID: commentID.toString(),
        status: "live", // deleted comments will have a value of 'deleted'
      };

      allPosts[p].comments.push(commentObject);

      commentID++;
    };

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.id = "submit-comment";
    commentSubmitButton.class = "btn btn-primary";
    commentSubmitButton.innerHTML = "Submit Comment";
    commentForm.appendChild(commentSubmitButton);

    const renderComments = () => {
      // for (let c = allPostDivs[p].length - 1; c >= 0; c--) {
      //   commentSection.removeChild(allPostDivs[p]);
      // }

      if (document.getElementsByClassName(`commentSection-${p}`)) {
        removeElementByClass(`commentSection-${p}`);
      }

      for (let c = 0; c < allPosts[p].comments.length; c++) {
        const commentBy = document.createElement(
          "span",
          allPosts[p].comments[c].person
        );
        commentBy.style.fontWeight = "500";
        commentBy.innerHTML = ` - Comment By: ${allPosts[p].comments[c].person}`;

        const commentMessage = document.createElement("span");
        commentMessage.innerHTML = allPosts[p].comments[c].message;

        const x = document.createElement("button");
        x.innerHTML = "X";
        x.className = "btn btn-link";
        x.style.fontWeight = "bold";

        x.addEventListener("click", function () {
          commentUl.removeChild(commentLi);
          allPosts[p].comments.splice([c], 1);
        });

        const commentLi = document.createElement("li");
        commentLi.className = `comment commentSection-${p}`;
        // commentLi.className = "comment";

        commentLi.appendChild(x);
        commentLi.appendChild(commentMessage);
        commentLi.appendChild(commentBy);
        commentUl.appendChild(commentLi);
      }
    };

    commentSubmitButton.addEventListener("click", () => {
      addComment();
      renderComments();
      document.getElementById(`comment-message-input-${p}`).value = "";
      document.getElementById(`comment-name-input-${p}`).value = "";
      // commentSection.className = "hide";
      // postForm.className = "show";
    });

    commentSection.appendChild(commentUl);
    commentSection.appendChild(commentForm);

    commentsButton.addEventListener("click", () => {
      if (commentSection.classList.contains("show")) {
        commentSection.className = "comments";
        postForm.className = "show";
      } else {
        commentSection.className += " show";
        postForm.className = "hide";
      }

      // if (commentSection.className === "comments hide") {
      //   commentSection.className = "comments show";
      //   postForm.className = "hide";
      // }

      // if (commentSection.className === "comments show") {
      //   commentSection.className = "hide";
      //   postForm.className = "show";
      // }
    });

    // renderComments();

    const hr = document.createElement("hr");
    newPost.appendChild(remove);
    newPost.appendChild(commentsButton);
    newPost.appendChild(postMessage);
    newPost.appendChild(postOwner);
    newPost.appendChild(commentSection);
    newPost.appendChild(hr);

    // newPost.appendChild(hr);

    remove.addEventListener("click", function () {
      allPosts.splice([p], 1);
      postsDiv.removeChild(newPost);

      if (postForm.className === "hide") {
        postForm.className = "show";
      }
    });

    postsDiv.appendChild(newPost);

    if (
      document.getElementById("name").value &&
      document.getElementById("message").value
    ) {
      postsDiv.appendChild(newPost);
    } else {
      alert("Please enter a message and your name.");
    }

    postID++;
  }
  postID = 0;
};

// postID = 0;
// renderPosts();

postButton.addEventListener("click", (event) => {
  event.preventDefault();
  addPost();
  renderPosts();
  document.getElementById("message").value = "";
  document.getElementById("name").value = "";
});
