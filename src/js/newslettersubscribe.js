    
    // NEWSLETTERSUBSCRIBE.JS
    
    
    // ADDS A SPINNER TO OUR SUBMIT BUTTON


    SubmitSpinner = (function(){

        var obj = {};
        var spinner;
        var spinContainer;
        var opts = {
            lines: 7, // The number of lines to draw
            length: 3, // The length of each line
            width: 2, // The line thickness
            radius: 3, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#008BCB', // #rgb or #rrggbb or array of colors
            speed: 1.4, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent
        };
        
        
        obj.init = function(){
            
        };


        obj.addSpinner = function(_target){
            
            
            spinContainer = _target;
            spinContainer.html('&nbsp;');
            spinner = new Spinner(opts).spin();
            $(_target).append(spinner.el);
            $(_target).addClass('open');
        };
        
        obj.removeSpinner = function(){
            spinner.stop();
            spinContainer.html('VERSTUURD');
            $(spinContainer).removeClass('open');
        };
        
        obj.init();
        
        return obj;


    })();

    
    
    //
    // NewLetterSignup in the FOOTER
    //
    
    
    NewLetterSignup = (function(){
    
        var obj = {};
        var postURL = $('.footerNewsLetter form').attr('action');
        var signuButton = $('.footerNewsLetter .submit');
        
        
        // ADD EVENTS
        

        obj.init = function(){
            $('.footerNewsLetter .submit').on('click',function(e){
                
                obj.postForm(postURL);
                e.preventDefault();
            
            });
        };
        
        
        // POST FORM AND HANDLE RESPONSE
        
                        
        obj.postForm = function(_postURL){
            
            // CHECK E-MAIL VALIDITY
            
            if(!Utilities.isValidEmail($('.footerEmail').val())){
                $('#newsLetterError').html('Dit lijkt geen geldig e-mail adres te zijn');
                return false;
            }
            
            // RESET ANY ERRORS MESSAGES
            
            $('#newsLetterError').html('');
            
            // ADD A SPINNER
            
            SubmitSpinner.addSpinner(signuButton);            
            
            var data;
            
            // NOW LETS ACTUALLY POST
            
            $.post(_postURL, $('.footerNewsLetter form').serialize(),'json').done(function(_data) {
                
                data = $.parseJSON(_data);
                
                if(data.code === 201 || data.code === '201'){
                   $('#newsLetterError').html('');
                   $('.footerEmail').val('');
                   $('.footerEmail').attr('placeholder','Je bent succesvol ingeschreven'); 
                }

              })
              .fail(function(_data) {
                  $('#newsLetterError').html('Er is iets mis gegaan, probeer het later nogmaals');
                  
              })
              .always(function(_data) {
                  SubmitSpinner.removeSpinner();
                
            });
        };
        
        
        // INITIATE THIS FUNCTION
        
        
        obj.init();

        return obj;
                
                
        
    })();