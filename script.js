let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span =document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span); 
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText =()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];


    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;   
};
changeText();
setInterval(changeText,2000)

// circle.skills--------------------------------------------------------->
const circle = document.querySelectorAll(".circle");
circle.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;


    for(let i = 0; i < dots ; i++){
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg" style="--i:1;"></div>`
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll(".points");
    for(let i = 0; i < percent; i++){
        pointsMarked[i].classList.add("marked")
    }
})


// mixed it up Portfolio Section--------------------------------------------------------->
// var mixer = mixitup('.portfolio-gallery');

//<!-- ================= PORTFOLIO FILTER JAVASCRIPT ================= -->



document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(
        ".filter-buttons .btn"
    );

    const portfolioItems = document.querySelectorAll(
        ".portfolio-gallery .port-box"
    );


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove active class from all buttons
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Add active class to clicked button
            this.classList.add("active");


            // Get selected category
            const filter = this.getAttribute("data-filter");


            // Show / hide portfolio items
            portfolioItems.forEach(function (item) {

                if (
                    filter === "all" ||
                    item.classList.contains(filter)
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });

});





// Scrolly Active Nav Section--------------------------------------------------------->

let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu(){
  let len = section.length;
  while(--len && window.scrollY + 97 < section[len].offsetTop){}
  menuLi.forEach(sec => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}
activeMenu()
window.addEventListener("scroll",activeMenu);

// Stckey navbar--------------------------------------------------------->
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
  header.classList.toggle("sticky",window.scrollY > 50)
})

// toggle icon navbar--------------------------------------------------------->

let menuIcon = document.querySelector("#menu-icon");
let navList = document.querySelector(".navlist");


menuIcon.onclick = ()=>{
  menuIcon.classList.toggle("bx-x");
  navList.classList.toggle("open");
}

window.onscroll = () => {
    menuIcon.classList.remove("bx-x"); // Remove close button class
    navList.classList.remove("open"); // Remove open class for the navigation list
  };


  //about section--------------------------------------------------------->

const aboutButton = document.querySelector(".about-read-more");
const aboutContent = document.querySelector(".about-content");

aboutButton.addEventListener("click", () => {
    aboutContent.classList.toggle("active");

    aboutButton.textContent = aboutContent.classList.contains("active")
        ? "Read Less"
        : "Read More";
});


  //Services Section-------------------------------------------------------------->
document.addEventListener("DOMContentLoaded", function () {

    const skillsSection = document.querySelector("#skills");

    if (!skillsSection) return;

    const skillBars = skillsSection.querySelectorAll(
        ".skill-bar .bar span"
    );

    const circles = skillsSection.querySelectorAll(".circle");


// Read More / Read Less functionality============================================>

  
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceBox = button.closest(".service-box");

      serviceBox.classList.toggle("active");

      button.textContent = serviceBox.classList.contains("active")
        ? "Read Less"
        : "Read More";
    });
  });



    /* =========================
       CREATE CIRCLE POINTS
    ========================= */

    circles.forEach(function (circle) {

        const dots = parseInt(circle.getAttribute("data-dots"));
        const percent = parseInt(circle.getAttribute("data-percent"));

        const markedDots = Math.round(dots * percent / 100);
        const rotation = 360 / dots;

        circle.innerHTML = "";

        for (let i = 1; i <= dots; i++) {

            const point = document.createElement("span");

            point.classList.add("points");

            point.style.setProperty("--i", i);
            point.style.setProperty("--rot", rotation + "deg");

            if (i <= markedDots) {
                point.classList.add("marked");
            }

            circle.appendChild(point);
        }

    });


    /* =========================
       ANIMATE PERCENTAGE NUMBER
    ========================= */

    function animateNumber(numberElement, target) {

        let start = 0;

        const duration = 1500;
        const startTime = performance.now();

        function updateNumber(currentTime) {

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = Math.floor(
                progress * target
            );

            numberElement.textContent = currentValue + "%";

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                numberElement.textContent = target + "%";
            }
        }

        requestAnimationFrame(updateNumber);
    }


    /* =========================
       RESET + PLAY ANIMATION
    ========================= */

    function animateSkills() {

        /* Technical skill bars */

        skillBars.forEach(function (bar) {

            const finalWidth =
                bar.getAttribute("data-width") ||
                getComputedStyle(bar).width;

            bar.style.transition = "none";
            bar.style.width = "0%";

            void bar.offsetWidth;

            bar.style.transition = "width 1.5s ease";
            bar.style.width = finalWidth;

        });


        /* Professional circles */

        circles.forEach(function (circle) {

            const points =
                circle.querySelectorAll(".points");

            const percent =
                parseInt(circle.getAttribute("data-percent"));

            const dots =
                parseInt(circle.getAttribute("data-dots"));

            const markedDots =
                Math.round(dots * percent / 100);


            /* Reset circle */

            points.forEach(function (point) {
                point.classList.remove("marked");
            });


            /* Reset number */

            const numberElement =
                circle.parentElement.querySelector(".text big");

            if (numberElement) {
                numberElement.textContent = "0%";
            }


            /* Force animation reset */

            void circle.offsetWidth;


            /* Start circle animation */

            points.forEach(function (point, index) {

                if (index < markedDots) {
                    point.classList.add("marked");
                }

            });


            /* Start number animation */

            if (numberElement) {
                animateNumber(numberElement, percent);
            }

        });

    }


    /* =========================
       SCROLL OBSERVER
    ========================= */

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    animateSkills();

                }

            });

        },
        {
            threshold: 0.3
        }
    );


    observer.observe(skillsSection);

});