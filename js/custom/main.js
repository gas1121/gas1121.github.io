/// <reference path="../../../../../typings/main.d.ts" />

//TODO fix d.ts file include path
//TODO make code pretty
//TODO follow es2015 coding pattern
//TODO add test and comment
//TODO use promise to replace callback

//spa mode problem

//music player problem
//TODO music player size and position

//Register and start router
page('/(.*)', ReplaceHtmlData);
page({
    dispatch:false
});

function ReplaceHtmlData(context) {
    Vue.http.get(context.path).then(function (response) {
        let receivedHTML = $('<div/>').append(response.data);
        //change title
        document.title = receivedHTML.find('title')[0].textContent
        //change sidebar
        $('.sidebar-inner').replaceWith(receivedHTML.find('.sidebar-inner'));
        //change content
        $('#content').fadeOut("slow", function() {
            $(this).replaceWith(receivedHTML.find('#content'));
            $('#content').fadeIn("slow", function() {
                let pageType = "normal";
                if (receivedHTML.find('.page-post-detail').length>0) {
                    pageType = "postDetail";
                }
                else if (receivedHTML.find('.page-archive').length>0) {
                    pageType = "archives"
                }
                Reboot(pageType);
            });
        })
    }, function (response) {
        // error callback
    });
}

function Reboot(pageType) {
    //viaibale to identify spa mode
    CONFIG.in_ajax = true;

    motion();
    //from pisces.js
    pisces();
    if (pageType === "archives") {
        //from archive.swig
        $('.archive-year').velocity('transition.slideLeftIn');   
    }
    if (pageType === "postDetail") {
        //from post-details.js
        sidebarTocHighlight();
        sidebarNav();
    }
    
    //from bootstrap.js
    bootstrap();
}