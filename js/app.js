(function ($) {
    "use strict";
    $('.toggle-button').click(function () {
        $('.nav-menu').toggleClass('active')
        $('.nav-overlay').toggleClass('active')
    })
    AOS.init({offset: 0, duration: 500});
    if ($(window).width() <= 768) { // Adjust width for mobile breakpoint as needed
        $('[data-aos]').attr('data-aos-delay', '500');
    }

    $("a[href='#']:not([href='#'])").on("click", function (event) {
        event.preventDefault(); 
        if (
            location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate(
                    {
                        scrollTop: target.offset().top - 80,
                    },
                    200,
                    "swing",
                    function () {
                        history.pushState(null, null, ' ');  // Ini menghapus hash dari URL tanpa mengganggu behavior back-button
                    }
                );
                return false;
            }
        }
    });

    // CTA Button
    $(document).ready(function() {
        $('.cta-huge-button').on('mousemove', function(e) {
            var btn = $(this);
            var circle = btn.find('.circle');
            var rect = btn[0].getBoundingClientRect();
            
            // Calculate mouse position relative to the button
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
    
            // Move the circle to follow the cursor
            circle.css({
                'top': y + 'px',
                'left': x + 'px'
            });
        });
    
        // Optional: Reset circle's position when the mouse leaves the button
        $('.cta-huge-button').on('mouseleave', function() {
            $(this).find('.circle').css({
                'top': '0',
                'left': '-100%'
            });
        });
    });
    

})(window.jQuery);