<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tarefas</title>
<link rel="stylesheet" type="text/css" href="<g:createLinkTo dir='css' file='tasks.css'/>" 
media="screen" />
<link rel="stylesheet" type="text/css" href="<g:createLinkTo dir='css' file='jquery-ui.css'/>" 
media="screen" />

<script src= "<g:createLinkTo dir='js' file='jquery-2.1.4.js'/>"></script>
<script src= "<g:createLinkTo dir='js' file='jquery-ui.js'/>"></script>

<script src= "<g:createLinkTo dir='js' file='jquery.tmpl.js'/>"></script>
<script src= "<g:createLinkTo dir='js' file='jquery-serialization.js'/>"></script>
<script src= "<g:createLinkTo dir='js' file='tasks-controller.js'/>"></script>
<script src= "<g:createLinkTo dir='js' file='jquery.validate.js'/>"></script>
<script src= "<g:createLinkTo dir='js' file='tasks-grailsstorage.js'/>"></script>
<!-- Datejs -->
<script type="text/javascript" src="<g:createLinkTo dir='js' file='date.js'/>"></script>
</head>
<body>
	<header>
		<span>Lista de Tarefas</span>
	</header>
	<main id="taskPage">
		<section id="taskCreation" class="not">
			<form id="taskForm">
				<input type="hidden" name="id" id="id" />
				<input type="hidden" name="completed" id="completed" />
				<div>
					<label>Tarefa</label> 
					<input type="text" required="required" id="task" name="task" class="large" placeholder="Estudar e programar" />
				</div>
				<div>
					<label>Finalizar até</label> <input type="date" required="required" name="requiredBy" id="requiredBy"/>
				</div>
				<div>
					<label>Categoria</label> 
					<g:select id="category" name="category.id" noSelection="${['':'']}" from="${categories}" optionKey="id" required="" />
					<a href="javascript:void(false)" id="hrefModal">Categorias</a>
				</div>
				<nav>
					<a href="#" id="saveTask">Salvar tarefa</a> <a href="#" id="clearTask">Limpar tarefa</a>
				</nav>
			</form>
		</section>
		<section>
			<table id="tblTasks">
				<colgroup>
					<col width="40%">
					<col width="15%">
					<col width="15%">
					<col width="30%">
				</colgroup>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Deadline</th>
						<th>Categoria</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
			<nav>
				<a href="#" id="btnAddTask">Adicionar tarefa</a>
			</nav>
		</section>
	</main>
	<footer id="footer"></footer>
	<div style="display:none;overflow-x: hidden;" id="divModal">
		<iframe src="/category" style="width:100%;height:100%" scrolling="no"></iframe>
	</div>
</body>
<script>

$(document).ready(function() {
	tasksController.init($('#taskPage'));
	tasksController.loadTasks();

	$("#hrefModal").click(
		function()
		{
			$( "#divModal" ).dialog({
				modal: false,
				closeOnEscape: true, 
				width: 800,
				height: 380,
				title: "Categorias",
			  close: function( event, ui ) {
			  	location.reload();
			  }
			});
		}
	);
});
</script>
<script id="taskRow" type="text/x-jQuery-tmpl">
<tr>
	<td>{{= task}}</td>
	<td><time datetime="{{=requiredBy}}">{{= Date.parseExact(requiredBy, "yyyy-MM-dd") != null ? Date.parseExact(requiredBy, "yyyy-MM-dd").toString('dd/MMM/yyyy') : Date.parse(requiredBy).toString('dd/MMM/yyyy')}}</time></td>
	<td>{{= $("#category option[value=" + category + "]").text()}}</td>
	<td>
		<nav>
			<a href="#" class="editRow" data-task-id="{{= id}}">Editar</a>
			<a href="#" class="completeTask" data-task-id="{{= id}}">Completar</a>
			<a href="#" class="uncompleteTask" data-task-id="{{= id}}" style="display:none">Pendente</a>
			<a href="#" class="deleteRow" data-task-id="{{= id}}">Deletar</a>
		</nav>
	</td>
</tr>
</script>
</html>
