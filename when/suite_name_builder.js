
var separator = ' \u00bb ';

function build_suite_name(act) {

	var splitChar = '/';
	if (act.filename.indexOf('\\') > -1)
		splitChar = '\\';
	var folderArray = act.filename.split(splitChar);
	folderArray.shift();
	var shallowActName = actName();

	return folderArrayToWhenName() + separator + shallowActName;


	function folderArrayToWhenName() {
		var name = folderArray.pop();
		if (name.toLowerCase().indexOf('spec') >= 0)
			return name ;
		return folderArrayToWhenName()  + separator  +  name;
	}

	function actName()
	{
		var shortFileName = folderArray.pop();
		return shortFileName.split('.js')[0];
	}

}



module.exports = build_suite_name;
