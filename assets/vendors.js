// getting url parameters
function getUrlVars(url) {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var search = getUrlVars()['q'];

console.log(search);

// link icon buttons on vendor--search.html
$(".mapBtn").on("click", function(){
    console.log($(this).attr("wedding-dress"));
    
    window.location.href = "Vendor-Search.html?q=" + $(this).attr("data-type");
    window.location.href = "index.html?q=" + $(this).attr("data-type");

})

$(".ideaBtn").on("click", function(){
    console.log($(this).attr("tuxedo"));
})



$(".favBtn").on("click", function(){
    console.log($(this).attr("data-type"));

    window.location.href = "Vendor-Search.html?q=" + $(this).attr("data-type");

})
