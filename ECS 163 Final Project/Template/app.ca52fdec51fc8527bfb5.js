// Function to create and animate hearts
function createAndAnimateHearts() {
    const numberOfHearts = 30; // Number of hearts to create

    for (let i = 0; i < numberOfHearts; i++) {
      // Create heart element
      const heart = document.createElement('div');
      heart.classList.add('heart');

      // Randomize the starting position across the width and top half of the screen
      const leftPos = Math.random() * 100; // From 0% to 100% of the viewport width
      const topPos = Math.random() * 50; // From 0% to 50% of the viewport height to keep it in the top half

      // Randomize animation duration between 5 to 10 seconds
      const animationDuration = 5 + Math.random() * 5; // Between 5 and 10 seconds

      // Set styles
      heart.style.left = `${leftPos}vw`;
      heart.style.top = `${topPos}vh`; // Adjust to position hearts in the top half vertically
      heart.style.animationDuration = `${animationDuration}s`;

      // Append heart to the body or a specific container
      document.body.appendChild(heart);

      // Remove heart after animation to clean up the DOM
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }
}

// Call the function to start the animation
createAndAnimateHearts();
