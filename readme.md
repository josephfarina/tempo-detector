# Very simple utility function to detect the beats per minutes based on the time between function calls.

A very simple example of a tap for tempo would be:

```html
 <div id="display"></div>
 <button id="button">Tap For Tempo</button>
```

```javascript
 const button = document.getElementById('button');
 const display = document.getElementById('display');
 
 const beatDetector = tempoDetector(bpm => {
   // this will continue to be called
   display.innerText = bpm;
 });
 
 button.addEventListener('click', beatDetector);
```

