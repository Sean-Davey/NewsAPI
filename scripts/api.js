// * ----------------------- GLOBAL VARIABLES ----------------------- * \\


// API KEY DATA DE-STRUCTURED
var apiPath='https://newsapi.org/v2/';
var category='everything?q='
var apiQuery='everything';
var country = '';
var pageSize='&pageSize=3';
var dataSize=3;
var topic = 'World Headlines';
var searchValue = '';

// SVG For Offline Functionality, replacing cached photo's as the API only provides photo URL's
var offlineSVG = "offlineImage.svg"




$(document).ready(function() {

    
    if(navigator.onLine) { // true
    
        newsRequest();
   
    }

    else if (localStorage.getItem('worldHeadlines') != undefined)
    
    {

        var WorldHeadlines = JSON.parse(localStorage.getItem('worldHeadlines'));

        console.dir(WorldHeadlines)

        for(let n = 0; n < dataSize; n++) {
            let offlineTitle = WorldHeadlines.data.articles[n].title
            let offlineImage = WorldHeadlines.data.articles[n].urlToImage
            let offlineDescription = WorldHeadlines.data.articles[n].description
            let offlineDate = WorldHeadlines.data.articles[n].publishedAt

            console.log(offlineTitle)

            $('.card-deck').append($(
                "<div class='card'>" +
                "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                "<div class='card-body'>" +
                "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                "<hr/>" +
                "<p class='card-text'>'" + offlineDescription + "'</p>" +
                "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                "</div>" +
                "<div class='card-footer'>" +
                "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                "</div>"
                )).hide().fadeIn(500) 

        }}

// If no news has been stored for worldHeadlines show the following error UI 

    else {
        $('.c-news-card-title').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
        $('.error-text').delay(1000).fadeOut(500)
    }

});



// * ----------------------- SEARCH TOOLTIP HEADLINES ----------------------- * \\

$('#searchInput').focusin(function() {

    if (localStorage.getItem("return_user")) { // If the "return_user" object exists indicating the user has visited before and has searched
    $(".tool-tip").hide(); // Hide the how-to-search tool-tip
    } else { // Otherwise show them a tool-tip on how to search 
        $('.c-news-card-tool-tip').html('<div class="tool-tip"> <p> Enter a Topic, Place or Person to get the most up-to-date news!  </p> </div>')
    };
    $("#Search").click(function(){
    $(".tool-tip").slideUp(800); 
    accept(); // Function ran onclick of the "Search" button, recording in localStorage that the user has successfully searched
})
})

$('#searchInput').focusout(function() { // If the user decides not to search remove the UI explaining how to do it
    $(".tool-tip").hide(); // Hide the tool-tip 
})



// * ----------------------- CONFIRM USER KNOWS HOW TO SEARCH  ----------------------- * \\


function accept() {
    if (typeof(Storage) !== "undefined") {              // If localStorage is enabled
        var localStorage = window.localStorage;         // Create a variable named localStorage
        if (localStorage.getItem("return_user")) {      // If the object of localStorage shows the user is a return user 
          console.log("Return User")                    // console log out "Return User"
        } else {                                        // If the user is not a return user 
            console.log("New User")                     // Console log "New User"
            localStorage.setItem("return_user", true);  // And set boolean to true
            console.log(localStorage);
        }
        } else { 
            alert("Local storage is not enabled or supported"); 
        }
    }


// * ----------------------- VIEW MORE HEADLINES ----------------------- * \\

$('.c-news-moreHeadlines').click(function() {

    $(function(){
    dataSize = 6;
    pageSize = '&pageSize=6';
    }).promise() // Increase pageSize from 3 to 6, promise used to prevent UI visual 'glitches' loading in and out

    .then(function() {
    $('.card').fadeOut(500);
    setTimeout(newsRequest, 500);
});
})

// * ----------------------- RETURN TO HOME ----------------------- * \\

$('.navbar-brand').click(function() { // UX convention, hit the home button refresh to home
    location.reload();
})

// * ----------------------- SEARCH ----------------------- * \\

