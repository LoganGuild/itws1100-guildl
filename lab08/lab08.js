$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "../lab08/lab08json.json",
        dataType: "json",
        success: function(responseData, status){
            var output = "<nav><ul>"; 
                $.each(responseData.labFiles, function(i, item){
                    output += "<li>";
                    output += '<a href="' + item.page + '">';
                    output += '<span class="linkText">' + item.number + " - " + item.description + '</span>';
                    output += "</a>"
                    output += "</li>";
        });
        output += "</ul></nav>";   
                $('#projects').html(output);
    }, error: function(msg) {
        alert("There was a problem: " + msg.status + " " + msg.statusText)

    }
});

});

$(document).on("mouseenter", "#projects a", function () {
  $(this).children(".linkText").fadeOut(600).fadeIn(1750);
});

$(document).ready(function () {
  $("#projects").hide().fadeIn(3000);
});
