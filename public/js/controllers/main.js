agGrid.initialiseAgGridWithAngular1(angular);
angular.module('todoController', ["agGrid"])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		var columnDefs = [{
				headerName: "German",
				field: "german"
			},
			{
				headerName: "Tamil",
				field: "tamil"
			},
			{
				headerName: "English",
				field: "english"
			},
			{
				headerName: "Description",
				field: "description"
			},
			{
				headerName: "UpdatedOn",
				field: "UpdatedOn"
			}
		];

		
		$scope.gridOptions = {
			columnDefs: columnDefs,
			rowData: []
		};
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.then(function (data) {
				$scope.todos = data.data;
				$scope.gridOptions.api.setRowData($scope.todos);
				$scope.gridOptions.columnApi.sizeColumnsToFit();
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.save = function () {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData != undefined) {
				$scope.loading = true;
				Todos.create($scope.formData)
					.then(function (data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data.data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function (id) {
			$scope.loading = true;

			Todos.delete(id)
				// if thenful creation, call our get function to get all the new todos
				.then(function (data) {
					$scope.loading = false;
					$scope.todos = data.data; // assign our new list of todos
				});
		};
	}]);