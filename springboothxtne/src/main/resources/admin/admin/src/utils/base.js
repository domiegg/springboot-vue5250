const base = {
    get() {
        return {
            url : "http://localhost:8080/springboothxtne/",
            name: "springboothxtne",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboothxtne/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "学生综合测评系统"
        } 
    }
}
export default base