$('#Search').click(function() {

    event.preventDefault();

    if(navigator.onLine) {
    searchValue = $(".c-news-search").val()
    apiQuery = searchValue;
    topic = searchValue + " " + 'Headlines'
    category='everything?q='
    dataSize = 3;
    pageSize = '&pageSize=3';
    country = '';

    $(".c-news-card-dropdown").hide(); // hide cards before showing back with updated news

    if(searchValue != "") {
    $(".card").fadeOut(800).promise()
    .then(function() {
        newsRequest(); // invoke AJAX function with updated global variables 
    });
}   
}

else { // offline functionality for search 
    let searchOffline = JSON.parse(localStorage.getItem('search'));
    var searchQuery = JSON.parse(localStorage.getItem('searchQuery'));

    searchValue = $(".c-news-search").val()
    $(".c-news-card-dropdown").hide();

// If the term / phrase the user is searching for matches an item in local storage

    if(searchValue === searchQuery.searchValue) {

        $('.c-news-card-title').html(searchValue)

// Append the localstorage news items to the screen

    for(let n = 0; n < dataSize; n++) {
        let offlineTitle = searchOffline.data.articles[n].title
        let offlineImage = searchOffline.data.articles[n].urlToImage
        let offlineDescription = searchOffline.data.articles[n].description
        let offlineDate = searchOffline.data.articles[n].publishedAt

        console.log(offlineTitle)

        $(".card").fadeOut(800).promise()
        .then(function() {

        $('.card-deck').append($(
            "<div class='card'>" +
            "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
            "<div class='card-body'>" +
            "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
            "<hr/>" +
            "<p class='card-text'>'" + offlineDescription + "'</p>" +
            "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
            "</div>" +
            "<div class='card-footer'>" +
            "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
            "</div>"
            )).hide().fadeIn(500) 
        });
}
    }

    else { // If no localStorage exists show the error UI
        $('.c-news-card').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
        $('.error-text').delay(1000).fadeOut(500)
    }
}

})

// * ----------------------- HOME  ----------------------- * \\

$("#Home").click(function() {

    if(navigator.onLine) { // true

    category='everything?q='
    country=''
    apiQuery='everything';
    topic='World Headlines'
    pageSize='&pageSize=3';
    dataSize=3;
    searchValue = '';

    console.log(apiQuery);
    
    $(".c-news-card-dropdown").hide();

        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    }


else if (localStorage.worldHeadlines != null){

    topic='World Headlines'

    $('.c-news-card-title').html(topic)

    var WorldHeadlines = JSON.parse(localStorage.getItem('worldHeadlines'));

    console.dir(WorldHeadlines)

    $(".c-news-card-dropdown").hide();

    for(let n = 0; n < dataSize; n++) {
        let offlineTitle = WorldHeadlines.data.articles[n].title
        let offlineImage = WorldHeadlines.data.articles[n].urlToImage
        let offlineDescription = WorldHeadlines.data.articles[n].description
        let offlineDate = WorldHeadlines.data.articles[n].publishedAt

        console.log(offlineTitle)

        $(".card").fadeOut(800).promise()
        .then(function() {

        $('.card-deck').append($(
            "<div class='card'>" +
            "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
            "<div class='card-body'>" +
            "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
            "<hr/>" +
            "<p class='card-text'>'" + offlineDescription + "'</p>" +
            "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
            "</div>" +
            "<div class='card-footer'>" +
            "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
            "</div>"
            )).hide().fadeIn(500) 
        });
}
}

else {
    $('.c-news-card-title').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
    $('.error-text').delay(1000).fadeOut(500)
}
})

// * ----------------------- POPULAR ----------------------- * \\

