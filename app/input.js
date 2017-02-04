$(document).ready(function() {

    $("#search").on("click", function() {
        var usernName = $("#usernName").val().trim();
        var placezipcode = $("#placezipcode").val().trim();


        window.location.href = "weather.html?usernName="+usernName+"&placezipcode="+placezipcode;

      });

});
