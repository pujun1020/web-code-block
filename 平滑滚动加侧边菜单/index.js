$(function () {
    function autoRoll() {
        var count = 1; //鼠标灵敏度
        var top = 0;
        var pageNum = $('#pageDiv').children('.page').length;
        console.log(pageNum)
        nav();
        $(document).on("mousewheel DOMMouseScroll", function (e) {
            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
            if (count === 1) {
                if (delta > 0) { // 向上滚
                    console.log(delta);
                    if (top == pageNum || top > -1) {
                        top--;
                        $(".page").removeClass("in");
                        $(".page" + parseInt(top)).css("display", "flex").addClass("in"),
                            setTimeout(function () {
                                $(".page" + (parseInt(top) + 1)).css("display", "flex").addClass("hide")
                            }, 100)
                        setTimeout(function () {
                            $(".page" + (parseInt(top) + 1)).css("display", "none").removeClass("hide");
                        }, 800); //hide的动画时间
                    }
                    if (top == -1) {
                        top = pageNum - 1;
                        $(".page").removeClass("in");
                        $(".page" + parseInt(top)).css("display", "flex").addClass("in"),
                            $(".page" + 0).css("display", "flex").addClass("hide"),
                            setTimeout(function () {
                                $(".page" + 0).css("display", "none").removeClass("hide");
                            }, 750);
                    }
                } else if (delta < 0) { // 向下滚
                    console.log(delta);
                    if (top == 0 || top < pageNum) {
                        top++;
                        $(".page").removeClass("in");
                        $(".page" + parseInt(top)).css("display", "flex").addClass("show").addClass("in"),
                            setTimeout(function () {
                                $(".page" + (parseInt(top) - 1)).css("display", "none")
                            }, 900)
                        setTimeout(function () {
                            $(".page").removeClass("show");
                        }, 1000);
                    }
                    if (top == pageNum) {
                        top = 0;
                        $(".page").removeClass("in");
                        $(".page" + parseInt(top)).css("display", "flex").addClass("show").addClass("in"),
                            setTimeout(function () {
                                $(".page" + (parseInt(pageNum) - 1)).css("display", "none")
                            }, 900)
                        setTimeout(function () {
                            $(".page").removeClass("show");
                        }, 1000);
                    }
                }
                console.log('top', top);
              
                //导航
                $('.nav_list li').eq(top).addClass('active').siblings().removeClass("active");;
                nav();
                setTimeout(function () {
                    //1000ms之后重置count
                    count = 1;
                }, 1000);
            }
            //1000ms内每滚动一次就自增一次
            count++;
        });
        //导航点击
        $(".nav_list li").click(function () {
            console.log('_index_in', top)/* 当前所在页面 */
            var top1 = top;
            var _index = $(this).index();
            $(".nav_list li").eq($(this).index()).addClass('active').siblings().removeClass("active");
            console.log('_index', _index)
       
            if (_index < top) {
                $(".page").removeClass("in");
                $(".page" + parseInt(top)).css("display", "flex"),
                    $(".page" + parseInt(_index)).css("display", "flex").addClass("in"),
                    setTimeout(function () {
                        $(".page" + parseInt(top1)).css("display", "flex").addClass("hide")
                    }, 100)
                setTimeout(function () {
                    $(".page" + parseInt(top1)).css("display", "none").removeClass("hide");
                    $(".page").removeClass("in");
                }, 800); //hide的动画时间
            } else if (_index > top) {
                $(".page").removeClass("in");
                $(".page" + parseInt(top)).css("display", "flex"),
                    $(".page" + parseInt(_index)).css("display", "flex").addClass("show").addClass("in"),
                    setTimeout(function () {
                        $(".page" + parseInt(top1)).css("display", "none")
                    }, 900)
                setTimeout(function () {
                    $(".page").removeClass("show");
                }, 1000);
            };
            top = _index;
            nav();
            console.log('_index_top', top)
            console.log('top1', top1)
        
        });

        function nav() {
            if (top == 0) {
                $(".nav_wrapper").removeClass("show");

                $(".pageDiv")[0].style.setProperty("--w","calc(100%)")
            } else {
                $(".nav_wrapper").addClass("show");
                $(".pageDiv")[0].style.setProperty("--w","calc(100% - 250px)")
              
            }
        }
    
    }
    autoRoll()
});