$('#Popular').click(function() {

    if(navigator.onLine) { // true

    category=''
    apiQuery='top-headlines?';
    topic='Most Popular - United States'
    pageSize='&pageSize=3';
    country='country=us'
    dataSize=3;
    searchValue = '';

    console.log(apiQuery);

    $(".c-news-card-dropdown").html($(
        "<div class='c-news-card-dropdown-selects'>" +
        "<select class='c-news-card-dropdown-selects-value'>" +
        "<option value='country=us'>United States</option>" +
        "<option value='country=gb'>United Kingdom</option>" +
        "<option value='country=ie'>Ireland</option>" +
      "</select>" +
      "</div>" 
    )).fadeIn(2000);

    $(".card").fadeOut(800).promise()
    .then(function() {
        newsRequest();
    });

// POPULAR COUNTRY SELECTION

    $(".c-news-card-dropdown-selects-value").on('change', function() {
     var selectedVal = $(".c-news-card-dropdown-selects-value").find(":selected").val();
     var selectedText = $(".c-news-card-dropdown-selects-value").find(":selected").text();

        console.log(selectedVal, selectedText);
        category=''
        apiQuery='top-headlines?';
        topic="Most Popular - " + selectedText + " "
        pageSize='&pageSize=3';
        country=selectedVal
        dataSize=3;

        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    })
}

else if (localStorage.popular_usa != undefined)  {

    $(".c-news-card-dropdown").html($(
        "<div class='c-news-card-dropdown-selects'>" +
        "<select class='c-news-card-dropdown-selects-value'>" +
        "<option value='country=us'>United States</option>" +
        "<option value='country=gb'>United Kingdom</option>" +
        "<option value='country=ie'>Ireland</option>" +
      "</select>" +
      "</div>" 
    )).fadeIn(2000);

    topic='Most Popular - United States'

            $('.c-news-card-title').html(topic)
    
            var popular_usa = JSON.parse(localStorage.getItem('popular_usa'));
    
            console.dir(popular_usa)
            
            for(let n = 0; n < dataSize; n++) {
                let offlineTitle = popular_usa.data.articles[n].title
                let offlineImage = popular_usa.data.articles[n].urlToImage
                let offlineDescription = popular_usa.data.articles[n].description
                let offlineDate = popular_usa.data.articles[n].publishedAt
        
                console.log(offlineTitle)
        
                $(".card").fadeOut(800).promise()
                .then(function() {
        
                $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + offlineDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500) 
                });
        }


    $(".c-news-card-dropdown-selects-value").on('change', function() {
        var selectedVal = $(".c-news-card-dropdown-selects-value").find(":selected").val();
        country=selectedVal

        console.log(country);

        switch (country) { // Switch statement for Country which is derived from the global variable selection

            case "country=us": // if country variable matches the case value loop through and append the following
            topic='Most Popular - United States'

            $('.c-news-card-title').html(topic)
    
            var popular_usa = JSON.parse(localStorage.getItem('popular_usa'));
    
            console.dir(popular_usa)
            
            for(let n = 0; n < dataSize; n++) {
                let offlineTitle = popular_usa.data.articles[n].title
                let offlineImage = popular_usa.data.articles[n].urlToImage
                let offlineDescription = popular_usa.data.articles[n].description
                let offlineDate = popular_usa.data.articles[n].publishedAt
        
                console.log(offlineTitle)
        
                $(".card").fadeOut(800).promise()
                .then(function() {
        
                $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + offlineDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500) 
                });
        }
        break; // if matched break the statement (do not carry out any cases)
    
            case "country=gb": // if country var matches the case 
            if(localStorage.popular_uk != null) {
            topic='Most Popular - United Kingdom'

            $('.c-news-card-title').html(topic)
    
            var popular_uk = JSON.parse(localStorage.getItem('popular_uk'));
    
            console.dir(popular_uk)
            
            for(let n = 0; n < dataSize; n++) {
                let offlineTitle = popular_uk.data.articles[n].title
                let offlineImage = popular_uk.data.articles[n].urlToImage
                let offlineDescription = popular_uk.data.articles[n].description
                let offlineDate = popular_uk.data.articles[n].publishedAt
        
                console.log(offlineTitle)
        
                $(".card").fadeOut(800).promise()
                .then(function() {
        
                $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + offlineDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500) 
                });
        }
    }
            break;

            case "country=ie": // if country var matches the case 
            if(localStorage.popular_ie != null) {
            topic='Most Popular - Ireland'

            $('.c-news-card-title').html(topic)
    
            var popular_ie = JSON.parse(localStorage.getItem('popular_ie'));
    
            console.dir(popular_ie)
            
            for(let n = 0; n < dataSize; n++) {
                let offlineTitle = popular_ie.data.articles[n].title
                let offlineImage = popular_ie.data.articles[n].urlToImage
                let offlineDescription = popular_ie.data.articles[n].description
                let offlineDate = popular_ie.data.articles[n].publishedAt
        
                console.log(offlineTitle)
        
                $(".card").fadeOut(800).promise()
                .then(function() {
        
                $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + offlineDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500) 
                });
        }
    }
            break;
        }

    })

}

