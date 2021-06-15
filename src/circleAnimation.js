// //import volume from "./gyroscope";

// var ProgressBar = require('progressbar.js')
// var bar = new ProgressBar.Circle(container, {
//     color: '#aaa',
//     // This has to be the same size as the maximum width to
//     // prevent clipping
//     strokeWidth: 4,
//     trailWidth: 1,
//     easing: 'easeInOut',
//     duration: 1400,
//     text: {
//       autoStyleContainer: false
//     },
//     from: { color: '#aaa', width: 1 },
//     to: { color: '#bfa', width: 4 },
//     // Set default step function for all animate calls
//     step: function(state, circle) {
//       circle.path.setAttribute('stroke', state.color);
//       circle.path.setAttribute('stroke-width', state.width);

//       var value = Math.round(circle.value() * 100);
//       if (value === 0) {
//         circle.setText('');
//       } else {
//         circle.setText('');
//       }

//     }
//   });
//   bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
//   bar.text.style.fontSize = '2rem';

//   bar.animate(1.0);

// var count = $("#count");
// $({ Counter: 0 }).animate(
//   { Counter: count.text() },
//   {
//     duration: 5000,
//     easing: "linear",
//     step: function () {
//       count.text(Math.ceil(this.Counter) + "%");
//     }
//   }
// );

let progressCircle = document.querySelector(".progress");
let radius = progressCircle.r.baseVal.value;
//circumference of a circle = 2πr;
let circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = circumference;

//0 to 100

let procenat = parseInt(document.getElementById("volumen").innerHTML);

console.log(procenat);

setProgress(procenat);

function setProgress(percent) {
    progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
}