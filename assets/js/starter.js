$(document).ready(function () {
    var itemsMainDiv = ('.multiCarousel');
    var itemsDiv = ('.multiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });


    var rightArrow = $('.rightLst');
    var playCarousel = setInterval(function () {		
        $(rightArrow).each(function () {
            click(1, this);
        });
	}, 3000);


    $('.multiCarousel').mouseover(function(){
        clearInterval(playCarousel);
    }).mouseout(function(){
        playCarousel = setInterval(function () {		
        $(rightArrow).each(function () {
            click(1, this);
        });
	}, 3000);
    });


     ResCarouselSize();


    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width() - 100;
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "multiCarousel" + id);

            if (bodyWidth >= 1920) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno + 100;
            }
            else if (bodyWidth >= 900) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno + 160;
            }
            else if (bodyWidth >= 600) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno + 100;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }

            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");


        });
    }

    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

    //gsap animations

    gsap.fromTo("#connectHeadingImage", {x: 1000}, {x: 0, duration: 1});
    gsap.fromTo("#connectImage", {y: 500}, {y: 0, duration: 0.75, delay: 0.05});
    gsap.fromTo("#connectHeading", {y: 100, opacity: 0}, {y: 0, duration: 0.75, opacity: 1, delay: 0.2});
    gsap.fromTo("#connectText", {y: 100, opacity: 0}, {y: 0, duration: 0.75, opacity: 1, delay: 0.5});

    gsap.fromTo("#findMembers", {y: 500}, {y: 0, duration: 1, delay: 0});

    $("#findMembers").on('click', function() {
        gsap.to(window, {duration: 1, scrollTo:"#members"});
    });

    const subHeadings = gsap.utils.toArray('.sub-heading');
	subHeadings.forEach(subHeading => {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: subHeading,
				start: 'top bottom',
			}
		});

		tl.fromTo(subHeading, {
            y: 75
			}, {
            duration: 0.75,
            y: 0
		});
	});

    gsap.fromTo("#learnHeadingImage",
    {x: -2000, immediateRender: false, }, 
    {
        x: 0, 
        scrollTrigger: {
            trigger: ".section__learn",
            start: "top 70%",
        },
        duration: 1.5,
        delay: 0
    });

    gsap.fromTo("#learnImage", 
        {y: 500, immediateRender: false, }, 
        {
        y: 0,
        scrollTrigger: {
            trigger: ".section__learn",
            start: "top 50%",
        },          
        duration: 1,    
        delay: 1 
    });

    gsap.fromTo("#learnHeading", {y: 100, immediateRender: false, opacity: 0}, {y: 0, duration: 0.75, opacity: 1, delay: 1.5,
            scrollTrigger: {
            trigger: '.section__learn',
            start: "top 50%",
            toggleActions: 'play none play none'
        }
    });
    gsap.fromTo("#learnText", {y: 100, immediateRender: false, opacity: 0}, {y: 0, duration: 0.75, opacity: 1, delay: 1.75,
            scrollTrigger: {
            trigger: '.section__learn',
            start: "top 50%",
            toggleActions: 'play none play none'
        }
     });

    gsap.fromTo("#findResources", {y: 500, immediateRender: false}, {y: 0, scrollTrigger: {
        trigger: '.section__learn',
        start: "top 30%",
        },duration: 1, delay: 1.5});

     $("#findResources").on('click', function() {
        gsap.to(window, {duration: 1, scrollTo:"#resources"});
    });

});