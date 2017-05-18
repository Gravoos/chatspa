var msgsubmit = angular.module('msgsubmit', []).controller('chatcore', ['$scope', function ($scope) {
    $scope.readyToSend = {};
    $scope.send = function () {
        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/writes/' + key] = $scope.core;
     //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
    };
    $scope.clear = function () {
        $scope.core = {};
    }
    $scope.chatsync = function () {
        var fb = firebase.database().ref().child("writes");
        var startListening = function () {
            fb.on('child_added', function (snapshot, prevChildKey) {
                var data = snapshot.val();
                var time = new Date(data.date);
                var srtime = time.getHours() + ":" + time.getMinutes() + ":" + time.getHours() + "  " + time.getDay() + "/" + (time.getMonth()+1) +"/" + time.getFullYear();

/*
<<<<<<< HEAD */
				var cldiv = '<div class="chat somebody">'+
								'<div class="photo_box">'+
									'<div class="user_photo"></div>'+
								'</div>'+
								'<div class="message_box">'+
									'<p class="user_info">'+data.nick+', '+data.date+'</p>'+
									'<p class="chat_message">'+data.msg+'</p>'+
								'</div>'+
							'</div>';
							
							
                document.getElementById('boxchat').innerHTML += cldiv;
				/*
=======
                    var cldiv = '<div class="chat somebody"><div class="user_photo"></div><div><p class="user_info">'+data.nick+', '+ srtime +'</p> <p class="chat_message">'+data.msg+' </p></div></div>';
                        document.getElementById('boxchat').innerHTML += cldiv;
>>>>>>> 3875dbe46c79327546ddcf27d42b876576987b93
				*/
				
				$("#boxchat").scrollTop($("#boxchat")[0].scrollHeight);
            })
        }
        startListening();
    }
}]);