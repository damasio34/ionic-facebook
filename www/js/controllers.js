(function(angular) {

    var controllers = angular.module('ionic-facebook.controllers', []);

	controllers.controller('LoginController', function($scope, $state, ngFB) {
		
		$scope.fbLogin = function () {
			// ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
			ngFB.login({scope: 'email,public_profile'}).then(
				function (response) {
					if (response.status === 'connected') {
						console.log('Facebook login succeeded');
						$state.go('perfil');
						// $scope.closeLogin();
					} else {
						alert('Facebook login failed');
					}
				});
		};
		
	});
	
	controllers.controller('PerfilController', function ($scope, ngFB) {
		ngFB.api({
			path: '/me',
			params: {fields: 'id,name'}
		}).then(
			function (user) {
				$scope.user = user;
				console.log(user);
			},
			function (error) {
				alert('Facebook error: ' + error.error_description);
			});
	});		

})(angular);