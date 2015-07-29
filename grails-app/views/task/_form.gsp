<%@ page import="tasks.Task" %>



<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'task', 'error')} required">
	<label for="task">
		<g:message code="task.task.label" default="Task" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="task" required="" value="${taskInstance?.task}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'completed', 'error')} ">
	<label for="completed">
		<g:message code="task.completed.label" default="Completed" />
		
	</label>
	<g:checkBox name="completed" value="${taskInstance?.completed}" />

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'category', 'error')} required">
	<label for="category">
		<g:message code="task.category.label" default="Category" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="category" name="category.id" from="${tasks.Category.list()}" optionKey="id" required="" value="${taskInstance?.category?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: taskInstance, field: 'requiredBy', 'error')} required">
	<label for="requiredBy">
		<g:message code="task.requiredBy.label" default="Required By" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="requiredBy" precision="day"  value="${taskInstance?.requiredBy}"  />

</div>

