$(".mapBtn").on("click", function(){
    console.log($(this).attr("data-type"));

})


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var search = getUrlVars()['q'];

console.log(search);

