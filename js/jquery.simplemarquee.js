jQuery(function($) {
  $.fn.simplemarquee = function(options) {
    var settings = $.extend({
      'speed'     : 5000,
      'direction' : 'rtl', // "rtl" (right to left) or "ltr" (left to right)
      'pause'     : true,
      'wrapclass' : 'sections'
    }, options);
    var html = '';
    var width = 0;
    var animation;
    return this.each(function() {
      if ($(this).length) {
        html = '<div class="section">' + $(this).html() + '</div>';
        $(this).html('<div class="' + settings.wrapclass + '">' + html + '</div>');
        width = $('.' + settings.wrapclass, this).width();
        if ($(this).css('height') == '0px') {
          $(this).height($('.section:eq(0)', this).height());
        }

        var n = 0;
        for (i=0; i<30; i++) {
          $('.' + settings.wrapclass, this).append(html);
          if ($('.' + settings.wrapclass, this).width() > $(this).width()) {
            n++;
          }
          if (n > 1) {
            break;
          }
        }
        $('.' + settings.wrapclass, this).width('9999px');
        animateit($('.' + settings.wrapclass, this), true);
      }
      if (settings.pause) {
        $('.' + settings.wrapclass, this).mouseover(function() {
          animation.stop();
        });
        $('.' + settings.wrapclass, this).mouseout(function() {
          animateit($(this), false);
        });
      }
    });
    function animateit(obj,rst) {
      var position = 0;
      var speed = settings.speed;
      if (settings.direction == 'ltr') {
        if (rst) obj.css('left','-' + (width*2) + 'px');
        position = (width-2);
      } else {
        position = (width+2);
        if (rst) obj.css('left','0px');
      }

      if (!rst) {
        var left = parseInt(obj.css("left"), 10);
        var percentageComplete = Math.abs(left) / width * 100;
        speed = Math.round(settings.speed / 100 * (100 - percentageComplete));
      }

      animation = obj.animate({left: '-' + position + 'px'}, speed, 'linear', function() {
        animateit(obj, true);
      });
    }
  };
});