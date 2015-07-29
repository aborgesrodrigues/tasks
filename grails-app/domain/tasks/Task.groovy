package tasks

class Task {

	String task
	Date requiredBy
	Boolean completed
	Category category

    static constraints = {
    	task(unique: true)
    	completed(blank:true, default: Boolean.FALSE)
    }

	static mapping = {
	     category lazy:false
	}
}
