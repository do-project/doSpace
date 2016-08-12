var rootview = ui("$");
var page = sm("do_Page");

rootview.on("touch", function(){
    this.visible = false;
    page.hideKeyboard();
});
