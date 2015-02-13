$(document).ready(function(){


    // GOOGLE MAP CUSTOM STYLES

    var mapStyles = [
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
        { "visibility": "off" }
        ]
    },{
        "featureType": "water",
        "stylers": [
        { "hue": "#00b2ff" },
        { "color": "#61BEE9" }
        ]
    },{
        "featureType": "poi.park",
        "stylers": [
        { "visibility": "off" }
        ]
    },{
        "featureType": "landscape.natural",
        "stylers": [
        { "visibility": "off" }
        ]
    },{
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
        { "visibility": "off" }
        ]
    },{
    }
    ];

    // LOAD MAP


    function initializeGmap() {
        var mapCanvas = document.getElementById('gMap');
        var myLatlng = new google.maps.LatLng(52.156872,4.498958);

        var mapOptions = {
            center: myLatlng,
            zoom: 18,
            styles: mapStyles,
            scrollwheel : false,
            mapTypeControl: false,
            scaleControl: false,
            zoomControl:false,
            panControl: false,
            streetViewControl:false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);


        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: CCM_THEME_PATH + '/img/mapIcon.png',
            title: 'VINU consult'
        });

    }

    if($('.page-template-contact').length){
        google.maps.event.addDomListener(window, 'load', initializeGmap);
    }


    // REPLACE ALL SVG WITH PNG IF NECESSARY

    if (!Modernizr.svg) {
        $('img[src$=".svg"]').each(function() {
            //E.g replaces 'logo.svg' with 'logo.png'.
            $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
        });
    }



    // RESIZE HOMEPAGE VIDEO IF NEEDED


    VideoResizer = (function(){


        var obj = {};
        var winWidth = 0;
        var myVideo = document.getElementById('homepageVideo');
        var secondVideo = document.getElementById('homepageVideo-bridge');
        var myHero = document.getElementById('homepageHero');
        var myHeroImage = document.getElementById('homepageImage');
        var isPlaying = 0;

        obj.init = function(){
            winWidth = $(window).width();
            
            
            $('#homepageHero').css('height',$(window).height());
            // KILL VIDEO LOADING ON MOBILE DEVICES
            
            if(winWidth < 768){
                $('video')[0].pause();
                $('video')[0].src = ""; // Stops audio download.
            }
            
            // CONTINUE ON OTHERS
            
            $(myVideo).css('height',$('#homepageHero').height());
            
            obj.resize();
            obj.addEvents();

            setTimeout(function(){
                obj.resize();
            },500);
        };


        obj.resize = function(){

            $(myVideo).css('height',$('#homepageHero').height());
            $(secondVideo).css('height',$('#homepageHero').height());


            if($(myVideo).width() < $(window).width()){
                var newHeight = 0;
                var ratio = $(myVideo).width() / $('video').height();

                $(myVideo).css('height',Math.round(($(window).width()/ratio)));
                $(secondVideo).css('height',Math.round(($(window).width()/ratio)));
            }
        };


        obj.addEvents = function(){
            $(window).resize(function(){
                winWidth = $(window).width();
                obj.resize();
            });

            myVideo.addEventListener('ended', function(e) {
                //myVideo;
                TweenLite.to(myVideo, 1.5, {opacity:0,delay:1});
            
                $(secondVideo)[0].play();
                TweenLite.to(secondVideo, 1.5, {opacity:0.8});                
            });

            myVideo.addEventListener('play', function(e) {
                TweenLite.to(myVideo, 1.5, {opacity:0.6,delay:2});
                TweenLite.to(myHeroImage, 1.5, {opacity:0,delay:2});
                TweenLite.to(myHero, 1.5, {backgroundColor:'#000000',delay:2});

                // START LOADING NEXT
                
                $(secondVideo).append('<source src="/application/themes/vinu/media/zeelandbrug.mp4" type="video/mp4"><source src="/application/themes/vinu/media/zeelandbrug.webm" type="video/webm"><source src="/application/themes/vinu/media/zeelandbrug.ogv" type="video/ogg">');
            });
            
            secondVideo.addEventListener('ended', function(e) {
                //myVideo;
                TweenLite.to(secondVideo, 1.5, {opacity:0,delay:1});
            
                $(myVideo)[0].play();
                TweenLite.to(myVideo, 1.5, {opacity:0.6});
            });            



        };



        return obj;


    })();



    
    
    // MENU-BEHAVIOUR ON HOMEAPGE IS DIFFERENT THEN THE REST


    HomepageMenuTweak = (function(){
        var obj = {};
        var menuOpen = false;

        obj.init = function(){
            obj.addEvents();
        };


        obj.addEvents = function(){
            $('.navbar-toggle').on('click',function(){
                if($('.page-template-home').length){

                    obj.modifyHomepageHeader();

                }
            });
            
            var itemArr = [];
            
            $('.homepageNewsOverview .col-sm-12').not('.featuredStory').each(function(){
                
                itemArr.push($(this));
            });
        
            Utilities.setElementsToEqualHeight(itemArr);
        };


        // CHANGES THE LOGO AND MENU BAR BACKGROUND WHEN MENU IS OPENED

        obj.modifyHomepageHeader = function(){
            if(menuOpen === false){
                $('.navbar-header').css('backgroundColor','#FFFFFF');
                $('.icon-bar').addClass('menuOpen');
                $('.navbar-brand img').css('opacity','0');
                $('.navbar-brand img').attr('src','/dist/img/vinu-logo.svg');
                TweenLite.to($('.navbar-brand img'), 1.5, {opacity:'1'});
                menuOpen = true;
            }
            else{
                //$('.navbar-header').delay(10000).css('backgroundColor','transparent');
                $('.icon-bar').delay(1000).removeClass('menuOpen');
                $('.navbar-brand img').css('opacity','0');
                $('.navbar-brand img').delay(1000).attr('src','/dist/img/vinu-logo-white.svg');
                TweenLite.to($('.navbar-brand img'), 1.5, {opacity:'1'});
                TweenLite.to($('.navbar-header'), 0.2, {backgroundColor:'tranparent'});
                menuOpen = false;
            }

        };


        obj.init();
    })();
    
    
    
    // Returns ajax calls
    
        
    
    AjaxPoster = (function(){
        
        var obj = {};
        var newData;
        
        obj.getNewData = function(_url){
            
            url = _url;
            
            newData = $.ajax({
                dataType : 'json',
                url : _url,
            });         
            
            // = $.get(url);

            return newData;
            
        };        
        
        return obj;
        
        
    })();
    
    

    // TEAMMEMBER INTERACTION


    TeamMember = (function(){

        var obj = {};
        var leftOffset = 0;
        var topOffset = 0;
        var current = 0;

        obj.init = function(){
            obj.addEvents();
        };


        obj.addEvents = function(){
            
            $('.teamMember').each(function(){

                $(this).find('.memberInfo').css('bottom',-($(this).find('.memberInfo').height() + 40));
                $(this).css('background','#fff');

                $(this).on('mouseenter',function(){
                    obj.showInfo($(this).attr('id'));
                });
            });

            $('.memberContainer').each(function(){

                $(this).on('click',function(){
                    var id = 'tm' + $(this).attr('id').substr(3,3);
                    obj.showInfo(id);
                    var offset = $('#'+id).offset().top;
                    $('html,body').animate({scrollTop:offset},200);
                });
            });


        };



        obj.showInfo = function(targetId){
            var target = $('#' + targetId);
            $('.teamMember').removeClass('open');

            if(current !== targetId){
                $('#' + targetId).addClass('open');
                current = targetId;
            }
            else{
                current = 0;
            }


        };


        return obj;

    })();

    TeamMember.init();

    if($('video').length){
        VideoResizer.init();
    }



    // CREATE AN INFINITE LOOPING CAROUSEL BASED ON MOUSEMOVE

    InfiniteCarousel = (function(){

        var obj = {};
        var mainContainer = $('#teamHeroImage');
        var container = $('#scrollContainer');
        var img1 = $('#img1');
        var img2 = $('#img2');
        var winWidth = $(window).width();
        var pageCenter = (winWidth/2);
        var direction = 'right';
        var mouseX = 0;
        var relativeX = 0;
        var isHovering = false;
        var itemWidth = 200;
        var nrItems = 0;
        var itemArray = [];
        var cssPrefix = '';
        var csstransforms;

        
        obj.init = function(){
            nrItems = $('.memberContainer').length;

            // Position images
            $('.memberContainer').each(function(index,value){
                $(this).css('left',(index * itemWidth));
                itemArray.push($(this));
            });
            
            
            // Dont's add any events if the number of items fits on the screen
            
            if(($('.memberContainer').length * itemWidth) < $(window).width()) return;
                        

            // Detect if we have css transforms - otherwise we're in old browsers
            csstransforms = Modernizr.csstransforms;

            // getPrefix only works IE8 +
            if(csstransforms){
                cssPrefix = obj.getPrefix().css;
            }


            // Set the inital position of the container
            if(csstransforms){
                container.css(cssPrefix +'transform','translateX(' + (0) + 'px)');
            }
            else{
                $('#scrollContainer').css('position','absolute');
                $('#scrollContainer').css('left','0');
            }

            obj.addEvents();

        };


        obj.addEvents = function(){
            mainContainer.on('mouseenter',function(){
                isHovering = true;
            });

            mainContainer.on('mouseleave',function(){
                isHovering = false;
                obj.scrollEaseOut();
            });

            mainContainer.on('mousemove',function(e){
                if(isHovering === true) obj.calculateSpeed(e);
            });



            // RquestAnimationFrame

            // shim layer with setTimeout fallback
            window.requestAnimFrame = (function(){
                return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
            })();


            // usage:
            // instead of setInterval(render, 16) ....

            (function animloop(){
                requestAnimFrame(animloop);
                obj.moveImages();
            })();
            // place the rAF *before* the render() to assure as close to
            // 60fps with the setTimeout fallback.

        };

        obj.scrollEaseOut = function(){

        };

        //
        // Gets the browser css prefix
        //
        obj.getPrefix = function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        };

        //
        // Calculate scrollspeed based on mousePosition
        //

        obj.calculateSpeed = function(e){
            mouseX = e.pageX;
            direction = (mouseX < pageCenter) ? 'right' : 'left';
            relativeX = Math.abs(pageCenter - mouseX);
            speed = Math.round(relativeX * 0.04);
        };

        //
        // ACTUALY MOVE AND REPOSITION IMAGES
        //

        obj.moveImages = function(){
            if(isHovering === false) return false;
            var matrix;
            var currentVal;
            var newVal;            
            
            if(csstransforms){
                matrix = obj.matrixToArray(container.css(cssPrefix + 'transform'));
                currentVal = parseInt(matrix[4]);
                newVal = (direction === 'left') ? (currentVal - speed) : Number(currentVal + speed);
                container.css(cssPrefix + 'transform','translateX(' + newVal + 'px)');
            }
            else{
                currentVal = parseInt(container.css('left'));
                newVal = (direction === 'left') ? (currentVal - speed) : Number(currentVal + speed);
                container.css('left',newVal + 'px');
            }


            obj.repositionElements();
        };

        //
        // TAKE ELEMENTS OUT OF THE DOM TO PLACE THEM AT THE FRONT OR END
        //

        obj.repositionElements = function(){
            
            
            var el;

            if(direction === 'left'){

                if((itemArray[0].offset().left + 200) < 0){
                    var itm = itemArray.shift();
                    itemArray.push(itm);
                    itm.css('left',(itemArray[nrItems-2].offset().left - container.offset().left) + 200);
                    return false;

                }
            }

            if(direction === 'right'){

                if(itemArray[nrItems-1].offset().left > winWidth){
                    var itmRight = itemArray.pop();
                    itemArray.unshift(itmRight);
                    itmRight.css('opacity',1);
                    itmRight.css('left',(itemArray[1].offset().left - container.offset().left) - 200);
                    return false;
                }

            }

            if(1===1) return;

            $('.memberContainer').each(function(index,value){

                var el = $(this);

                if(direction === 'left'){

                    if((el.offset().left + 200) < 0){
                        var arrayItem = itemArray.shift();
                        itemArray.push(arrayItem);
                        
                        itemArray[nrItems-1].css('opacity',0.5);
                        //el.offset().left;
                        //container.append(el);
                    }

                }
            });

        };

        
        // Used to retrieve the translate css property
        
        obj.matrixToArray = function(matrix) {
            return matrix.substr(7, matrix.length - 8).split(', ');
        };



        return obj;


    })();

    // INIT CAROUSEL

    if($('#teamHeroImage').length) InfiniteCarousel.init();
    
    
    // ADD SPINNERS TO LOADING BUTTONS


    SpinnerButtons = (function(){

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
            color: '#2E614C', // #rgb or #rrggbb or array of colors
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
            $('.loadMore').on('click',function(){
                obj.addSpinner($(this).find('.spinContainer'));
            });
        };


        obj.addSpinner = function(_target){
            spinContainer = _target;
            spinner = new Spinner(opts).spin();
            $(_target).append(spinner.el);
            $(_target).addClass('open');
        };
        
        obj.removeSpinner = function(){
            spinner.stop();
            $(spinContainer).removeClass('open');
        };
        
        obj.init();
        
        return obj;


    })();
    
    
    //
    // LOAD MORE ArtICLES FUNCTION
    //
    
    
    LoadMoreArtcles = (function(){
    
        var obj = {};
        var nextPageURL = $('.loadMore').attr('href');
        
        
        obj.init = function(){
            $('.loadMore').on('click',function(e){
                e.preventDefault();
            
                AjaxPoster.getNewData(nextPageURL).done(function(data){
                    nextPageURL = data.nextPageURL;
                    
                    $('.homepageNewsOverview .row').append(data.html);                    
                    
                    // HIDE BUTTON IF WE'VE FETCHED ALL ARTICLES IN THE ARCHIVE
                    
                    if(data.hasNextPage === false){
                        TweenLite.to($('.loadMore'), 0.5, {opacity:0});
                        //$('.loadMore').css('opacity','0.5');
                    }
                    
                }).fail(function() {
                    $('.loadMore').html('er is iets misgegeaan met het laden');
                })
                .always(function() {
                    SpinnerButtons.removeSpinner();
                });     
            });
        };
        
        obj.init();

        
    })();

    
    // Use the arrow on the homepage video to scroll down a bit
    
    
    HomepageScroll = (function(){
        
        var obj = {};
        
        obj.addEvents = function(){
            $('#scrollDown').css('cursor','pointer');
            $('#scrollDown').on('click',function(){
                obj.scrollHomepageDown();
            });
        };
        
        
        obj.scrollHomepageDown = function(){
            $('body,html').animate({scrollTop:$('#homepageAddressBar').offset().top});  
        };
        
        obj.addEvents();
        
    })();



});
