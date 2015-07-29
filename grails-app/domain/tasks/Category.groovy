package tasks

class Category {

	String description

    static constraints = {
    	description(unique: true)
    }

	String toString(){
	  return description
	}
}