else {
    $('.c-news-card-title').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
    $('.error-text').delay(1000).fadeOut(500)
}

})

// * ----------------------- TECHNOLOGY ----------------------- * \\

$("#Tech").click(function() {


    if(navigator.onLine) { // true

    country=''
    category='everything?q='
    apiQuery='technology';
    topic='Technology Headlines'
    pageSize='&pageSize=3';
    dataSize=3;
    searchValue = '';
    
    console.log(apiQuery);

    $(".c-news-card-dropdown").hide();

    
        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    }

    else if (localStorage.technology != null ){

        topic='Technology Headlines'

        $('.c-news-card-title').html(topic)

        var Technology = JSON.parse(localStorage.getItem('technology'));

        console.dir(Technology)

        $(".c-news-card-dropdown").hide();

        for(let n = 0; n < dataSize; n++) {
            let offlineTitle = Technology.data.articles[n].title
            let offlineImage = Technology.data.articles[n].urlToImage
            let offlineDescription = Technology.data.articles[n].description
            let offlineDate = Technology.data.articles[n].publishedAt

            console.log(offlineTitle)

            $(".card").fadeOut(800).promise()
            .then(function() {

            $('.card-deck').append($(
                "<div class='card'>" +
                "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                "<div class='card-body'>" +
                "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                "<hr/>" +
                "<p class='card-text'>'" + offlineDescription + "'</p>" +
                "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                "</div>" +
                "<div class='card-footer'>" +
                "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                "</div>"
                )).hide().fadeIn(500) 
            });
    }
    }

    else {
        $('.c-news-card-title').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
        $('.error-text').delay(1000).fadeOut(500)
    }

})
    

// * ----------------------- POLITICS ----------------------- * \\

    $("#Politics").click(function() {

        if(navigator.onLine) { // true

        country=''
        category='everything?q='
        apiQuery='politics';
        topic='Politics Headlines'
        pageSize='&pageSize=3';
        dataSize=3;
        searchValue = '';
        
        console.log(apiQuery);

        $(".c-news-card-dropdown").hide();


            $(".card").fadeOut(800).promise()
            .then(function() {
                newsRequest();
            });
        }

        else if (localStorage.politics != null) {
            topic='Politics Headlines'

            $('.c-news-card-title').html(topic)
    
            var Politics = JSON.parse(localStorage.getItem('politics'));
    
            console.dir(Politics)

            $(".c-news-card-dropdown").hide();
    
            for(let n = 0; n < dataSize; n++) {
                let offlineTitle = Politics.data.articles[n].title
                let offlineImage = Politics.data.articles[n].urlToImage
                let offlineDescription = Politics.data.articles[n].description
                let offlineDate = Politics.data.articles[n].publishedAt
    
                console.log(offlineTitle)
    
                $(".card").fadeOut(800).promise()
                .then(function() {
    
                $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + offlineDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500) 
                });
        }
        }

        else {
            $('.c-news-card-title').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
            $('.error-text').delay(1000).fadeOut(500)
        }

    }) 
    
        

// * ----------------------- ENTERTAINMENT ----------------------- * \\

        $("#Entertainment").click(function() {

            if(navigator.onLine) { // true

            country=''
            category='everything?q='
            apiQuery='entertainment';
            topic='Entertainment Headlines'
            pageSize='&pageSize=3';
            dataSize=3;
            searchValue = '';
            
            console.log(apiQuery);

            $(".c-news-card-dropdown").hide();

            
                $(".card").fadeOut(800).promise()
                .then(function() {
                    newsRequest();
                });
            }
        else if (localStorage.technology != null) {
            topic='Entertainment Headlines'

            $('.c-news-card-title').html(topic)
    
            var Entertainment = JSON.parse(localStorage.getItem('entertainment'));
    
            console.dir(Entertainment)

            $(".c-news-card-dropdown").hide();
    
            for(let n = 0; n < dataSize; n++) {
                let offlineTitle = Entertainment.data.articles[n].title
                let offlineImage = Entertainment.data.articles[n].urlToImage
                let offlineDescription = Entertainment.data.articles[n].description
                let offlineDate = Entertainment.data.articles[n].publishedAt
    
                console.log(offlineTitle)
    
                $(".card").fadeOut(800).promise()
                .then(function() {
    
                $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + offlineSVG + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + offlineTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + offlineDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + offlineDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500) 
                });
        }
        }

        else {
            $('.c-news-card-title').prepend('<h1 class="error-text"> No offline news data is available for this topic </h1>')
            $('.error-text').delay(1000).fadeOut(500)
        }

    })

