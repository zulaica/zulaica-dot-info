const loader = document.getElementById("loader");

const Loader = Object.freeze({ start, stop });
export default Loader;

/*******************************************************************************
 * Methods
 ******************************************************************************/
function start() {
  loader.style.display = "grid";
}

function stop() {
  loader.style.animation = "fade-out 0.5s 1.5s";

  setTimeout(function () {
    loader.remove();
  }, 1500);
}
