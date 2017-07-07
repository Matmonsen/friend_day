$(document).ready(function() {
    var count = 0;
    var template = '<div class="friend-row" friend-id="">' +
        '<div class="col-xs-6 col-sm-4">' +
        '<button type="button" class="btn btn-danger btn-block remove-friend" id="">Remove</button>' +
        '</div>' +

        '<div class=" col-xs-6 col-sm-8">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control date" placeholder="Friend"/>' +
        '<span class="input-group-addon">' +
        '<span class="glyphicon glyphicon-calendar"></span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>';


    var calculate = function() {

    };




    var addFriend = function() {
        var newRow = $(template);
        newRow.find("button").attr("id", count);
        newRow.attr("friend-id", count);
        count++;
        newRow.appendTo('.rows');
        $('.date').datetimepicker({
            format: 'DD/MM/YYYY'
        });
    };
    var removeFriend = function (elm) {
        var id = $(elm).attr("id");

        $('.rows').children('div').each(function(index, element) {
            if($(element).attr("friend-id") === id) {
                $(element).remove();
            }
        });
    };

    var disableCalculate = function() {
        $('#calculate-button').attr("disabled", $('.rows').children('div').length - 1 === 0);
    };

    $('#add-friend-button').click(function() {
        addFriend();
        disableCalculate();
    });

    $(document).on('click', '.remove-friend',  function() {
        removeFriend(this);
        disableCalculate();
    });

    addFriend();
});