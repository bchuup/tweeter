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

function renderTweets(tweets) {
  tweets.forEach(tweet => {
    $('#feed-section').append(createTweetElement(tweet))
  })
}


$(function() {

  let target = $('#formTweet')
    target.submit(function (event) {
    event.preventDefault();
    let serArr = $(this).serializeArray()
    let formObj = {}
    serArr.forEach(function(input){
      formObj[input.name] = input.value
    })
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data : formObj,
      success: function (response) {
        console.log('Success: ', response);
      }
    });
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (response) {
        console.log('Success: ', response);
        renderTweets(response)
      }
    });
  }
  loadTweets();
});




