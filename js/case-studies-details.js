function handleCard() {
    const section = $('#result-card-outline');
    const pills = $('.result-card-1, .result-card-2, .result-card-3');
    const sectionTop = section.offset().top;
    const sectionBottom = sectionTop + section.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    // Check if the section is within the viewport
    const isSectionInViewport = sectionBottom > viewportTop && sectionTop < viewportBottom;

    // Remove class when viewport is at the top or section is not visible
    if ((sectionTop-viewportTop) > viewportTop || !isSectionInViewport) {
        pills.each(function(index) {
            $(this).removeClass(`animate-pill-${index + 1}`);
        });
    } else {
        pills.each(function(index) {
            $(this).addClass(`animate-pill-${index + 1}`);
        });
    }
}

$(window).scroll(function () {
    handleCard();
});
handleCard(); 