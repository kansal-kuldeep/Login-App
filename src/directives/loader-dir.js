LoginApp.directive('loader', function ()  
{  
    return {  
        restrict: 'E',  
        template: '<div class="loading-spiner"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" /> </div>' 
    };  
});  