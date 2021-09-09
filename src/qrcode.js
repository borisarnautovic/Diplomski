

var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 120,
    height : 120
});

function makeCode () {		
    var elText = document.getElementById("nav-link");
    
    if (!elText.href) {
        alert("Input a text");
        elText.focus();
        return;
    }
    
    qrcode.makeCode(elText.href);
}

makeCode();

$("#nav-link").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });