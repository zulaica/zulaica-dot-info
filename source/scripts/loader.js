const loader = document.getElementById("loader");

function start() {
  loader.style.display = "grid";
}

function stop() {
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 1500);
}

const Loader = Object.freeze({ start, stop });
export default Loader;
