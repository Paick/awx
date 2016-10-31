export default ['templateUrl', function(templateUrl) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            collection: '=',
            dataset: '=',
            basePath: '@',
            columnOrderBy: '@',
            columnNoSort: '@',
            columnCustomClass: '@',
            columnIterator: '@',
            columnField: '@',
            columnLabel: '@',
        },
        controller: 'ColumnSortController',
        templateUrl: templateUrl('shared/column-sort/column-sort')
    };
}];
