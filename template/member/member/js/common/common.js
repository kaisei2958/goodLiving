//共通パーツ読み込み
$(function(){
  $("#header").load("/member/inc/header.html", function() {
    $('.header__bottom-menu li').hover(function(){
        $(".header__bottom-drop:not(:animated)", this).fadeIn(200);
    }, function(){
        $(".header__bottom-drop",this).fadeOut(200);
    });

    var startPos = 0,winScrollTop = 0;
    $(window).scroll(function () {
      winScrollTop = $(this).scrollTop();
      if (winScrollTop >= startPos) {
          if(winScrollTop >= 300){
              $('#header').addClass('hide');
          }
      } else {
          $('#header').removeClass('hide');
      }
      startPos = winScrollTop;
    });

    /** スムーズスクロール ページ遷移版 **/
    var headerHeight = $('.header').outerHeight();
    var lochref = window.location.href;
    if ( lochref.indexOf('#') > -1 ) {
      var anchor = lochref.slice( lochref.indexOf('#') );
      window.setTimeout(function(){
        $('body, html').animate({ scrollTop: $(anchor).offset().top - headerHeight }, 500, 'swing');
      }, 1500);
    }

  });

  $("#footer").load("/member/inc/footer.html", function() {
    $(".pagetop").hide();
    var pagetop = $('.pagetop');
    $(window).scroll(function () {
       if ($(this).scrollTop() > 300) {
            pagetop.fadeIn();
       } else {
            pagetop.fadeOut();
       }
    });
    $(document).on('click', '.pagetop', function(){
    // pagetop.click(function () {
       $('body, html').animate({ scrollTop: 0 }, 500);
       return false;
    });

    //フッターに表示させるセミナー情報を取得 ------------
    getSeminarInfo();
  });
});

//ヘッダー
$(function () {
  var ua = navigator.userAgent;
  var is_sp = false;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    is_sp = true;
  }

  var scrollPosition;
  $(document).on('click', '.header__menu', function(){
    $('.header__nav').slideDown();

    if(is_sp){
      scrollPosition = $(window).scrollTop();
      $("body").addClass('bodyfixed').css({'top': -scrollPosition});
    }

  });

  $(document).on('click', function(e) {
    if(!$(e.target).closest('.header__nav').length && !$(e.target).closest('.header__close').length && !$(e.target).closest('.header__menu').length){
      $('.header__nav').slideUp();
    }else if($(e.target).closest('.header__close').length){
      $('.header__nav').slideUp();
      if(is_sp){
        $("body").removeClass('bodyfixed').css({'top': 0});
        window.scrollTo( 0 , scrollPosition );
      }
    }
  });
});

/** スムーズスクロール 同一ページ版 **/
$(function(){
  $('a[href^="#"]:not(a.noscroll)').click(function(){
    var headerHeight = $('.header').outerHeight();
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerHeight;
    $('body,html').animate({scrollTop:position}, 500, 'swing');
    return false;
  });
});


// お問い合わせバーの読み込み
$(function(){
  if($('#contact-bar').length){
    $("#contact-bar").load("/member/inc/contact-bar.html");

    $(document).on('click', '.fixed_contact__close', function(){
      console.log('click!');
      $('#contact-bar').fadeOut();
    });
  }
});


function getSeminarInfo() {
  const listNo = 3;
  $.ajax({
    url: "/information/seminar_info/",
    cache: false,
    datatype: "html"

  }).done(function (html) {
    // 通信成功
    var counter = 0;
    var seminarList = $(html).find('#event .semi__list .semi__list-item');

    if(seminarList.length == 0){
      var msgHtml = '<li class="semi__msg"><p>直近で開催されるイベントはありませんでした。<br>その他のセミナーにつきましては、<br class="sp_block">Moreボタンからご確認ください。</p></li>';
      $('#footer_seminar ul.semi__list').append(msgHtml);

    } else {
      $(seminarList).each(function(index, element) {
        if(listNo <= counter){
          return false;
        }
        //書き出し ------------
        $('#footer_seminar ul.semi__list').append(element);
        counter++;
      });
    }

  }).fail(function (data) {
    // 通信失敗
    var msgHtml = '<li class="semi__msg"><p>データを取得できませんでした。<br>恐れ入りますが、右下のMoreボタンから<br class="sp_block">セミナー情報をご確認ください。</p></li>';
    $('#footer_seminar ul.semi__list').append(msgHtml);
  });
}
