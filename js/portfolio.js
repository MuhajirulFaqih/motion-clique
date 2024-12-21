(function ($) {
    "use strict";

    var owlPortfolio = $('.owl-portfolio');
        owlPortfolio.owlCarousel({
            navigation: true,
            nav: false,
            dots: true,
            dotsEach: 1,
            autoWidth: false,
            loop: true,
            responsiveClass: true,
            items: 2,
            center: true,
            margin: 24,
            autoplay: false,
            responsive: {
                992: {
                    items: 2,
                },
                600: {
                    items: 2,
                },
            },
            onTranslated: portfolioCallBack
        });
        
        owlPortfolio.on("click", ".owl-item.active", function () {
            const $clickedItem = $(this).closest(".owl-item.active");
            const index = owlPortfolio.find(".owl-item.active").index($clickedItem);
            if(index !== 0)
                owlPortfolio.trigger('next.owl.carousel');
        });

        function portfolioCallBack (event) {
            var centerElement = $(event.target).find(".owl-item.center.active").html()
            var projectTitle = $(centerElement).attr("data-title")
            var projectDesc = $(centerElement).attr("data-content")
            var buttonColor = $(centerElement).attr("data-color")
            var projectBackground = $(centerElement).attr("data-background")

            $('.project-title').addClass('slide-out').delay(300).queue(function(next) {
                $(this).html('');
                var $newTextElement = $('<div class="slide-in"></div>').text(projectTitle);
                $(this).append($newTextElement);
                $(this).removeClass('slide-out');
                next();
            });

            $('.project-desc').fadeOut(300, function() {
                $(this).text(projectDesc).fadeIn(300);
            });
            
            $('#portfolio-bg').css('background', `url(${projectBackground}) center center / cover no-repeat`);
            $(".lets-grow").css("background", buttonColor)
        }

})(window.jQuery);