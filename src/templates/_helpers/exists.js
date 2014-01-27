Handlebars.registerHelper("Exists", function (attr, defaultValue) {
	if (attr)
		return attr;
	else
		return defaultValue;
});