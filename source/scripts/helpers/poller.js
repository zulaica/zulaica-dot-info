class Poller {
  constructor(duration) {
    this.duration = duration;
    this.intervalId = null;
  }

  start = (fn) => {
    if (!this.intervalId) {
      this.intervalId = setInterval(fn, this.duration);
    }
  };

  stop = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
  };
}

export default Poller;
