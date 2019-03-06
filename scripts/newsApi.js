var apiPath='https://newsapi.org/v2/everything?q=';
var apiQuery='top-headlines';
var pageSize='&pageSize=3';
const apiKey='&apiKey=30d24c47ec594157b6f4ce2f2cbb1588';

// backupKey 1c6b7c4371634281b57f26aa8cd9210e

$(document).ready(function() {
TopNewsRequest();
});

$('.navbar-brand').click(function() {
    location.reload();
})

$("#Entertainment").click(function() {

apiQuery='entertainment';

console.log(apiQuery);

    $(".card").fadeOut(800).promise()
    .then(function() {
        TopNewsRequest();
    });
})

// TOP NEWS WORLDWIDE 

    function TopNewsRequest() {
        
        var url = apiPath + apiQuery + pageSize + apiKey;
       
        $.ajax(
            {
             type: "GET",
             dataType: "json",
             cache: false, 
             url: url,
             success: function(data)
             {
                var newsID = Object.keys(data.articles);

                 console.log(newsID);
                
                 console.dir(data);

                 $('.c-news-card-title').html('World Headlines')
                 
                 for(let n = 0; n < 3; n++)
                 {
                  let storyTitle = data.articles[n].title
                  let storyImage = data.articles[n].urlToImage
                  let storyDescription = data.articles[n].description
                  let storyDate = data.articles[n].publishedAt
                  let storyContent = data.articles[n].content
       
                 $('.card-deck').append(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + storyImage + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + storyTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + storyDescription + "'</p>" +
                    "<p class='card-text-sm' id="+ n +"> See More </p>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + storyDate + "'</small>" +
                    "<div class='c-news-card-modal-hide'> '" + storyContent + "</div>" +
                    "</div>" + 
                    "</div>"
                    ).fadeIn(1000)  
                } 
              
                $('.card-text-sm').click(function() {  

                    var newsItemid = $(this).attr('id');

                    console.log(newsItemid);

                    for(let n = 0; n < 3; n++) {
                        let storyContent = data.articles[n].content
                        if(newsItemid == newsID[n]) {
                            alert("Clicked :" + storyContent)
                        }else{
                        }
                    }
                })
            }
            })
           }

// TECHNOLOGY NEWS 

function TechnologyRequest() {

    var apiPath='https://newsapi.org/v2/everything?q=';
    var apiQuery='technology';
    var pageSize='&pageSize=3';
    const apiKey='&apiKey=30d24c47ec594157b6f4ce2f2cbb1588';

    var Techurl = apiPath + apiQuery + pageSize + apiKey;

    $.ajax(
        {
         type: "GET",
         dataType: "json",
         cache: false, 
         url: Techurl,
         success: function(data)
         {
     
             console.dir(data);

             $('.c-news-card-title').html('Technology Headlines')
             
             for(var t = 0; t < 3; t++)
             {
             var storyTitle = data.articles[t].title
             var storyImage = data.articles[t].urlToImage
             var storyDescription = data.articles[t].description
             var storyDate = data.articles[t].publishedAt

             $('.card-deck').append(
                "<div class='card'>" +
                "<img class='card-img-top' src='" + storyImage + "' alt='Card image cap'> " +
                "<div class='card-body'>" +
                "<h5 class='card-title'>'" + storyTitle + "'</h5>" +
                "<hr/>" +
                "<p class='card-text'>'" + storyDescription + "'</p>" +
                "<p class='card-text-sm'> See More </p>" +
                "</div>" +
                "<div class='card-footer'>" +
                "<small class='text-muted'>Published : '" + storyDate + "'</small>" +
                "</div>" + 
                "</div>"
                ).fadeIn(4000)
            }       
        }
        }
         )
    }

// POLITICS NEWS 

    function PoliticsRequest() {

        var apiPath='https://newsapi.org/v2/everything?q=';
        var apiQuery='politics';
        var pageSize='&pageSize=3';
        const apiKey='&apiKey=30d24c47ec594157b6f4ce2f2cbb1588';
    
        var Techurl = apiPath + apiQuery + pageSize + apiKey;
    
        $.ajax(
            {
             type: "GET",
             dataType: "json",
             cache: false, 
             url: Techurl,
             success: function(data)
             {
         
                 console.dir(data);
                
                 $('.c-news-card-title').html('Political Headlines')
                
                 for(var t = 0; t < 3; t++)
                 {
                 var storyTitle = data.articles[t].title
                 var storyImage = data.articles[t].urlToImage
                 var storyDescription = data.articles[t].description
                 var storyDate = data.articles[t].publishedAt
    
                 $('.card-deck').append(
                    "<div class='card'>" +
                    "<img class='card-img-top' src='" + storyImage + "' alt='Card image cap'> " +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>'" + storyTitle + "'</h5>" +
                    "<hr/>" +
                    "<p class='card-text'>'" + storyDescription + "'</p>" +
                    "<p class='card-text-sm'> See More </p>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + storyDate + "'</small>" +
                    "</div>" + 
                    "</div>"
                    ).fadeIn(4000)
                }       
            }
            }
             )
        }

// CONTENT NEWS AREA SELECTION

$("#Home").click(function() {
    $(".card").fadeOut(800).promise()
    .then(function() {
        TopNewsRequest();
    });
})

$("#Tech").click(function() {
    $(".card").fadeOut(800).promise()
    .then(function() {
        TechnologyRequest();        
    });
})

$("#Politics").click(function() {
    $(".card").fadeOut(800).promise()
    .then(function() {
        PoliticsRequest();
    });
})


// SEARCH FUNCTION 

var search = $(".c-news-searchButton")

/*$(search).click(function() {
    var searchValue = $(".c-news-search").val()
    apiQuery = searchValue;

    var url = apiPath + apiQuery + apiKey;

    $.ajax(
        {
         type: "GET",
         dataType: "json",
         cache: false, 
         url: url,
         success: function(data)
         {

             console.log(url);
             
             for(var n = 0; n < 1; n++)
             {
             var storyTitle = data.articles[n].title
             var storyImage = data.articles[n].urlToImage
             var storyDescription = data.articles[n].description


             $(".c-news").append("<div><p>" + storyTitle + "</p>" + 
             "<p>" + storyDescription + "</p>" +"<img src='" + storyImage +"'></img></div>");
            }
         }
        }
         )

  });
  */