$(document).ready(function() {
    var rowIdAttr = "friend-id";
    var dateFields = ".date";
    var dateFormat = "DD/MM/YYYY";
    var friendIdCounter = 0;
    var template = $("#template").html();


    var sortByMonthThenDay = function(d1, d2) {
        if (d1.month() > d2.month())
            return true;

        if (d1.month() === d2.month())
            return d1.date() > d2.date();

        return false;
    };

    var midDateBetween = function(d1, d2) {
        return moment((d1 + d2) / 2);
    };

    var makeListOfDatesEven = function(allDates) {
        if (allDates.length % 2 !== 0)
            allDates.push(allDates[allDates.length - 1]);
        return allDates;
    };

    var setAnswer = function(friendDate) {
        if (typeof friendDate !== "undefined")
            $("#answer").html("Universet har snakket.<br> Den " + friendDate.format(dateFormat) + " må dere finne på noe sammen. Universet garanterer en gøy kveld.<br> Skriv det ned i kalenderen.");
    };

    var getDatesFromInputFields = function() {
        var allDates = [];
        $(dateFields).each(function() {
            var d = moment($(this).val(), dateFormat);
            if (!isNaN(d))
                allDates.push(d);

        });
        return allDates;
    };

    var findFriendDate = function(allDates) {

        while (allDates.length  > 1) {
            var next = [];

            makeListOfDatesEven(allDates);

            for(var i = 0; i < allDates.length; i+=2) {
                var midDate = midDateBetween(allDates[i], allDates[i + 1]);
                next.push(midDate)
            }
            allDates = [];
            allDates = next;
        }
        return allDates[0];
    };

    var addFriend = function() {
        var newRow = $(template);
        newRow.find("button").attr("id", friendIdCounter);
        newRow.attr(rowIdAttr, friendIdCounter);
        friendIdCounter++;
        newRow.appendTo('.rows');
        $(dateFields).datetimepicker({
            format: dateFormat
        });
    };
    var removeFriend = function (elm) {
        var id = $(elm).attr("id");

        $('.rows').children('div').each(function(index, element) {
            if($(element).attr(rowIdAttr) === id) {
                $(element).remove();
            }
        });
    };

    var disableCalculate = function() {
        $('#calculate-button').attr("disabled", $('.rows').children('div').length - 1 === 0);
    };

    // Listeners
    $('#add-friend-button').click(function() {
        addFriend();
        disableCalculate();
    });
    $(document).on('click', '.remove-friend',  function() {
        removeFriend(this);
        disableCalculate();
    });
    $("#calculate-button").click(function() {
        var allDates = getDatesFromInputFields();
        allDates.sort(sortByMonthThenDay);
        allDates = makeListOfDatesEven(allDates);

        var friendDate = findFriendDate(allDates);
        setAnswer(friendDate);

    });

    addFriend();
});
