var apiPath='https://newsapi.org/v2/everything?q=';
var apiQuery='top-headlines';
var pageSize='&pageSize=3';
const apiKey='&apiKey=30d24c47ec594157b6f4ce2f2cbb1588';


var dataSize=3;

var topic = 'World Headlines'

// backupKey 1c6b7c4371634281b57f26aa8cd9210e

$(document).ready(function() {
    newsRequest();
});


$('.navbar-brand').click(function() {
    location.reload();
})

$('#Search').click(function() {
    var searchValue = $(".c-news-search").val()
    apiQuery = searchValue;

    $(".card").fadeOut(800).promise()
    .then(function() {
        newsRequest();
    });
})

$("#Home").click(function() {

    if(apiQuery === apiQuery) 

    apiQuery='top-headlines';
    topic='World Headlines'
    
    console.log(apiQuery);
    
        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    })

$("#Tech").click(function() {

    apiQuery='technology';
    topic='Technology Headlines'
    //pageSize='&pageSize=2';
    //dataSize=2;
    
    console.log(apiQuery);
    
        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    })

    $("#Politics").click(function() {

        apiQuery='politics';
        topic='Politics Headlines'
        
        console.log(apiQuery);
        
            $(".card").fadeOut(800).promise()
            .then(function() {
                newsRequest();
            });
        })

        $("#Entertainment").click(function() {

            apiQuery='entertainment';
            topic='Entertainment Headlines'
            
            console.log(apiQuery);
            
                $(".card").fadeOut(800).promise()
                .then(function() {
                    newsRequest();
                });
            })

// TOP NEWS WORLDWIDE 

    function newsRequest() {
        
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

                 $('.c-news-card-title').html(topic)
                 
                 for(let n = 0; n < dataSize; n++)
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
                    "<a href='#ex1' rel='modal:open' class='card-text-sm' id="+ n +"> See More </a>" +
                    "</div>" +
                    "<div class='card-footer'>" +
                    "<small class='text-muted'>Published : '" + storyDate + "'</small>" +
                    "<div class='c-news-card-modal-hide'> '" + storyContent + "</div>" +
                    "</div>" + 
                    "</div>"
                    ).fadeIn(2000)  
                } 
              
                $('.card-text-sm').click(function() {  

                    var newsItemid = $(this).attr('id');

                    console.log(newsItemid);

                    for(let n = 0; n < dataSize; n++) {
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