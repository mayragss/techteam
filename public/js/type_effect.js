/*global $, jQuery, alert*/
$(document).ready(function() {

    'use strict';

    // ========================================================================= //
    //  Typed Js About
    // ========================================================================= //
  
    var typed = $(".typed");
    
    $(function() {
      typed.typed({
        strings: ["a TechTeam"],
        typeSpeed: 100,
        loop: true,
      });
    });

    // ========================================================================= //
    //  Typed Js TechTeam
    // ========================================================================= //

    var t = $(".t");
    
    $(function() {
      t.typed({
        strings: ["TECH"],
        typeSpeed: 200,
        loop: true,
        showCursor: false,
        cursorChar: '',
      });
    });


    var e = $(".e");
    
    $(function() {
      e.typed({
        strings: ["TEAM"],
        typeSpeed: 220,
        loop: true,
        showCursor: false,
        cursorChar: '',
      });
    });

  });
  

  



  