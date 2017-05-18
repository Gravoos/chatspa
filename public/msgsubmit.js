var msgsubmit = angular.module('msgsubmit', []).controller('chatcore', ['$scope', function($scope) {
    $scope.readyToSend = {};
    $scope.savednick;
    $scope.send = function() {
        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/writes/' + key] = $scope.core;
        //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
        $scope.core.msg = "";
    };
	$scope.sendpic = function () {
		
		
        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        var picaddr = document.getElementById("addr").value;
        $scope.core.msg = '<img width="150" height="150" src="'+picaddr+'">';
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/writes/' + key] = $scope.core;
        //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
        $scope.core.msg = "";
        document.getElementById("addr").value = "";
    }
    $scope.sendyt = function () {
        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        var ytaddr = document.getElementById("addr").value;
        var yid = ytaddr.substring(ytaddr.length-11,ytaddr.length);
        $scope.core.msg = '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+yid+'" frameborder="0" allowfullscreen></iframe>';
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/writes/' + key] = $scope.core;
        //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
        $scope.core.msg = "";
        document.getElementById("addr").value = "";
    }
    $scope.send_on_enter = function(keyEvent) {
        if (keyEvent.which === 13 && !keyEvent.shiftKey) {
            $scope.core.date = firebase.database.ServerValue.TIMESTAMP;

		//	var room = document.getElementById('room_name').value;
			
            var rgx1 = /<[^>]*>/g;
			
			if(rgx1.test($scope.core.msg)){
				alert("Nie ma scriptow");
				keyEvent.preventDefault();
				
				$scope.core.msg = "";
			} else {
				var fb = firebase.database();
				var key = firebase.database().ref().child('posts').push().key;
				var updates = {};
				updates['/writes/' + key] = $scope.core;
				//   updates['/user-posts/' + uid + '/' + key] = postData;
				firebase.database().ref().update(updates);
				keyEvent.preventDefault();
				
				$scope.core.msg = "";
			}
        }
    }

    $scope.clear = function() {
        $scope.core = {};
    };
    $scope.chatsync = function() {
        var fb = firebase.database().ref().child("writes");
        var startListening = function() {
            fb.on('child_added', function(snapshot, prevChildKey) {
                var data = snapshot.val();
                var time = new Date(data.date);
                var srtime = time.toString().substring(0, 25);

                var cldiv = '<div class="chat somebody">' +
                    '<div class="photo_box">' +
                    '<div class="user_photo"></div>' +
                    '</div>' +
                    '<div class="message_box">' +
                    '<p class="user_info">' + data.nick + ', ' + srtime + '</p>' +
                    '<p class="chat_message">' + data.msg + '</p>' +
                    '</div>' +
                    '</div>';


                document.getElementById('boxchat').innerHTML += cldiv;


                $("#boxchat").scrollTop($("#boxchat")[0].scrollHeight);
            })
        };
        startListening();
    }
}]);