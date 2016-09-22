"use strict"

function createTweetElement(objectData){
  const $article = $("<article>");
  let $html = $article.addClass("tweet").append(
    `<header>
      <img class="avatar" src= ${objectData.user.avatars.small}>
      <h2 class="header-name"> ${objectData.user.name} </h2>
      <p class="handle"> ${objectData.user.handle} </p>
    </header>
    <p class="message"> ${objectData.content.text} </p>
    <footer>
      <p> ${objectData.created_at} </p>
      <div class="icon">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>`
  )
  return $html
}


//node.html will replace all code between the DOM nodes specified with the HTML created in createTweetElement
function renderTweets($node, tweets) {
  $node.html(tweets.map(tweet => createTweetElement(tweet)))
}



$(function() {

  let $target = $('#formTweet')
  let $feedSection = $('#feed-section')

  $target.submit(function(event) {
    event.preventDefault();

    let serArr = $target.serializeArray()
    let formObj = {}

    serArr.forEach(function(input) {
      formObj[input.name] = input.value
    })

    if (formObj.text.length < 1) {
      alert("Tweet something!")
    } else if (formObj.text.length > 140){
      alert("Yada yada yada, your tweet is too long")
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: formObj,
        success: function (response) {
          loadTweets();
        }
      })
    }
  })

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (response) {
        renderTweets($feedSection, response)
      }
    });
  }
  loadTweets();
});




