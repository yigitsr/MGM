// go to top button 
var mybutton=document.getElementById("myBtn");

    // When the user scrolls down 150px from the top of the document, show the button
    window.onscroll=function() {
        scrollFunction()
    };

    function scrollFunction() {
        if(document.body.scrollTop>200||document.documentElement.scrollTop>200) {
            mybutton.style.display="block";
        } else {
            mybutton.style.display="none";
        }
    }

    function topFunction() {
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;

        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: "smooth"
        // })

        // window.scrollTo(0,0)

        window.location.href='#'

    }
