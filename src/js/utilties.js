    
// UTILITIES.JS


Utilities = (function(){
    
    var obj = {};
    
    obj.setElementsToEqualHeight = function(itemArray){
        
        var maxHeight = 0;
        
        $.each(itemArray,function(index, val){
            maxHeight = Math.max(maxHeight,$(val).height());

        });
        $.each(itemArray,function(index, val){
            $(val).css('height',maxHeight);
        });
        
    };
    
    obj.isValidEmail = function(_emailString){
        var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return emailCheck.test(_emailString);
    };
    
    return obj; 
    
})();