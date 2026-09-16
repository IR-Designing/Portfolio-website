document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector("#menu-icon");
  const navList = document.querySelector(".navlist");

  if (!menuIcon || !navList) return;

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
  });

  window.addEventListener("scroll", () => {
    menuIcon.classList.remove("bx-x");
    navList.classList.remove("open");
  });
});