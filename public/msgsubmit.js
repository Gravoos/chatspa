var msgsubmit = angular.module('msgsubmit', []).controller('chatcore', ['$scope', function($scope) {

    $scope.readyToSend = {};
    $scope.savednick;
    $scope.send = function() {
        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;

        var room = $('#room_name').text();
        var rgx1 = /<[^>]*>/g;

        if (rgx1.test($scope.core.msg)) {
            alert("Nie ma scriptow");

            $scope.core.msg = "";
            $('#area').val("");
        } else {
            var fb = firebase.database();
            var key = firebase.database().ref().child('posts').push().key;
            var updates = {};
            updates['/' + room + '/' + key] = $scope.core;
            //   updates['/user-posts/' + uid + '/' + key] = postData;
            firebase.database().ref().update(updates);
            $('#area').val("");
            $scope.core.msg = "";
        }
    };
    $scope.sendpic = function() {


        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        var picaddr = document.getElementById("addr").value;
        $scope.core.msg = '<img width="150" height="150" src="' + picaddr + '">';
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/writes/' + key] = $scope.core;
        //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
        $scope.core.msg = "";
        document.getElementById("addr").value = "";
    }
    $scope.sendyt = function() {
        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        var ytaddr = document.getElementById("addr").value;
        var yid = ytaddr.substring(ytaddr.length - 11, ytaddr.length);
        $scope.core.msg = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + yid + '" frameborder="0" allowfullscreen></iframe>';
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

            var room = $('#room_name').text();
            var rgx1 = /<[^>]*>/g;

            if (rgx1.test($scope.core.msg)) {
                alert("Nie ma scriptow");
                keyEvent.preventDefault();

                $scope.core.msg = "";
            } else {
                var fb = firebase.database();
                var key = firebase.database().ref().child('posts').push().key;
                var updates = {};
                updates['/' + room + '/' + key] = $scope.core;
                //   updates['/user-posts/' + uid + '/' + key] = postData;
                firebase.database().ref().update(updates);
                keyEvent.preventDefault();

                $scope.core.msg = "";
            }
        }
    }

    $scope.geolock = function() {
        var room = $('#room_name').text();

        function showPosition(position) {
            $scope.core.msg = '<iframe src="https://www.google.com/maps/embed/v1/place?q=' + position.coords.latitude + ',' + position.coords.longitude + '&zoom=15&key=AIzaSyDIA5_XQMB-271M4s0WH-xBei4RpISBJRk"></iframe>';
        }

        $scope.core.date = firebase.database.ServerValue.TIMESTAMP;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Nie można pobrać geolokalizacji");
        }
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/' + room + '/' + key] = $scope.core;
        //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
        $scope.core.msg = "";
    }

    $scope.clear = function() {
        $scope.core = {};
    };

    $scope.roomSynch = function(room) {

        $(".somebody").remove();
        $("#room_name").html(room);


        var fb = firebase.database().ref().child(room);
        fb.once('value', function(snapshot) {
            console.log("There are " + snapshot.numChildren() + " messages");


            var data = snapshot.val();
            console.log(data);


            for (var key in data) {
                console.log(data[key].nick);
                var time = new Date(data[key].date);
                var srtime = time.toString().substring(0, 25);

                var cldiv = '<div class="chat somebody">' +
                    '<div class="info_box">' +
                    '<span class="user_nick">' + data[key].nick + '</span><span class="msg_time"> ' + srtime + '</span> </div>' +
                    '<div class="msg_box"><p class="chat_message">' + data[key].msg + '</p>' +
                    '</div></div>';


                document.getElementById('boxchat').innerHTML += cldiv;


                $("#boxchat").scrollTop($("#boxchat")[0].scrollHeight);
            }




        });
    };
    $scope.globalinit = function() {

        var startListeningGener = function() {

            var fb = firebase.database().ref().child('General');


            fb.on('child_added', function(snapshot, prevChildKey) {

                var roomCheck = $('#room_name').text();

                if (roomCheck == 'General') {

                    var data = snapshot.val();
                    var time = new Date(data.date);
                    var srtime = time.toString().substring(0, 25);

                    var cldiv = '<div class="chat somebody">' +
                    '<div class="info_box">' +
                    '<span class="user_nick">' + data.nick + '</span><span class="msg_time"> ' + srtime + '</span> </div>' +
                    '<div class="msg_box"><p class="chat_message">' + data.msg + '</p>' +
                    '</div></div>';


                    document.getElementById('boxchat').innerHTML += cldiv;


                    $("#boxchat").scrollTop($("#boxchat")[0].scrollHeight);
                }
            })
        };


        var startListeningTech = function() {

            var fb = firebase.database().ref().child('Technology');


            fb.on('child_added', function(snapshot, prevChildKey) {

                var roomCheck = $('#room_name').text();

                if (roomCheck == 'Technology') {

                    var data = snapshot.val();
                    var time = new Date(data.date);
                    var srtime = time.toString().substring(0, 25);

                    var cldiv = '<div class="chat somebody">' +
                    '<div class="info_box">' +
                    '<span class="user_nick">' + data.nick + '</span><span class="msg_time"> ' + srtime + '</span> </div>' +
                    '<div class="msg_box"><p class="chat_message">' + data.msg + '</p>' +
                    '</div></div>';


                    document.getElementById('boxchat').innerHTML += cldiv;


                    $("#boxchat").scrollTop($("#boxchat")[0].scrollHeight);
                }
            })
        };

        startListeningGener();
        startListeningTech();
    }
}]);