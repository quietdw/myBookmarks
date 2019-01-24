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
    var oBtn = generateElement('span',{textContent:'edit',className:'editBtn'});
    oBtn.onclick = function(e){
        var domain = prompt('请输入网址');
        if(domain){
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
        
    }

    return oBtn
}

function init(){
    var keys = {
        0:['`','1','2','3','4','5','6','7','8','9','0','-','=','←'],
        1:['tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
        2:['caps','a','s','d','f','g','h','j','k','l',';','\'','enter'],
        3:['shift','z','x','c','v','b','n','m',',','.','/','shift'],
        4:['ctrl','win','alt','space','alt','fn','win','ctrl']
    };

    var hash = {
        'b':'www.bilibili.com',
        'l':'lol.qq.com',
        'q':'www.qq.com',
        'z':'www.zhihu.com',
        'g':'www.google.com',
        'j':'juejin.im',
        'v':'www.v2ex.com',
        's':'stackoverflow.com'
        ,
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
    
        var oDiv =  generateElement('div',{className:`row${i}`})
        oMain.appendChild(oDiv);
        
        for(var j=0;j < keys[i].length;j++){
            var oword = generateElement('span',{textContent:keys[i][j],className:'keyboardWord'})
            var oKbd = generateElement('kbd',{})
            oKbd.appendChild(oword)
            

            var oImg = createImg(hash[keys[i][j]],'https://jiangnana.fun/myBookmarks/dot.ico')
    
            var oBtn = createBtn()
    
            oDiv.appendChild(oKbd);
            if(oKbd.textContent.length<=1&&oKbd.textContent!=='←'){
                oKbd.appendChild(oImg);
                oKbd.appendChild(oBtn);
            }
        };
    }
 }

function listener(hash){
    document.onkeypress = function (e) {
        var keyValue = e['key'];
        url = hash[keyValue]
        if(e.code!=='Space'){
            if(url){
                window.open('http://'+url, '_blank');
            }else{
                alert('\" ' + keyValue+' \"键的地址不正确')
            }
        }
        
            
                
        
        
        
    }
}