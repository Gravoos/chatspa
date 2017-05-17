var msgsubmit = angular.module('msgsubmit', []).controller('chatcore', ['$scope', function ($scope) {
    $scope.readyToSend = {};
    $scope.send = function () {
        var fb = firebase.database();
        var key = firebase.database().ref().child('posts').push().key;
        var updates = {};
        updates['/posts/' + key] = $scope.core;
     //   updates['/user-posts/' + uid + '/' + key] = postData;
        firebase.database().ref().update(updates);
    };
    $scope.clear = function () {
        $scope.core = {};
    }
}]);