
//<script src = "src=http://code.jquery.com/jquery-2.2.0.js"></script>


 /*       function audioPlayer()
        {
            var currentSong = 0;
            $("#audioPlayer")[0].src = $("#playlist li a")[0];

         // $("#audioPlayer")[0].play();
            $("#playlist li a").click(function(e)
            {                
                e.preventDefault();
                $("#audioPlayer")[0].src = this;
                $("#audioPlayer")[0].play();
                $("#playlist li").removeClass("current-song");
                currentSong = $(this).parent().index();
                $(this).parent().addClass("current-song");
             });

            $("#audioPlayer")[0].addEventListener("ended", function()
            {
                currentSong++;
                if(currentSong == $("#playlist li a").length) 
                {
                    currentSong = 0;
                }
                $("playlist li").removeClass("current-song");
                $("#playlist li:eq("+currentSong+")").addClass("current-song")       //li:eq uzima odredjeni element
                $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
                $("#audioPlayer")[0].play();
            });
        }*/

var audioElement = document.getElementById("audioPlayer");
audioElement.volume = 0.5;
function audioPlayer(options)
{
    if(options.volume ){
        audioElement.volume = options.volume;
    }
};