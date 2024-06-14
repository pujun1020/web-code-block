$(".team-more-text").on("click", function (e) {
    e.preventDefault();
    let hrights = 98;
    if (hrights >= $(this).prev().children("ul").height() ) {
        //获取$(this).prev()的指定的直接子元素ul
        $(this).prev().children("ul").height('auto')
        let h = $(this).prev().children("ul").height();
        $(this).prev().children("ul").height("98px")
        $(this).prev().children("ul")[0].offsetHeight;/* 不用这句也可以，但是保险起见加上这个 */
        $(this).prev().children("ul").height(`${h}px`);
    }else{
        $(this).prev().children("ul").height("98px");
    }

});
