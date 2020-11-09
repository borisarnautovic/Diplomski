import { SERVER_IP } from "./const.js"; 
import { data } from "jquery";

console.log("server ip", SERVER_IP );

const ws = new WebSocket(`ws://${SERVER_IP}:8082`);

      

ws.addEventListener("open", () => {
    console.log("We are connected!"); 

    ws.send("Hey, how's it going?");
});

ws.addEventListener("message", ({data}) => {
    console.log(data);
});




(function () {
  function e() {
    
      
      window.addEventListener(
        "deviceorientation",
        function (c) {
          d.push("deviceorientation"),
            (a.alpha = c.alpha - b.alpha),
            (a.beta = c.beta - b.beta),
            (a.gamma = c.gamma - b.gamma);            
        },
        !0
      );
  }
  var a = {  alpha: null, beta: null, gamma: null },
    b = { alpha: 0, beta: 0, gamma: 0  },
    c = null,
    d = [];
  (window.gyro = {}),
    (gyro.frequency = 20),
    (gyro.calibrate = function () {
      for (var c in a) b[c] = typeof a[c] == "number" ? a[c] : 0;
    }),
    (gyro.getOrientation = function () {
      return a;
    }),
    (gyro.startTracking = function (b) {
      c = setInterval(function () {        
        b(a);
      }, gyro.frequency);
    }),
    (gyro.stopTracking = function () {
      clearInterval(c);
    }),
    (gyro.hasFeature = function (a) {
      for (var b in d) if (a == d[b]) return !0;
      return !1;
    }),
    (gyro.getFeatures = function () {
      return d;
    }),
    e();
})(window);

gyro.startTracking(function (o) {
  var b = document.getElementById("example"),
  f = document.getElementById("features");
  f.innerHTML = gyro.getFeatures();


  ws.send (JSON.stringify({
     alpha : o.alpha,
     beta : o.beta,
     gamma : o.gamma
  }));  


  b.innerHTML =
    
    '<p id="alpha"> alpha = ' +
    o.alpha +
    "</p>" +
    '<p id="beta"> beta = ' +
    o.beta +
    "</p>" +
    '<p id="gamma"> gamma = ' +
    o.gamma +
    "</p>";
});
