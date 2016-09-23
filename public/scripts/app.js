"use strict"


function tweetTime(created){
  let timeAgo
  let date = new Date();
  let seconds = date.getTime() - created
  if (seconds < 86400000) {
    let time = Math.round(seconds/3600000)
    timeAgo = `${time} hrs ago`
  } else {
    let time = Math.round(seconds/86400000)
    timeAgo = `${time} days ago`
  }
  return timeAgo
}

function createTweetElement(tweetsJSON){
  let created = tweetTime(tweetsJSON.created_at)
  const $article = $("<article>");
  let $html = $article.addClass("tweet").append(
    `<header>
      <img class="avatar" src= ${tweetsJSON.user.avatars.small}>
      <h2 class="header-name"> ${tweetsJSON.user.name} </h2>
      <p class="handle"> ${tweetsJSON.user.handle} </p>
    </header>
    <p class="message"> ${tweetsJSON.content.text} </p>
    <footer>
      <p> ${created} </p>
      <div class="icon">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>`
  );
  return $html;
}

function renderTweets($node, tweets) {
  $node.html(tweets.map(tweet => createTweetElement(tweet)));
}


$(function() {


  let $target = $('#formTweet');
  let $feedSection = $('#feed-section');
  let $textarea = $('.write-here');
  let $counter = $('.counter')

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


  $target.submit(function(event) {
    let serArr = $target.serializeArray();
    let formObj = {};

    event.preventDefault();

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
          $textarea.val('');
          $counter.text(140);
        }
      })
    }
  })
});




