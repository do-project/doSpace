ui("$").on("touch", function(){
    return false;
});

var pngs = [];
for (var i = 1; i <= 8; i++) {
    pngs.push({path: "source://image/loading/" + i + ".png", duration: 100})
}

ui("do_frameanimationview").startImages(pngs, -1);