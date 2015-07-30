storageEngine = function() {

	return {
		init : function(successCallback, errorCallback) {
			

		},
		initObjectStore : function(type, successCallback, errorCallback) {
			

		},
		save : function(type, obj, successCallback, errorCallback) {
			var tipo;
			var url;
			var data;
			var contentType;
			var dataType;
			var $form = $("form");
			//console.log($("form"));
			//console.log($form);

			if(!obj.id)
			{
				tipo="POST";
				url = "/task/save";
				contentType = false;
				dataType = false;
				$form.find("#id").val("");
				$form.find("#completed").val("false");

				var $requiredBy = $form.find("#requiredBy");
				$requiredBy.attr("type", "text");
				if($requiredBy.val().indexOf("-") > 0)
				{
					var requiredByArr = $requiredBy.val().split("-");
					var requiredBy = requiredByArr[2] + "/" + requiredByArr[1] + "/" + requiredByArr[0];
					$requiredBy.val(requiredBy);
				}
				data = new FormData($form.get(0));
			}
			else
			{
				tipo="PUT";
				url = "/task/update";
				//data = JSON.stringify($('form').serializeArray());
				contentType: "application/json; charset=utf-8"
				dataType: "json"

				data = obj;

				//se a campo requiredby tiver "-" é porque veio do chrome converter data
				var requiredBy = data["requiredBy"];
				if(requiredBy.indexOf("-") > 0)
				{
					var requiredByArr = requiredBy.split("-");
					requiredBy = requiredByArr[2] + "/" + requiredByArr[1] + "/" + requiredByArr[0];
					data["requiredBy"] = requiredBy;
				}

			    data = JSON.stringify(data);
			}

			$.ajax({
			    url: url,
			    type: tipo,
			    data: data,
				processData: false,  // tell jQuery not to process the data
         		contentType: contentType,
         		dataType: dataType,
			    success: function(result) {
			        successCallback(obj);
			    },
			    error: function(request, status, error) {
			        alert(error)
			    },
			});
		},
		findAll : function(type, successCallback, errorCallback) {
			$.ajax({
			    url: "/task/list",
			    dataType: "json",
			    type: "GET",
				processData: false,  // tell jQuery not to process the data
         		contentType: false,
			    success: function(result) {
			    	
			    	var tasksArr = []
			    	$.each(result.tasks, function(k, v) {
			    		var tasks = {}
			    		tasks.id = v.id;
			    		tasks.task = v.task
			    		tasks.completed = v.completed;
			    		tasks.requiredBy = v.requiredBy;
			    		tasks.category = v.category.id;

			    		//alert(JSON.stringify(tasks));

			    		tasksArr.push(tasks);
					});
			        successCallback(tasksArr);
			    },
			    error: function(request, status, error) {
			    	alert(status);
			        alert(error)
			    },
			});

		},
		delete : function(type, id, successCallback, errorCallback) {
			$.ajax({
			    url: "/task/delete",
			    type: "DELETE",
			    data: JSON.stringify({id: id}),
				processData: false,  // tell jQuery not to process the data
         		contentType: "application/json; charset=utf-8",
         		dataType: "json",
			    success: function(result) {
			        successCallback(id);
			    },
			    error: function(request, status, error) {
			        alert(error)
			    },
			});
		},
		findById : function (type, id, successCallback, errorCallback) {
			$.ajax({
			    url: "/task/get/"+id,
			    dataType: "json",
			    type: "GET",
				processData: false,  // tell jQuery not to process the data
         		contentType: false,
			    success: function(result) {
			    	var task = {}
		    		task.id = result.task.id;
		    		task.task = result.task.task
		    		task.completed = result.task.completed + "";
		    		task.requiredBy = result.task.requiredBy.substr(0,10);
		    		//task.category={}
		    		task.category = result.task.category.id;

		    		//alert(JSON.stringify(task));

		    		successCallback(task);
			    },
			    error: function(request, status, error) {
			    	alert(status);
			        alert(error)
			    },
			});
		}
	}
}();
