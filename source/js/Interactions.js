import $ from 'jquery';

import Functions from './components/Functions';

$(function() {
    $(function () {
        $(".preloader").fadeOut();
        //w
    });


    $(".sidebartoggler").on('click', function () {
        $("body").toggleClass("mini-sidebar");
    });

    let set = function set() {
        let width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
        let topOffset = 75;
        if ($('aside.left-sidebar')[0]) {
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
            } else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }
        }
        let height = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $(".page-wrapper").css("min-height", height + "px");
        }

    };
    $(window).ready(set);
    $(window).on("resize", set);

    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").on('click', function () {
        $("body").toggleClass("show-sidebar");

        $(".nav-toggler i").toggleClass("ti-menu");
    });
    $(".nav-lock").on('click', function () {
        $("body").toggleClass("lock-nav");
        $(".nav-lock i").toggleClass("mdi-toggle-switch-off");
        $("body, .page-wrapper").trigger("resize");
    });

    $(document).on('click', 'a[href^="#"]', function(evt) {
        evt.preventDefault();
        console.log(`${$(document).innerWidth()}`);
        if ($(document).innerWidth() <= 425) {
            window.location = $(this).attr("data-url");
        } else {
            Functions.load({
                url: $(this).attr("data-url"),
                method: "GET"
            }).then(data => {
                console.log(data);
            })
        }
    });
});