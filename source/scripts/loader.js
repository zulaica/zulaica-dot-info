const loader = document.getElementById("loader");
loader.addEventListener("transitionend", loader.remove);

const Loader = Object.freeze({ start, stop });
export default Loader;

/*******************************************************************************
 * Methods
 ******************************************************************************/
function start() {
  loader.style.display = "grid";
}

function stop() {
  document.documentElement.classList.remove("js");
  setTimeout(() => loader.classList.add("fade-out"), 1500);
}
