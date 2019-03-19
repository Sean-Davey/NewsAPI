// * ----------------------- GLOBAL VARIABLES ----------------------- * \\

var apiPath='https://newsapi.org/v2/everything?q=';
var apiQuery='top-headlines';
var pageSize='&pageSize=3';
const apiKey='&apiKey=1c6b7c4371634281b57f26aa8cd9210e';
var dataSize=3;
var topic = 'World Headlines'

// backupKey 30d24c47ec594157b6f4ce2f2cbb1588 

$(document).ready(function() {
    newsRequest();
});


// * ----------------------- MORE HEADLINES ----------------------- * \\

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
    var searchValue = $(".c-news-search").val()
    apiQuery = searchValue;
    topic = searchValue + " " + 'Headlines'
    dataSize = 3;
    pageSize = '&pageSize=3';

    if(searchValue != "") {
    $(".card").fadeOut(800).promise()
    .then(function() {
        newsRequest();
    });
}   
})

// * ----------------------- HOME  ----------------------- * \\

$("#Home").click(function() {

    apiQuery='top-headlines';
    topic='World Headlines'
    pageSize='&pageSize=3';
    dataSize=3;
    
    console.log(apiQuery);
    
        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    })

// * ----------------------- TECHNOLOGY ----------------------- * \\

$("#Tech").click(function() {

    apiQuery='technology';
    topic='Technology Headlines'
    pageSize='&pageSize=3';
    dataSize=3;
    
    console.log(apiQuery);
    
        $(".card").fadeOut(800).promise()
        .then(function() {
            newsRequest();
        });
    })

// * ----------------------- POLITICS ----------------------- * \\


    $("#Politics").click(function() {

        apiQuery='politics';
        topic='Politics Headlines'
        pageSize='&pageSize=3';
        dataSize=3;
        
        console.log(apiQuery);
        
            $(".card").fadeOut(800).promise()
            .then(function() {
                newsRequest();
            });
        })

// * ----------------------- ENTERTAINMENT ----------------------- * \\


        $("#Entertainment").click(function() {

            apiQuery='entertainment';
            topic='Entertainment Headlines'
            pageSize='&pageSize=3';
            dataSize=3;
            
            console.log(apiQuery);
            
                $(".card").fadeOut(800).promise()
                .then(function() {
                    newsRequest();
                });
            })

// * ----------------------- NEWS AJAX REQUEST ----------------------- * \\

    function newsRequest() {
        
        var url = apiPath + apiQuery + pageSize + apiKey;
        console.log(url)

        $.ajax(
            {
             type: "GET",
             dataType: "json",
             cache: false, 
             url: url,
             success: function(data)
             {
                var newsID = Object.keys(data.articles);

                
                 console.dir(data);

                 $('.c-news-card-title').html(topic)
                 
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
