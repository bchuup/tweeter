"use strict";

$(function() {
  let $textarea = $('.write-here');

  $textarea.bind('keyup', function(event) {
    length = 140 - this.textLength;
    $(this).closest('form').find('span').text(length)
    if (length < 0){
      $(this).closest('form').find('span').addClass('red')
    } else {
      $(this).closest('form').find('span').removeClass('red')
    }
  })
})


