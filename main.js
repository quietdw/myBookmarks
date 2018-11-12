    var keys = {
        0:['0','1','2','3','4','5','6','7','8','9',],
        1:['q','w','e','r','t','y','u','i','o','p'],
        2:['a','s','d','f','g','h','j','k','l'],
        3:['z','x','c','v','b','n','m']
    };
    var hash = {
        'q':'qq.com',
        'j':'jiangnana.fun',
        'l':'qq.com'

    };
    var i=0;
    var localStorageHash = JSON.parse(localStorage.getItem('hash') || 'null');
    //console.log(localStorageHash);
    if(localStorageHash){
        hash = localStorageHash;
    }
    //console.log(hash);
    while(i < Object.keys(keys).length){
        var j=0;
        var oMain = document.getElementById('main');
        var oDiv = document.createElement('div');
        oDiv.className = 'row';
        main.appendChild(oDiv);
        
        while (j < keys[i].length) {
            var oKbd = document.createElement('kbd');
            oKbd.textContent = keys[i][j];
            oDiv.appendChild(oKbd);

            var oImg = document.createElement('img');
            oImg.src = '//' + hash[keys[i][j]] + '/favicon.ico';
            if(!hash[keys[i][j]]){
                oImg.src = 'https://jiangnana.fun/myBookmarks/dot.ico';
            }
            oImg.onerror = function(e){
                e.target.src = 'https://jiangnana.fun/myBookmarks/dot.ico';
            }
            oKbd.appendChild(oImg);

            var oBtn = document.createElement('button');
            oBtn.textContent = '编辑';
            oBtn.onclick = function(e){
                var url = prompt('请输入网址');
                var key = this.parentNode.textContent[0];
                hash[key] = url;
                newImg = this.previousSibling;
                newImg.src = '//' + hash[key] + '/favicon.ico';
                if(!hash[key]){
                    newImg.src = 'https://jiangnana.fun/myBookmarks/dot.ico';
                }
                newImg.onerror = function(e){
                    e.target.src = 'https://jiangnana.fun/myBookmarks/dot.ico';
                }
                localStorage.setItem('hash',JSON.stringify(hash));
            }
            oKbd.appendChild(oBtn);
            
            j++;
        };

        i++;
    };

    document.onkeypress = function (e) {
        var key = e['key'];
        url = hash[key]
        if(url){
            window.open('http://'+url, '_blank');
        }else{
            alert(key+'键的地址不正确')
        }
    };

