class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')

 		"/task/list" (controller: "task", action: "list")
 		"/task/get/$id?" (controller: "task", action: "get")
	}
}
