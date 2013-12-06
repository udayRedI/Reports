angular.module('FocusOn', [])
.directive('focusOn', function(){
    return {
        link: function(scope, element, attrs){
            console.log("Inside Focus");
            element.bind('click', function(){
                var focusOn = attrs.focusOn;
                document.getElementById("#"+focusOn).focus()
            });
        }
    };
});
