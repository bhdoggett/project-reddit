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

  // const commentObject = {
  //   person: document.getElementById("comment-name").value,
  //   message: document.getElementById("comment-message").value,
  //   ID: postID.toString(),
  // };

  // postObject.comments.push(commentObject);
  allPosts.push(postObject);
  postID++;
};

// const addComment = () => {
//   const commentObject = {
//     person: document.getElementById("comment-name").value,
//     message: document.getElementById("comment-message").value,
//     ID: postID.toString(),
//   };

//   postObject.comments.push(commentObject)
// }
const postsDiv = document.getElementsByClassName("posts")[0];

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

    const commentSection = document.createElement("div");
    commentSection.className = "comments";
    // commentSection.style.display = "none";

    const comments = document.createElement("div");
    comments.className = "comments";
    commentSection.appendChild(comments);

    const commentForm = document.createElement("form");
    commentForm.style = "margin-top:30px";
    commentForm.onsubmit = "event.preventDefault()";

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

    // const addCommentSection = () => {
    //   const commentForm = document.createElement("form");
    //   commentForm.style = "margin-top:30px";
    //   commentForm.onsubmit = "event.preventDefault()";

    //   const commentHeader = document.createElement("h3");
    //   commentHeader.innerHTML = "Add a Comment";

    //   const commentMessageDiv = document.createElement("div");
    //   commentMessageDiv.className = "form-group";

    //   const commentMessageArea = document.createElement("textarea");
    //   commentMessageArea.id = "comment-message";
    //   commentMessageArea.type = "text";
    //   commentMessageArea.class = "form-control";
    //   commentMessageArea.placeholder = "Your comment";

    //   commentMessageDiv.appendChild(commentMessageArea);

    //   const commenterDiv = document.createElement("div");
    //   commenterDiv.className = "form-group";

    //   const commenterInputField = document.createElement("input");
    //   commenterInputField.id = "comment-name";
    //   commenterInputField.type = "text";
    //   commenterInputField.class = "form-control";
    //   commenterInputField.placeholder = "Your Name";
    //   commenterDiv.appendChild(commenterInputField);

    // }

    const newPost = document.createElement("div");
    // newPost.style.margin = "20px";
    newPost.setAttribute("class", "post");
    newPost.setAttribute("data-postID", postID); // DO I NEED THIS?

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

    const toggleCommentsOn = () => {
      postForm.style.display = "none";
      commentSection.style.display = "block";
    };

    const toggleCommentsOff = () => {
      postForm.style.display = "block";
      commentSection.style.display = "none";
    };

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.id = "submit-comment";
    commentSubmitButton.class = "btn btn-primary";
    commentSubmitButton.innerHTML = "Submit Comment";

    //for each post I want to create the appropriate divs, etc. with the information i have from the post object in the array
    // 1. remove button, comments button, postPerson, Post Message with "Posted By:- " prefix

    const addComment = function () {
      const commentObject = {
        person: document.getElementById("comment-name").value,
        message: document.getElementById("comment-message").value,
        ID: postID.toString(),
      };
      // parseInt(newPost.getAttribute("data-votes"), 10)

      // const commentBy = ` - Comment By: ${commentObject.person}`;
      // // const message = document.getElementById("message").value;
      const commentDiv = document.createElement("div")[0];

      const x = document.createElement("button");
      remove.innerHTML = "X";
      // remove.style.margin = "5px";
      remove.className = "btn btn-link";
      remove.style.fontWeight = "bold";

      x.addEventListener("click", function () {
        commentSection.removeChild(commentDiv);
      });

      const commentOwner = document.createElement("span", commentObject.person);
      commentOwner.style.fontWeight = "500";
      commentOwner.innerHTML = ` - Comment By: ${commentObject.person}`;

      const commentMessage = document.createElement("span");
      postMessage.innerHTML = postObject.message;

      commentDiv.appendChild(x);
      commentDiv.appendChild(commentOwner);
      commentDiv.appendChild(commentMessage);

      postObject.comments.push(commentObject);
    };

    commentSubmitButton.addEventListener("click", addComment);

    // () => {
    //   toggleCommentsOff();
    //   // need to add the value of the comment message and the commentor to the post, and also need to toggle the comment form away and restore the add post form
    //   postForm.style.display = "block";
    // });

    commentForm.appendChild(commentHeader);
    commentForm.appendChild(commentMessageDiv);
    commentForm.appendChild(commenterDiv);
    commentForm.appendChild(commentSubmitButton);

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

postButton.addEventListener("click", addPost);
postButton.addEventListener("click", renderPosts);
