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
  setTimeout(() => loader.classList.add("fade-out"), 1500);
}
