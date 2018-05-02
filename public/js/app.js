$(document).ready(function (){
    var counter;
    var socket = io();

    $(document).on('click', "#submit_button", function(event) {
        event.preventDefault();
        socket.emit('increment_counter', counter);
    })
    
    socket.on('updated_counter', function (counter) {
        $("#counter_string").html(`The button has been pushed ${counter} time(s)`)   
    });

    $(document).on('click', "#reset_button", function(event) {
        event.preventDefault();
        counter = 0;
        socket.emit('reset_counter', counter);
    })

    // socket.on('initial_counter', function () {
    //     $("#counter_string").html(`The button has been pushed ${counter} time(s)`)   
    // });
})