var song = [];

var APP = (function(){

    var ns = ns || {};

    ns.velocity = 200;

    ns.changeVelocity = function(newVelocity){
        ns.velocity = newVelocity;
    };

    return ns;

})(APP);

var grave_alto = new buzz.sound( "sounds/grave-alto", {
    formats: [ "ogg" ]
});
var grave_bajo = new buzz.sound( "sounds/grave-bajo", {
    formats: [ "ogg" ]
});
var agudo_alto = new buzz.sound( "sounds/agudo-alto", {
    formats: [ "ogg" ]
});
var agudo_bajo = new buzz.sound( "sounds/agudo-bajo", {
    formats: [ "ogg" ]
});

$('#speed').change(function(){
    APP.changeVelocity($(this).val());
})

$('.grave-a').click(function(){
    play_and_record(play_grave_alto);
});
$('.grave-b').click(function(){
    play_and_record(play_grave_bajo);
});
$('.agudo-a').click(function(){
    play_and_record(play_agudo_alto);
});
$('.agudo-b').click(function(){
    play_and_record(play_agudo_bajo);
});

var play_and_record = function(sound){
    sound();
    song.push(sound);
};

$('.hit-control').click(function(){
    $(this).fadeOut("fast");
    $(this).fadeIn("fast");
});

$('#play_song').click(function(){
    play_song();
});

$('#delete_song').click(function(){
    delete_song();
});

var play_grave_alto = function(){
    grave_alto.play();
};

var play_grave_bajo = function(){
    grave_bajo.play();
};

var play_agudo_alto = function(){
    agudo_alto.play();
};

var play_agudo_bajo = function(){
    agudo_bajo.play();
};

var play_song = function(){
    var song_copy = song.slice(0);
    song_copy.reverse();
    var songInterval = setInterval(function(){
        song_copy.pop()();
        if (song_copy.length == 0){
            window.clearInterval(songInterval);
        };
    }, APP.velocity);
};

var delete_song = function(){
    song.length = 0;
}

Mousetrap.bind('x', function(){play_and_record(play_agudo_alto);});
Mousetrap.bind('m', function(){play_and_record(play_agudo_alto);});

Mousetrap.bind('c', function(){play_and_record(play_agudo_bajo);});
Mousetrap.bind('n', function(){play_and_record(play_agudo_bajo);});

Mousetrap.bind('s', function(){play_and_record(play_grave_alto);});
Mousetrap.bind('k', function(){play_and_record(play_grave_alto);});

Mousetrap.bind('d', function(){play_and_record(play_grave_bajo);});
Mousetrap.bind('j', function(){play_and_record(play_grave_bajo);});
