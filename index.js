var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  var colorClass = "usecase-" + (i + 1); // generate class name based on index

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML =
    '<span class="wrap ' + colorClass + '">' + this.txt + "</span>"; // add color class to wrap element

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = 4000;

    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    showNextPoint();
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("usecase-1");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `.usecase-${i + 1} > .wrap { border-right: 0.2em solid white}`;
    document.body.appendChild(css);
  }
};

const points = document.querySelectorAll(".point");
let currentPoint = 0;

function showNextPoint() {
  points[currentPoint].classList.remove("active");
  currentPoint = (currentPoint + 1) % points.length;
  points[currentPoint].classList.add("active");
}

const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
  hamburger.classList.toggle("hamburger--open");
});

function handleLinkClick() {

  nav.classList.toggle("nav--open");
  hamburger.classList.toggle("hamburger--open");
}

// get all the links in the nav
const links = document.querySelectorAll('nav a');

// add a click event listener to each link
links.forEach(link => {
  link.addEventListener('click', (event) => {
    // prevent the default link behavior
    event.preventDefault();

    // remove the active class from all links
    links.forEach(link => link.classList.remove('active'));

    // add the active class to the clicked link
    link.classList.add('active');

    // get the section ID from the link's href attribute
    const sectionId = link.getAttribute('href');

    // scroll to the section
    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
