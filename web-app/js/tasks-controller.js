tasksController = function() {
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	var taskPage;
	var initialised = false;

	return {
		init : function(page) {
			if (!initialised) {
				storageEngine.init(function() {
						storageEngine.initObjectStore('task', function() {}, errorLogger) 
				}, errorLogger);
				
				//Ação de limpar campos/*Item 2 do exercício*/
				$("#clearTask").click(
					function()
					{
						$("#taskForm :input").val("");
					}
				);

				taskPage = page;
				$(taskPage).find( '[required="required"]' ).prev('label').append( '<span>*</span>').children( 'span').addClass('required');
				$(taskPage).find('tbody tr:even').addClass( 'even');
				
				$(taskPage).find( '#btnAddTask' ).click( function(evt) {
					evt.preventDefault();
					$(taskPage ).find('#taskCreation' ).removeClass( 'not');
				});
				/*$(taskPage).find('tbody' ).on('click', "tr", function(evt) {
					$(evt.target ).closest('td').siblings( ).andSelf( ).toggleClass( 'rowHighlight');
				});*/
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', 
					function(evt) { 					
						storageEngine.delete('task', $(evt.target).data().taskId, 
							function() {
								$(evt.target).parents('tr').remove(); 
								tasksController.montarFooter();
							}, errorLogger);
					}
				);
				$(taskPage).find( '#saveTask' ).click(function(evt) {
					evt.preventDefault();
					if ($(taskPage).find('form').valid()) {
						var task = $(taskPage).find('form').toObject();		
						storageEngine.save('task', task, function() {
							$(taskPage).find('#tblTasks tbody').empty();
							tasksController.loadTasks();
							$(':input').val('');
							$(taskPage).find('#taskCreation').addClass('not');
						}, errorLogger);
					}
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.editRow', 
					function(evt) { 
						$(taskPage).find('#taskCreation').removeClass('not');
						storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							$(taskPage).find('form').fromObject(task);
						}, errorLogger);
					}
				);
				$(taskPage).find('#tblTasks tbody').on('click', '.completeTask', 
					function(evt) { 
						//Busca a tarefa selecinada
						storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							//marca ela como completa
							task.completed = true;
							
							//Salva a tarefa e insere a classe na linha
							storageEngine.save('task', task, function() {
								tasksController.montarTarefa(task, $(evt.target).parents('tr'));
								tasksController.montarFooter();
							}, errorLogger);
						}, errorLogger);
					}
				);
				
				$(taskPage).find('#tblTasks tbody').on('click', '.uncompleteTask', 
					function(evt) { 
						//Busca a tarefa selecinada
						var $task;
						storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							//marca ela como não completa
							task.completed = false;
							
							//Salva a tarefa e insere a classe na linha
							storageEngine.save('task', task, function() {
								tasksController.montarTarefa(task, $(evt.target).parents('tr'));
								tasksController.montarFooter();
							}, errorLogger);
						}, errorLogger);
						

					}
				);
				
				initialised = true;
			}
    	},
		loadTasks : function() {
			storageEngine.findAll('task', 
				function(tasks) {
					$.each(tasks, function(index, task) {
						var $taskRow = $('#taskRow').tmpl(task ).appendTo( $(taskPage ).find( '#tblTasks tbody'));
						tasksController.montarTarefa(task, $taskRow);
					});
					
					tasksController.montarFooter();
					tasksController.ordenarTabela();
				}, 
				errorLogger);
		},
		montarFooter : function(){/*Item 1 do exercício*/
			//Pega a quantidade de tarefas cadastradas, excluindo as já completadas
			var quantidadeTarefas = $("#tblTasks tbody tr").not(".taskCompleted").length;

			//Monta texto para quando existem tarefas e quano não existem tarefas cadastradas
			if(quantidadeTarefas > 0)
			{
				//Monta texto tarefa/tarefas
				var textoTarefas = " tarefa";
				if(quantidadeTarefas > 1)
					textoTarefas = " tarefas";
				
				//Insere texto no footer
				$("#footer").html("Você tem " + quantidadeTarefas + textoTarefas);
			}
			else
			{
				$("#footer").html("Nenhuma tarefa pendente");
			}
		},
		montarTarefa : function(task, taskRow){
			//Verifica se tarefa foi completada
			if(task.completed)
			{
				taskRow.addClass("taskCompleted");
				taskRow.find(".editRow").hide();
				taskRow.find(".completeTask").hide();
				taskRow.find(".uncompleteTask").show();
			}
			else{
				taskRow.removeClass("taskCompleted");
				taskRow.find(".editRow").show();
				taskRow.find(".completeTask").show();
				taskRow.find(".uncompleteTask").hide();
			}
			
			/*Verificar tarefas vencidas e a vencer - Item 3 do exercício*/
			//A validação para parce/parseExact é porque não estava funcionando corretamente no chrome e no firefox usando apenas uma das formas
			var dataTarefa = Date.parseExact(task.requiredBy, "yyyy-MM-dd") != null ? Date.parseExact(task.requiredBy, "yyyy-MM-dd") : Date.parse(task.requiredBy);
			var quantidadeDiasAVencer = Math.round((dataTarefa - Date.today())/(1000*60*60*24));//Pega quantidade de dias que falta para vencer a tarefa
			
			//Dois dias antes de vencer começa a aparecer marcada com warning
			if(quantidadeDiasAVencer < 0)
				taskRow.addClass("overdue");
			else if(quantidadeDiasAVencer <= 2)
				taskRow.addClass("warning");
			
		},
		/*Ordenar tabela pela data - Item 4 do exercício*/
		ordenarTabela : function(){
			var $tbody = $('#tblTasks tbody');

			$tbody.find('tr').sort(function(a,b){ 
				var tda = Date.parse($(a).find('td:eq(1)').text()); // transforma o valor da coluna em data
				var tdb = Date.parse($(b).find('td:eq(1)').text()); // transforma o valor da coluna em data

				// -1 = tda é anterior a tdb. 0 = valores são iguais. 1 = tda é maior que tdb. 
				return Date.compare(tdb, tda);         
			}).appendTo($tbody);
		}
	}
}();
