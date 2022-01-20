var years = document.querySelectorAll(".dropButton");

years.forEach(function (year) {
    year.addEventListener("click", function () {
        var child = year;
        for(var i=0; i<2; i++){
            child = child.nextElementSibling;
            if(child.classList.contains("displayOff")){
                child.classList.remove("displayOff");
            }
            else{
                child.classList.add("displayOff");
            }
        }
    });
});