// * ----------------------- NEWS AJAX REQUEST ----------------------- * \\

    function newsRequest() {
        
        // Combining the Global Variables of the API key 
        var url = apiPath + category + apiQuery + country + pageSize + apiKey;
        console.log(url)

        $.ajax(
            {
             type: "GET",
             dataType: "json",
             cache: true, 
             url: url,
             success: function(data)
             {
                var newsID = Object.keys(data.articles);

                
                 console.dir(data);

                $('.c-news-card-title').html(topic)

            // Store WorldHeadlines for Offline if Visited and new Data
            // 'Visited' status is determined by the current value of the global variables before the AJAX function is called

                if (localStorage.getItem('worldHeadlines') != data.articles) {
                
                localStorage.setItem('worldHeadlines', JSON.stringify({
                    data
                }))}

            // Store Technology for Offline if Visited and new Data

                if (localStorage.getItem('technology') != data.articles && apiQuery == 'technology') {
                
                    localStorage.setItem('technology', JSON.stringify({
                        data
                    }))
                }

            // Store Politics for Offline if Visited and new Data

                if (localStorage.getItem('politics') != data.articles && apiQuery == 'politics') {
                
                    localStorage.setItem('politics', JSON.stringify({
                        data
                    }))
                }

            // Store Entertainment for Offline if Visited and new Data

                if (localStorage.getItem('entertainment') != data.articles && apiQuery == 'entertainment') {
                
                    localStorage.setItem('entertainment', JSON.stringify({
                        data
                    }))
                }

            // Store Most Popular for Offline if Visited and new Data (USA, UK, IRL)

            // USA

                if (localStorage.getItem('popular_usa') != data.articles && country == 'country=us') {
                
                    localStorage.setItem('popular_usa', JSON.stringify({
                        data
                    }))
                }

            // UK

                if (localStorage.getItem('popular_uk') != data.articles && country == 'country=gb') {
                
                    localStorage.setItem('popular_uk', JSON.stringify({
                        data
                    }))
                }

            // IE

                if (localStorage.getItem('popular_ie') != data.articles && country == 'country=ie') {
                
                    localStorage.setItem('popular_ie', JSON.stringify({
                        data
                    }))
                }


            // Search

            if (localStorage.getItem('search') != data.articles && searchValue != '') {
                
                localStorage.setItem('search', JSON.stringify({
                    data
                }))

                localStorage.setItem('searchQuery', JSON.stringify({
                    searchValue
                }))
            }

                 try { // try and catch as an additional method to prevent errors with the api data not being recieved
                 for(let n = 0; n < dataSize; n++)
                 {
                  let storyTitle = data.articles[n].title
                  let storyImage = data.articles[n].urlToImage
                  let storyDescription = data.articles[n].description
                  let storyDate = data.articles[n].publishedAt
       
                 $('.card-deck').append($(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + storyImage + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + storyTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + storyDescription + "'</p>" +
                    "<a data-toggle='modal' data-target='#exampleModal' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + storyDate + "'</small>" +
                    "</div>"
                    )).hide().fadeIn(500)  
                } 

                $('.c-news-moreHeadlines').html(
                    "<button class='c-news-seemore-button btn-outline-dark btn' id='more' type='submit'> More Headlines </button>"
                );
              
                $('.card-text-sm').click(function() {  

                    var newsItemid = $(this).attr('id');

                    console.log(newsItemid);

                    for(let n = 0; n < dataSize; n++) {
                        let chosenStoryContent = data.articles[n].content
                        let chosenStoryDescription = data.articles[n].description
                        let chosenStoryTitle = data.articles[n].title
                        if(newsItemid == newsID[n]) {
                            
                            $('.modal-body, .modal-title').empty().promise()
                            
                            .then(function() {$('.modal-body').append('<p>' + chosenStoryContent + '</p>')
                            $('.modal-title').append(chosenStoryTitle)
                        }
                      )}
                    }
                })
                $('.c-news-moreHeadlines, .c-news-card-title').show(0);

                if (pageSize != '&pageSize=3') {
                    $('.c-news-moreHeadlines').hide()
                }
                else {
                    $('.c-news-moreHeadlines').show()
                }
            }

            catch(err) {
                $('.c-news-moreHeadlines, .c-news-card-title').hide(0);

                $('.c-news-card').append("<h2 class='error-text'> No results for this news could be found </h2>").hide().fadeIn(200);
                $('.c-news-card').append(
                    svg
                )
                setTimeout(function(){
                    $('.error-text, .error-text-svg').fadeOut(200).remove();
                  }, 4000);
            }
            },
            fail: function() {
                alert('Error locating News Stories, please try again later')
            }
            })
           }

    // Error Inline SVG to be used if a term or phrase the user searches for returns no stories 

           var svg = '<div class="error-text-svg">' +
           '<svg width="400" height="400" viewBox="0 0 250 250">' +
           '<g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
               '<circle id="Oval" fill="#F46363" fill-rule="nonzero" cx="125" cy="125" r="120"></circle>' +
               '<rect id="Rectangle" fill="#FFFFFF" fill-rule="nonzero" x="59" y="29" width="132" height="191"></rect>' +
               '<g id="Story" transform="translate(70.000000, 54.000000)" fill="#D8D8D8" fill-rule="nonzero">' +
                   '<rect id="Rectangle-2" x="0" y="0" width="110" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="9.06976744" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="18.1395349" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="26.3023256" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="34.4651163" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-3" x="0" y="9.06976744" width="37.2727273" height="29.9302326"></rect>' +
               '</g>' +
               '<g id="Story" transform="translate(125.000000, 135.500000) rotate(-180.000000) translate(-125.000000, -135.500000) translate(70.000000, 116.000000)" fill="#D8D8D8" fill-rule="nonzero">' +
                   '<rect id="Rectangle-2" x="0" y="0" width="110" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="9.06976744" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="18.1395349" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="26.3023256" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-2" x="41.8181818" y="34.4651163" width="68.1818182" height="4.53488372"></rect>' +
                   '<rect id="Rectangle-3" x="0" y="9.06976744" width="37.2727273" height="29.9302326"></rect>' +
               '</g>' +
               '<g id="Story" transform="translate(125.815193, 179.479779) rotate(-180.000000) translate(-125.815193, -179.479779) translate(71.000000, 160.000000)" fill="#D8D8D8" fill-rule="nonzero">' +
                   '<rect id="Rectangle-2" x="0" y="0" width="109.630387" height="4.53018126"></rect>' +
                   '<rect id="Rectangle-2" x="0" y="9.06036253" width="109.630387" height="4.53018126"></rect>' +
                   '<rect id="Rectangle-2" x="0" y="18.1207251" width="109.630387" height="4.53018126"></rect>' +
                   '<rect id="Rectangle-2" x="0" y="26.2750513" width="109.630387" height="4.53018126"></rect>' +
                   '<rect id="Rectangle-2" x="0" y="34.4293776" width="109.630387" height="4.53018126"></rect>' +
               '</g>' +
               '<text id="NEWS-GONE-MISSING!" font-family="LucidaGrande-Bold, Lucida Grande" font-size="12" font-weight="bold" letter-spacing="-1.10000002" fill="#6C749B">' +
                   '<tspan x="69" y="48">NEWS GONE MISSING!</tspan>' +
               '</text>' +
               '<text id="LOCAL-WEB-DEVELOPER" font-family="LucidaGrande-Bold, Lucida Grande" font-size="9" font-weight="bold" letter-spacing="-1.10000002" fill="#6C749B">' +
                   '<tspan x="63" y="109">LOCAL WEB DEVELOPER BLAMED!</tspan>' +
               '</text>' +
           '</g>' +
           '</svg>' +
           '</div>'
