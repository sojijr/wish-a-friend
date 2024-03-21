document.addEventListener('DOMContentLoaded', function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var name = 'name';
    if (urlParams.has('me')) {
    const encodedName = urlParams.get('me');
    name = atob(encodedName);
    }

    const buttonContainer = document.querySelector(".button-container");
    const h1 = document.getElementById('typewriter-h1');
    const h2 = document.getElementById('typewriter-h2');


    // Function to create a trailing heart
    function createTrailingHeart(x, y, index) {
        const trailingHeart = document.createElement('div');
        trailingHeart.className = 'trailing-heart';

        trailingHeart.style.left = x + 'px';
        trailingHeart.style.top = y + 'px';

        document.body.appendChild(trailingHeart);

        void trailingHeart.offsetWidth;

        trailingHeart.style.transform = `translate(-50%, -50%) scale(0)`;
        trailingHeart.style.opacity = '0';

        setTimeout(() => {
            trailingHeart.remove();
        }, 500 * index);
    }

    const activeHearts = [];

    // Update the position of the trailing hearts based on the mouse movement
    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const heartIndex = activeHearts.length;
        createTrailingHeart(mouseX, mouseY, heartIndex);
        activeHearts.push(heartIndex);

        if (activeHearts.length > 5) {
            const oldestHeartIndex = activeHearts.shift();
            const oldestHeart = document.querySelector('.trailing-heart:nth-child(' + oldestHeartIndex + ')');
            if (oldestHeart) {
                oldestHeart.remove();
            }
        }
    });

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                const currentSpeed = text[i] === '.' ? speed / 3 : speed;

                if (text[i] === ',' || text[i] === '.') {
                    element.innerHTML += text[i] + '<br>';
                } else {
                    element.innerHTML += text[i];
                }

                i++;
                setTimeout(type, currentSpeed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    typeWriter(h1, "Dear " + name + ",", 50, function () {
        // After typing "Dear Rocio", start typing the poem
        setTimeout(function () {
            const poemLines = [
                "Wishing You the Best!"
            ];

            let lineIndex = 0;

            function typePoemLine() {
                const currentLine = poemLines[lineIndex];
                typeWriter(h2, currentLine, 75, function () {
                    lineIndex++;
                    if (lineIndex < poemLines.length) {
                        setTimeout(typePoemLine, 1500);
                    } else {
                        setTimeout(function () {
                            h2.innerHTML = '';
                            typeWriter(h2, "You're an amazing person.", 75, function () {
                                //Display the buttons after a delay
                                        setTimeout(function () {
                                            buttonContainer.style.display = 'flex';
                                        }, 1000);
                            });
                        }, 1000);
                    }
                });
            }

            // Start typing the poem after a delay
            typePoemLine();
        }, 2000); // Delay before typing the poem
    });

    // Hide the button container initially
    buttonContainer.style.display = 'none';

    const button = document.getElementById("clickMeButton");

    // button.addEventListener("click", () => {
    //   if (button.textContent === "Click me!") {
    //     button.textContent = "loading...";
    //     fetch('send_mail.php?me=' + encodeURIComponent(name))
    //       .then(response => {
    //         if (response.ok) {
    //           button.textContent = "Check Your Email 🙃";
    //         } else {
    //           console.error('Failed to send email');
    //           button.textContent = "Error 😞";
    //         }
    //       })
    //       .catch(error => {
    //         // Handle network errors or other issues
    //         console.error('Error:', error);
    //         button.textContent = "Error 😞";
    //       });
    //   }
    // });
    
});
