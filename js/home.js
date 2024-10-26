function handlePill() {
    const section = $('#startups');
    const pills = $('.pill-1, .pill-2, .pill-3');
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

function handleCtaText() {
    const section = $('.cta-rotate');
    const sectionTop = section.offset().top;
    const sectionBottom = sectionTop + section.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    const isSectionInViewport = sectionBottom > viewportTop && sectionTop < viewportBottom;
    if ((sectionTop-viewportTop) > viewportTop || !isSectionInViewport) {
        $(".cta-rotate").removeClass(`animate-cta-rotate`);
    } else {
        $(".cta-rotate").addClass(`animate-cta-rotate`);
    }
}

$(window).scroll(function () {
    handlePill();
    handleCtaText();
});
handlePill(); // Initial check
handleCtaText(); // Initial check

// Testimonials Carousels
var owlTestimonials = $('.owl-testimonials');
owlTestimonials.owlCarousel({
    navigation: false,
    nav: false,
    dots: false,
    autoWidth: false,
    loop: true,
    responsiveClass: true,
    items: 1,
    // autoplayTimeout: 3000,
    // autoplay: true,
    autoplayHoverPause: true,
    margin: 28,
    center: true,
    responsive: {
        992: {
            items: 2
        },
        600: {
            items: 2
        },
    }
});

// Kontrol Custom Arrow - Tombol Sebelumnya
$('.owl-testimonials-arrow.left').click(function() {
    owlTestimonials.trigger('prev.owl.carousel');
});
$('.owl-testimonials-arrow.right').click(function() {
    owlTestimonials.trigger('next.owl.carousel');
});

// Matter JS
function makeWorld() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        engine = Engine.create(),
        world = engine.world;
    
    const widthBox = $("#card-tools").width()
    const heightBox = 286
    var render = Render.create({
        engine: engine,
        element: document.getElementById("debug"),
        options: {
            width: widthBox,
            height: heightBox,
            wireframes: false, // Disable wireframes
            background: 'transparent', // Set canvas background to transparent
            wireframeBackground: 'transparent' // This will not be used since wireframes are off
        }
    });
    Render.run(render);
    var runner = Runner.create();
    Runner.run(runner, engine);

    // Add walls
    World.add(world, [
        Bodies.rectangle(widthBox / 2, -50, widthBox, 100, { isStatic: true }),
        Bodies.rectangle(widthBox / 2, heightBox + 50, widthBox, 100, { isStatic: true }),
        Bodies.rectangle(-50, heightBox / 2, 100, heightBox, { isStatic: true }),
        Bodies.rectangle(widthBox + 50, heightBox / 2, 100, heightBox, { isStatic: true })
    ]);

    var bodiesDom = document.querySelectorAll('.card');
    var bodies = [];

    bodiesDom.forEach(function(bodyDom) {
        var body = Bodies.rectangle(
            Math.random() * widthBox,
            Math.random() * heightBox,
            bodyDom.offsetWidth,
            bodyDom.offsetHeight,
            {
                restitution: 0.5,
                friction: 0,
                density: 1,
                render: {
                    fillStyle: 'rgba(0, 0, 0, 0)', // Transparent fill
                    // strokeStyle: 'rgba(0, 0, 0, 0)', // Transparent stroke
                    // lineWidth: 0 // No line width
                }
            }
        );

        bodyDom.id = body.id; // Set the id to match the body
        bodies.push(body);
    });

    World.add(world, bodies);

    // Add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.3
            }
        });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Update DOM elements based on physics simulation
    Matter.Events.on(engine, 'afterUpdate', function() {
        bodiesDom.forEach(function(bodyDom) {
            var body = bodies.find(b => b.id == bodyDom.id);
            if (body) {
                bodyDom.style.transform = 'translate(' + (body.position.x - bodyDom.offsetWidth / 2) + 'px, ' + (body.position.y - bodyDom.offsetHeight / 2) + 'px) rotate(' + body.angle + 'rad)';
            }
        });
    });
}

makeWorld();