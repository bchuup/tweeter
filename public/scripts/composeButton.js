"use strict";

$(function() {
  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
    $('.write-here').focus();
  });
});