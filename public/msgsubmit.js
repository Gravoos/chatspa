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
}]);