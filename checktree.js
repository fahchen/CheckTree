/*!
 * Name: CheckTree jQuery Plugin
 * Copyright 2012, Fah Chen
 *
 * email:dev.fah@gmail.com
 * Date: 2012.3.31 Friday
 */
(function($){
  $.fn.extend({
    CheckTree: function(options) {
      var $CheckTree = this;
      $CheckTree.find(':checkbox').each(function(){
        $(this).before('<span class="foldbtn folded"></span><span class="checkbtn unchecked"></span>');
        if ($(this).siblings('ul').length == 0){
          $(this).siblings('span.foldbtn').removeClass().addClass('foldbtn nothing');
        }
      });
      $CheckTree.children('li').find('ul').hide();
      $CheckTree.find("li").find(":checkbox")
      .change(function(){
        var $all = $(this).siblings("ul").find(":checkbox");
        var $checked = $all.filter(":checked");
        if ($all.length == 0) {
          if ($(this).attr('checked')) {
            $(this).siblings('span.checkbtn').removeClass().addClass('checkbtn allchecked')
          } 
          else{
            $(this).siblings('span.checkbtn').removeClass().addClass('checkbtn unchecked')
          };
          $(this).closest('ul').siblings(':checkbox').change();
        }
        else if ($all.length != 0 && $checked.length == 0) {
          $(this).attr("checked", false);
          $(this)
            .siblings('span.checkbtn').removeClass().addClass('checkbtn unchecked')
            .closest('ul').siblings(':checkbox').change();
        }
        else if ($all.length != 0 && $all.length == $checked.length){
          $(this).attr("checked", true);
          $(this).siblings('span.checkbtn').removeClass().addClass('checkbtn allchecked')
            .closest('ul').siblings(':checkbox').change();
        }
        else { 
          $(this).attr("checked", false);
          $(this).siblings('span.checkbtn').removeClass().addClass('checkbtn halfchecked')
            .closest('ul').siblings(':checkbox').change();
        }

      })
      .siblings('span.checkbtn').click(function(){
        if ($(this).siblings(':checkbox').attr('checked')) {
          $(this).siblings('ul').find(':checkbox').attr('checked', false).end().find('span.checkbtn').removeClass().addClass('checkbtn unchecked');
        } 
        else{
          $(this).siblings('ul').find(':checkbox').attr('checked', true).end().find('span.checkbtn').removeClass().addClass('checkbtn allchecked');
        };
        $(this).siblings(':checkbox').click();
      })
      .siblings('label').click(function(){
        if ($(this).siblings('ul').length != 0) {
          if ($(this).siblings('ul').is( ":hidden ")) {
            $(this).siblings('span.foldbtn').removeClass().addClass('foldbtn expanded');
          }
          else{
            $(this).siblings('span.foldbtn').removeClass().addClass('foldbtn folded');
          };
        };
        $(this).siblings('ul').toggle();
      });
    },
    formatout: function(){
      out(format($(this)));
      function out($lis){
        if ($lis.length == 0){
          return;
        }
        $lis.each(function(){
          if ($(this).children(':checkbox').attr('checked')){
            $(this).children('ul').find(':checkbox').attr('checked',false);
          }
          else{
            out(format($(this).children('ul')));
          };
        });
      };
      function format($parent_ul){
        return $parent_ul.children('li');
      };
    }
  });
})(jQuery);