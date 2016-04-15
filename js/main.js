var autoStepShow = function(target){
    var autoStepShow_target = target.find(".autoStepShow");
    autoStepShow_target.removeClass("animated fadeIn");
    autoStepShow_target.hide();
    autoStepShow_target.attr({"autoStepShowAction":"0"});


    var show = function(key){
        if(key< autoStepShow_target.length){

            autoStepShow_target.eq(key).show();
            autoStepShow_target.eq(key).addClass("animated fadeIn");
            key = key + 1;
            setTimeout(function(){
                show (key);
            },100);
        }
    }
    var key = 0;
    show(key);

}

var autoTypeWriter = function( target){
    var autoTypeWriter_target = target.find(".autoTypeWriter");
    autoTypeWriter_target.hide();
    if( autoTypeWriter_target.length > 0 ){
        setTimeout(function(){

            autoTypeWriter_target.each(function(){
                $(this).show();
                var speed =50;
                if( typeof($(this).data('typerwriterspeed')) == "number" ){
                    speed = $(this).data('typerwriterspeed');
                }
                $(this).typewriter(speed);
            });

        },100);
    }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

$(document).ready(function(){
    $(".ShowBox").each(function(){
        var bg_template = $(this).data("bg-template");

        switch( bg_template ){
            case "bg_FrontCover":
                bg_template = "bg_FrontCover";
            break;
            default:
                bg_template = "bg_Default";
            break;
        }
        if( bg_template !="" ){
            var bg_html = $("#"+bg_template).html();
            $(this).append(bg_html);
        }
    });


    $(".ShowBox .AllPageCenter").each(function(){
        var info = $(this).html();
        var template = $("#Template_PageCenter").html();
        var target = $(template);
        target.find("div > div").html(info);

        $(this).parent().html(target);
    });


     // Full list of configuration options available at:
    // https://github.com/hakimel/reveal.js#configuration
    Reveal.initialize({


        // Factor of the display size that should remain empty around the content
        margin: 0,

        // Bounds for smallest/largest possible scale to apply to content
        minScale: 0.2,
        maxScale: 1.5,

        controls: true,

        progress: true,

        slideNumber: true,

        history: true,

        touch: true,

        center: false,

        loop: false,

        fragments: true,


        transition: 'slide', // none/fade/slide/convex/concave/zoom

        viewDistance: 5,

        // Optional reveal.js plugins
        dependencies: [
            { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'plugin/zoom-js/zoom.js', async: true },
            { src: 'plugin/notes/notes.js', async: true }
        ]
    });


    Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        var target = $(event.currentSlide);
        autoStepShow(target);
        autoTypeWriter(target);

        if( typeof( target.attr("actionfunc") ) !="undefined" ){
            var actionfunc = target.attr("actionfunc");

            if(typeof( PageAction[actionfunc] ) == "function"){
                PageAction[actionfunc](target);
            }
        }
    } );

    Reveal.addEventListener( 'FrontCover', function(event) {
        // TODO: FrontCover
    }, false );

    Reveal.addEventListener( '', function(event) {
        // TODO: Sprinkle magic
    }, false );

    Reveal.addEventListener( 'fragmentshown', function( event ) {
        // event.fragment = the fragment DOM element
        var target = event.fragments;
        $(target).each(function(){
            if( typeof( $(this).data("opacity") ) =="number" ){
                $(this).css( {opacity: $(this).data("opacity") } );
            }
        });
    } );

});

