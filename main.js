// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Add the hidden class to the error modal initially
const errorModal = document.getElementById("modal");
errorModal.classList.add("hidden");

// Select all heart elements
const likeElements = document.querySelectorAll(".like-glyph");

// Function to handle heart click
likeElements.forEach(likeGlyph => {
  likeGlyph.addEventListener("click", function() {
    if (this.classList.contains("activated-heart")) {
      // User clicked on a full heart
      this.classList.remove("activated-heart");
      this.innerHTML = EMPTY_HEART; // Change to empty heart
    } else {
      // User clicked on an empty heart
      mimicServerCall()
        .then(() => {
          // On success, change heart to full
          this.classList.add("activated-heart");
          this.innerHTML = FULL_HEART; // Change to full heart
        })
        .catch((errorMessage) => {
          // On failure, show error modal
          errorModal.classList.remove("hidden");
          document.getElementById("modal-message").textContent = errorMessage; // Display error message
          
          // Hide the error modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
