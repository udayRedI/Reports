angular.module('FocusOn', [])
.directive('focusOn', function(){
    return {
        link: function(scope, element, attrs){
            element.bind('change', function(){
                var focusOn = attrs.focusOn;
                focusableElement = document.getElementById(focusOn);
                focusableElement.focus();
            });
        }
    };
});
