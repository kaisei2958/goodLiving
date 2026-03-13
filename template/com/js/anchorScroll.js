/** スムーズスクロール ページ遷移版 **/
$( window ).on( 'load', function(){
  var headerHeight = $('.header').outerHeight();
  var lochref = window.location.href;
  if ( lochref.indexOf('#') > -1 ) {
    var anchor = lochref.slice( lochref.indexOf('#') );
    window.setTimeout(function(){
      $('body, html').animate({ scrollTop: $(anchor).offset().top - headerHeight }, 500, 'swing');
    }, 500);
  }
});
/** スムーズスクロール 同一ページ版 **/
/* 202408ページネーション対応で.not追加 */
$(function(){
  $('a[href^="#"]').not(".list .pagination a").click(function(){
    var headerHeight = $('.header').outerHeight();
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerHeight;
    $('body,html').animate({scrollTop:position}, 500, 'swing');
    return false;
  });
});