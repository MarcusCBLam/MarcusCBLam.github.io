
var app = angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);

app.controller('MyController', function ($scope, $http, $log) {
		
		// initialise the variables for the app
		$scope.showResults = false;
		$scope.NoDataFound = false;		
		$scope.userTypes = "users";
		$scope.IsOrg = false;
		
		//pagination variables
		$scope.totalPerPage = 15; 
		$scope.maxSize = 6; // max number of buttons
		$scope.bigCurrentPage = 1;
		$scope.MaxItemsAllowed = 1000; //github allows up to 1000 but i'm limiting this for testing purposes.
		
		//sortby variables
		$scope.FullNameDir = "asc";
		$scope.CreatedAtDir = "asc";
		$scope.UpdatedAtDir = "asc";
		$scope.PushedAtDir = "asc";
		$scope.SortByString = "";
		$scope.DirString = "asc";

		//function to retrieve the number of pages for the results.
		$scope.totalPages = function() {
		  	return Math.ceil($scope.totalItems / $scope.totalPerPage);
		};
		
	
		// sets up the data panels, hiding the panels if necessary
		$scope.showPanel = function() {
			myField = document.getElementById('txtSearch').value;
			
			$scope.IsOrg = ($scope.userTypes === "orgs"? true : false);
			
			if (!myField=="" || !myField==undefined) {
			  $scope.getResults(); 
			} else {
			//hide panels if bad
			$scope.showResults = false;	
			}
		};	
		
		//function to limit the number of records to be retrieved. Github limit is 1000
		$scope.limitItems = function(total) {
			if (total > $scope.MaxItemsAllowed) {
				return $scope.MaxItemsAllowed;
			} else {
				return total;
			};
			
		};
		
		
		//setting on the sort string
		$scope.SortByThis = function(field) {
			switch (field) {
				case "created":
				  $scope.CreatedAtDir = ($scope.CreatedAtDir === 'asc' ? 'desc': 'asc' );
				  $scope.DirString = $scope.CreatedAtDir;
				  break;
				case "updated":
				  $scope.UpdatedAtDir = ($scope.UpdatedAtDir === 'asc' ? 'desc': 'asc' );
				  $scope.DirString = $scope.UpdatedAtDir;
				  break;
				case "pushed":
				  $scope.PushedAtDir = ($scope.PushedAtDir === 'asc' ? 'desc': 'asc' );
				  $scope.DirString = $scope.PushedAtDir;
				  break;
				case "full_name":
				  $scope.FullNameDir = ($scope.FullNameDir === 'asc' ? 'desc': 'asc' );
				  $scope.DirString = $scope.FullNameDir;
				  break;
			};
			$scope.SortByString = "&sort=" + field + "&direction=" + $scope.DirString ;
			$scope.loadRepos();
		};
		
		// gets the data from the github API
		$scope.getResults = function() {
			
			// part 1: search for user/organisation and get some owner details
			$scope.userTypes = document.getElementById('selTypes').options[selTypes.selectedIndex].value;
			$http.get("https://api.github.com/" + $scope.userTypes + "/" + encodeURIComponent($scope.searchText))
            .success(function (data) {
                $scope.userData = data;
				$scope.totalItems = $scope.limitItems(data.public_repos);
				$scope.bigTotalItems = $scope.totalItems;
				$scope.loadRepos();
				$scope.showResults = true;
				$scope.NoDataFound = false;
            })
			.error(function(data) {
				$scope.showResults = false;
				$scope.NoDataFound = true;
			});
			
		};
		
			// part 2: retrieve the repos. 
			// There is a limit restriction of 1000 records allowed. 
			// sorting is only available on users and is not available for organisations therefore sort buttons are disabled if the repos are that of organisations. 
			$scope.loadRepos = function () {
            $http.get("https://api.github.com/" + $scope.userTypes + "/" + encodeURIComponent($scope.searchText) + "/repos" + "?per_page=" + $scope.totalPerPage + "&page=" + $scope.bigCurrentPage + $scope.SortByString )
			       .success(function (data) {
                    $scope.repoData = data;
					console.log("loadRepos success: " + "https://api.github.com/" + $scope.userTypes + "/" + encodeURIComponent($scope.searchText) + "/repos" + "?per_page=" + $scope.totalPerPage + "&page=" + $scope.bigCurrentPage + $scope.SortByString );
					if (!data.length) {
						$scope.showResults = false;
					    $scope.NoDataFound = true;
					};	
                });
        	};
			
});

