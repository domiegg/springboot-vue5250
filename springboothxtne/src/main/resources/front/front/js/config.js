
var projectName = '学生综合测评系统';
/**
 * 轮播图配置
 */
var swiper = {
	// 设定轮播容器宽度，支持像素和百分比
	width: '100%',
	height: '400px',
	// hover（悬停显示）
	// always（始终显示）
	// none（始终不显示）
	arrow: 'none',
	// default（左右切换）
	// updown（上下切换）
	// fade（渐隐渐显切换）
	anim: 'default',
	// 自动切换的时间间隔
	// 默认3000
	interval: 2000,
	// 指示器位置
	// inside（容器内部）
	// outside（容器外部）
	// none（不显示）
	indicator: 'outside'
}

/**
 * 个人中心菜单
 */
var centerMenu = [{
	name: '个人中心',
	url: '../' + localStorage.getItem('userTable') + '/center.html'
}, 
{
	name: '综合考试记录',
	url: '../examrecord/list.html'
}, 
{
	name: '错题本',
	url: '../examrecord/wrong.html'
},
]


var indexNav = [

{
	name: '试题信息',
	url: './pages/shitixinxi/list.html'
}, 

{
	name: '综合测评',
	url: './pages/exampaper/list.html'
}, 
{
	name: '测评通知',
	url: './pages/news/list.html'
},
]

var adminurl =  "http://localhost:8080/springboothxtne/admin/dist/index.html";

var cartFlag = false

var chatFlag = false




var menu = [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["新增","查看","修改","删除"],"menu":"学生","menuJump":"列表","tableName":"xuesheng"}],"menu":"学生管理"},{"child":[{"appFrontIcon":"cuIcon-send","buttons":["新增","查看","修改","删除"],"menu":"试题信息","menuJump":"列表","tableName":"shitixinxi"}],"menu":"试题信息管理"},{"child":[{"appFrontIcon":"cuIcon-calendar","buttons":["新增","查看","修改","删除","导出"],"menu":"测评试题管理","tableName":"examquestion"}],"menu":"测评试题管理"},{"child":[{"appFrontIcon":"cuIcon-link","buttons":["新增","查看","修改","删除"],"menu":"管理员","tableName":"users"}],"menu":"管理员管理"},{"child":[{"appFrontIcon":"cuIcon-copy","buttons":["新增","查看","修改","删除"],"menu":"综合测评管理","tableName":"exampaper"}],"menu":"综合测评管理"},{"child":[{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"测评通知","tableName":"news"},{"appFrontIcon":"cuIcon-copy","buttons":["新增","查看","修改","删除"],"menu":"轮播图管理","tableName":"config"}],"menu":"系统管理"},{"child":[{"appFrontIcon":"cuIcon-goodsnew","buttons":["查看"],"menu":"错题本","tableName":"examfailrecord"},{"appFrontIcon":"cuIcon-baby","buttons":["新增","查看","修改","删除"],"menu":"综合测评列表","tableName":"exampaperlist"},{"appFrontIcon":"cuIcon-read","buttons":["查看","导出"],"menu":"综合考试记录","tableName":"examrecord"}],"menu":"综合考试管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-goods","buttons":["查看"],"menu":"试题信息列表","menuJump":"列表","tableName":"shitixinxi"}],"menu":"试题信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-goods","buttons":["查看"],"menu":"试题信息列表","menuJump":"列表","tableName":"shitixinxi"}],"menu":"试题信息模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"学生","tableName":"xuesheng"}]


var isAuth = function (tableName,key) {
    let role = localStorage.getItem("userTable");
    let menus = menu;
    for(let i=0;i<menus.length;i++){
        if(menus[i].tableName==role){
            for(let j=0;j<menus[i].backMenu.length;j++){
                for(let k=0;k<menus[i].backMenu[j].child.length;k++){
                    if(tableName==menus[i].backMenu[j].child[k].tableName){
                        let buttons = menus[i].backMenu[j].child[k].buttons.join(',');
                        return buttons.indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}

var isFrontAuth = function (tableName,key) {
    let role = localStorage.getItem("userTable");
    let menus = menu;
    for(let i=0;i<menus.length;i++){
        if(menus[i].tableName==role){
            for(let j=0;j<menus[i].frontMenu.length;j++){
                for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
                    if(tableName==menus[i].frontMenu[j].child[k].tableName){
                        let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
                        return buttons.indexOf(key) !== -1 || false
                    }
                }
            }
        }
    }
    return false;
}
