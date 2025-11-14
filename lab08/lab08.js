$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "lab08json.json",
        dataType: "json",
        success: function(responseData, status){
            var output = "<ul>"; 
                $.each(responseData.labFiles, function(i, item){
                    output += "<li>";
                    output += '<a href="' + item.page + '">';
                    output += item.number + " - " + item.description;
                    output += "</a>"
                    output += "</li>";
        });
        output += "</ul>";   
                $('#projects').html(output);
    }, error: function(msg) {
        alert("There was a problem: " + msg.status + " " + msg.statusText)

    }
});

});