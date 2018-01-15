/**
 * Takes in a function that is called whenever an updated 
 * beat per minute is detected.
 *
 * A basic tap for tempo would look something like
 * this.
 *
 * <div id="display"></div>
 * <button id="button">Tap For Tempo</button>
 *
 * const button = document.getElementById('button');
 * const display = document.getElementById('display');
 *
 * const beatDetector = tempoDetector(bpm => {
 *   // this will continue to be called
 *   display.innerText = bpm;
 * });
 *
 * button.addEventListener('click', beatDetector);
 *
 * @arg {cb}: (bpm: number) => void
 * @return () => void
 */
export default function tempoDetector(cb){
  var TIMEOUT = 2000

  var times = []
  var lastTime = null
  var lastDifference = null

  function tap() {
    var time = Date.now()

    if (lastTime){
      lastDifference = time - lastTime
      times.push(lastDifference)
      refresh()
    }

    lastTime = time
    beginTimeout()
  }

  function refresh(){
    if (times.length > 2){
      let average = times.reduce((result, t) => result += t) / times.length;
      let bpm = (1 / (average / 1000)) * 60;
      cb(bpm)
    }
  }

  let timer = null

  function beginTimeout() {
    clearTimeout(timer)
    timer = setTimeout(function(){
      times = [lastDifference]
      lastTime = null
    }, TIMEOUT);
  }

  return tap
}

