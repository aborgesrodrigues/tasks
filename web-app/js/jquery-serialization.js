(function($) {
	  $.fn.extend({
		toObject: function() {
		  var result = {}
		  $.each(this.serializeArray(), function(i, v) {
		  	var $campo = $("[name='" + v.name + "']")
			result[$campo.attr("id")] = v.value;
		  });
		  return result;
		  },
		fromObject: function(obj) {
		  $.each(this.find(':input'), function(i,v) {
			var name = $(v).attr('id');
			if (obj[name]) {
			  $(v).val(obj[name]);
			} else {
			  $(v).val('');
			}
		  });
		}
	  });
	})(jQuery);