var app = angular.module('portfolioApp', []);
app.controller('projectsCtrl', function($scope, dataService){
    $scope.allProjects = [];
    $scope.filteredProjects = [];
    $scope.pagedFilteredProjects = [];
    
    // get project details
    dataService.readJson('./data/projects.json').then(function(response) {
        $scope.allProjects = response.data;
        $scope.filterProjectOnTag();
    }, function(error) {
        console.error(error);
    });

    // project filtering based on tags code
    $scope.projectFilterTagList = ['All', 'Front-End', 'Responsive', 'Angular', 'Bootstrap'];
    $scope.projectFilterTag = 'All';

    $scope.filterProjectOnTag = function() {
        if ($scope.projectFilterTag == 'All') {
            $scope.filteredProjects = $scope.allProjects;
        } else {
            $scope.filteredProjects = $scope.allProjects.filter(project => project.tags.indexOf($scope.projectFilterTag) >= 0);
        }
        // reset pagination
        $scope.totalPages = Math.ceil($scope.filteredProjects.length / $scope.ITEMS_PER_PAGE);
        $scope.currentPage = 1;
        $scope.paginateProjects();
    }

    $scope.changeProjectFilterTag = function(newTag) {
        $scope.projectFilterTag = newTag;
        $scope.filterProjectOnTag();
    }

    // pagination code
    $scope.ITEMS_PER_PAGE = 4;
    $scope.currentPage = 1;
    $scope.totalPages = 0;

    $scope.paginateProjects = function() {
        var begin = ($scope.currentPage - 1) * $scope.ITEMS_PER_PAGE;
        var end = $scope.currentPage * $scope.ITEMS_PER_PAGE;
        $scope.pagedFilteredProjects = $scope.filteredProjects.slice(begin, end);
    }

    $scope.changePage = function(newPage) {
        $scope.currentPage = newPage;
        $scope.paginateProjects();
    }
});

app.controller('skillsCtrl', function($scope, dataService) {
    $scope.skills = [];
    dataService.readJson('./data/skills.json').then(function(response) {
        $scope.skills = response.data;
    }, function(error) {
        console.error(error);
    });
});

app.controller('experienceCtrl', function($scope, dataService) {
    $scope.jobs = [];
    dataService.readJson('./data/jobs.json').then(function(response) {
        $scope.jobs = response.data;
    }, function(error) {
        console.error(error);
    });
})

app.service('dataService', function($http) {
    this.readJson = function(filePath) {
        return $http.get(filePath);
    }
});

/**
 * display list of tags like [tag1, tag2] as #tag1, #tag2
 */
app.filter('tagsList', function () {
    return function(tagsArr) {
        tagsArr = tagsArr.map(tag => '#' + tag);
        return tagsArr.join(', ');
    }
});