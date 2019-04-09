// * ----------------------- GLOBAL VARIABLES ----------------------- * \\

// API DATA
var apiPath='https://newsapi.org/v2/';
var category='everything?q='
var apiQuery='everything';
var country = '';
var pageSize='&pageSize=3';
const apiKey='&apiKey=30d24c47ec594157b6f4ce2f2cbb1588';
var dataSize=3;
var topic = 'World Headlines'

// SVG For Offline
var offlineSVG = "offlineImage.svg"



// backupKey 1c6b7c4371634281b57f26aa8cd9210e  



$(document).ready(function() {

    
    if(navigator.onLine) { // true|false
    
        newsRequest();
   
    }

    else 
    
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

});


// * ----------------------- VIEW MORE HEADLINES ----------------------- * \\

$('.c-news-moreHeadlines').click(function() {

    $(function(){
    dataSize = 6;
    pageSize = '&pageSize=6';
    }).promise()

    .then(function() {
    $('.card').fadeOut(500);
    setTimeout(newsRequest, 500);
});
})

// * ----------------------- RETURN TO HOME ----------------------- * \\

$('.navbar-brand').click(function() {
    location.reload();
})

// * ----------------------- SEARCH ----------------------- * \\

$('#Search').click(function() {
    event.preventDefault();

    if(navigator.onLine) {
    var searchValue = $(".c-news-search").val()
    apiQuery = searchValue;
    topic = searchValue + " " + 'Headlines'
    category='everything?q='
    dataSize = 3;
    pageSize = '&pageSize=3';
    country = '';

    $(".c-news-card-dropdown").hide();

    if(searchValue != "") {
    $(".card").fadeOut(800).promise()
    .then(function() {
        newsRequest();
    });
}   
}

else {

    let WorldHeadlines = JSON.parse(localStorage.getItem('worldHeadlines'));
    let Politics = JSON.parse(localStorage.getItem('politics'));
    let Entertainment = JSON.parse(localStorage.getItem('entertainment'));
    let Technology = JSON.parse(localStorage.getItem('technology'));
    let USA = JSON.parse(localStorage.getItem('popular_usa'));
    let UK = JSON.parse(localStorage.getItem('popular_uk'));
    let IE = JSON.parse(localStorage.getItem('popular_ie'));

    //console.log(IE.data.articles)


    let WorldHeadlineArticles = WorldHeadlines.data.articles
    let PoliticsArticles = Politics.data.articles


    //let localStorageArray = {...WorldHeadlines.data.articles, ...Politics.data.articles, ...Entertainment.data.articles, ...Technology.data.articles, ...USA.data.articles, ...UK.data.articles, ...IE.data.articles}
    //console.log(localStorageArray);


    let array = Object.assign({}, WorldHeadlines, Politics);
    console.log(array);


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
    
    console.log(apiQuery);
    
    $(".c-news-card-dropdown").hide();

        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    }


else {

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

else  {

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

        switch (country) { 

            case "country=us":
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
        break;
    
            case "country=gb":
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
            break;

            case "country=ie":
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
            break;
        }

    })

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
    
    console.log(apiQuery);

    $(".c-news-card-dropdown").hide();

    
        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    }

    else {

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
        
        console.log(apiQuery);

        $(".c-news-card-dropdown").hide();


            $(".card").fadeOut(800).promise()
            .then(function() {
                newsRequest();
            });
        }

        else {
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
            
            console.log(apiQuery);

            $(".c-news-card-dropdown").hide();

            
                $(".card").fadeOut(800).promise()
                .then(function() {
                    newsRequest();
                });
            }
        else {
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
    })

// * ----------------------- NEWS AJAX REQUEST ----------------------- * \\

    function newsRequest() {
        
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

                if (localStorage.getItem('worldHeadlines') != data.articles) {
                
                localStorage.setItem('worldHeadlines', JSON.stringify({
                    data
                }))}

            // Store Technology for Offline if Visited and new Data

                if (localStorage.getItem('technology') != data.articles && apiQuery == 'technology') {
                
                    localStorage.setItem('technology', JSON.stringify({
                        data
                    }))
                console.log('technology');
                }

            // Store Politics for Offline if Visited and new Data

                if (localStorage.getItem('politics') != data.articles && apiQuery == 'politics') {
                
                    localStorage.setItem('politics', JSON.stringify({
                        data
                    }))
                console.log('politics');
                }

            // Store Entertainment for Offline if Visited and new Data

                if (localStorage.getItem('entertainment') != data.articles && apiQuery == 'entertainment') {
                
                    localStorage.setItem('entertainment', JSON.stringify({
                        data
                    }))
                console.log('entertainment');
                }

            // Store Most Popular for Offline if Visited and new Data (USA, UK, IRL)

            // USA

                if (localStorage.getItem('popular_usa') != data.articles && country == 'country=us') {
                
                    localStorage.setItem('popular_usa', JSON.stringify({
                        data
                    }))
                console.log('popular_usa');
                }

            // UK

                if (localStorage.getItem('popular_uk') != data.articles && country == 'country=gb') {
                
                    localStorage.setItem('popular_uk', JSON.stringify({
                        data
                    }))
                console.log('popular_uk');
                }

            // IE

                if (localStorage.getItem('popular_ie') != data.articles && country == 'country=ie') {
                
                    localStorage.setItem('popular_ie', JSON.stringify({
                        data
                    }))
                console.log('popular_ie');
                }



                 try {
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
            }
            })
           }

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
