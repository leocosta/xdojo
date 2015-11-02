'use strict';

angular.module('xdojoApp')
  .factory('Event', function ($resource) {
    var Event = $resource('/api/events/:id/:controller', {
      id: '@_id'
    });
    // //http://sauceio.com/index.php/2014/07/angularjs-data-models-http-vs-resource-vs-restangular/
    // var Job = $resource('/api/jobs/:jobId', { full: 'true', jobId: '@id' }, {
    //     query: {
    //         method: 'GET',
    //         isArray: false,
    //         transformResponse: function(data, header) {
    //             var wrapped = angular.fromJson(data);
    //             angular.forEach(wrapped.items, function(item, idx) {
    //                 wrapped.items[idx] = new Job(item);
    //             });
    //             return wrapped;
    //         }
    //     }
    // });

    return Event;
  });
