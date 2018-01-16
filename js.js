var fs = require('fs');
var configFile = fs.readFileSync('config.json');
var config = JSON.parse(configFile);

function updateConfigDir(){
	const {dialog} = require('electron').remote;
	console.log(dialog.showSaveDialog('openDirectory'));
	config.config.dir = dir;
}

if(config.config.dir == ""){
	errorFunc('<div class="alert alert-danger" role="alert">You have not set a config directory</div><button type="button" class="btn btn-primary-outline" onClick="updateConfigDir()">Choose directory</button>');
} 

var platform = "Ubuntu";
var exec = require('child_process').exec;
var terminal;
const remote = require('electron').remote;
function errorFunc(error, title){
	$('#errorModal').find('.modal-body').html(error);
	$('#errorModal').modal('toggle');
	if(title){
		$('#errorModal').find('.modal-title').text(title);
	}
}

$('#errorModal').on('hidden.bs.modal', function(e){
	$('#errorModal').find('.modal-body').text("");
	$('#errorModal').find('.modal-title').text("Error");
});

function getTerminal(){				
	if(platform == "Ubuntu"){
			exec('xterm -e exit', function callback(error, stdout, stderr) {
				if(error == null){
					terminal = 'xterm';
				}else{
					errorFunc('xterm');
				}
			});
	}
}
function checkCommand(cmd, message) {
	exec(cmd, function callback(error, stdout, stderr) {
		if(stderr != '') {
			errorFunc(message);
		}
	});
}
getTerminal();
function build(){
	if(platform == "Ubuntu"){
		checkCommand('git version', 'Git is required');
		checkCommand(terminal + ' -e "./build_minetest.sh -clone; ./build_minetest.sh -build"', 'Build Failed!');
	} else {
		errorFunc('Sorry, your platform does not support autobuilding');
	}
}
