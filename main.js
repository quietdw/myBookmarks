//初始化数据
var init = init();
var keys = init['keys'];
var hash = init['hash'];

//生成键盘
generateKeyboard(keys,hash)

//监听事件
listener(hash)

//工具函数
function getLocalStorageHash(name){
    return JSON.parse(localStorage.getItem(name) || 'null');
}

function generateElement(ele,attributes){
    var oEle = document.createElement(ele);
    for(var attribute in attributes){
        oEle[attribute] = attributes[attribute];
    };
    return oEle;
}

function createImg(domain,url){
 
    var oImg = generateElement('img',{src:'//' + domain + '/favicon.ico'})
    if(!domain){
        oImg.src = url;
    }
    oImg.onerror = function(e){
        e.target.src = url;
    }

    return oImg
}

function createBtn(){
    var oBtn = generateElement('button',{textContent:'edit'});
    oBtn.onclick = function(e){
        var domain = prompt('请输入网址');
        var key = this.parentNode.textContent[0];
        hash[key] = domain;
        var newImg = this.previousSibling;
        if(!hash[key]){
            newImg.src = 'https://jiangnana.fun/myBookmarks/dot.ico';
        }else{
            newImg.src = '//' + hash[key] + '/favicon.ico';
        }
        newImg.onerror = function(e){
            e.target.src = 'https://jiangnana.fun/myBookmarks/dot.ico';
        }
        localStorage.setItem('hash',JSON.stringify(hash));
    }

    return oBtn
}

function init(){
    var keys = {
        0:['1','2','3','4','5','6','7','8','9','0'],
        1:['q','w','e','r','t','y','u','i','o','p'],
        2:['a','s','d','f','g','h','j','k','l'],
        3:['z','x','c','v','b','n','m']
    };

    var hash = {
        'b':'baidu.com',
        'l':'lol.qq.com',
        'q':'qq.com'
    };
    var localStorageHash = getLocalStorageHash('hash')
    if(localStorageHash){
        hash = localStorageHash;
    }
    
    return {
        'keys':keys,
        'hash':hash
    }
}

function generateKeyboard(keys,hash){
    for(var i=0;i < Object.keys(keys).length;i++){
        var oMain = document.getElementById('main');
    
        var oDiv =  generateElement('div',{className:'row'})
        oMain.appendChild(oDiv);
        
        for(var j=0;j < keys[i].length;j++){
            var oKbd = generateElement('kbd',{textContent:keys[i][j]})

            var oImg = createImg(hash[keys[i][j]],'https://jiangnana.fun/myBookmarks/dot.ico')
    
            var oBtn = createBtn()
    
            oDiv.appendChild(oKbd);
            oKbd.appendChild(oImg);
            oKbd.appendChild(oBtn);
        };
    }
 }

function listener(hash){
    document.onkeypress = function (e) {
        var key = e['key'];
        url = hash[key]
        if(url){
            window.open('http://'+url, '_blank');
        }else{
            alert(key+'键的地址不正确')
        }
    }
}