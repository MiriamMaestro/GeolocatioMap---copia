
$(function () {
    var today = new Date();
    var date = new Date();

    for (x = 0; x <= 7; x++) {
        date.setDate(today.getDate() + x);
        textDate = $.datepicker.formatDate('D, dd-M', date);
        $('#day')
            .append($("<option></option>")
            .attr("value", x)
            .text(textDate));
    }
});