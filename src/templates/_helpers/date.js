Handlebars.registerHelper("ParseDate", function (date) {
	var d = new Date(date);
  var day = d.getDate();
  var month = d.getMonth() + 1; //Months are zero based
  var year = d.getFullYear();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  if (minutes < 10)
  	minutes = "0" + minutes;
  return (day + "/" + month + "/" + year + " " + hours + ":" + minutes);
});