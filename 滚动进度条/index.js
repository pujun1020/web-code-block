
    /* let windowinnerheight=$(window).innerHeight();
    let windowinnerwidth=$("body").height();
    let scrollh=windowinnerwidth - windowinnerheight;

    $(window).scroll(function () { 
        let windowscrollh=$(this).scrollTop();
        let bfb=(windowscrollh / scrollh).toFixed(2);
        console.log(bfb)
        if (`${bfb*100}%` >= "100%") {
            console.log(22)
        }
    }); */
    console.log(document.documentElement.clientHeight)
    console.log(window.innerHeight)
    window.addEventListener('scroll', function() {
      
        var scrollTop = document.documentElement.scrollTop;
        let docHeight = document.body.scrollHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight) * 100;
        
        let progressWidth = scrollPercent.toFixed(1) + "%";
        console.log(progressWidth)
        document.querySelector('.progressbox').style.width = progressWidth;
        
        });

