var wrapper = new IScroll('body', {
    snap: document.querySelectorAll('.board'),
    momentum: false
});
wrapper.on('scrollEnd', function (e) {
    wrapper.refresh()
});

activeFrame('#question',false);
activeFrame('#anwser',true);

var searchBtn = document.querySelector('#searchBox .doSearch');
var searchInput = document.querySelector('#searchBox .searchInput');
var $searchInput = $(searchInput);
var searchBox = document.querySelector('#searchBox .steps');

searchBtn.addEventListener('click', searchFinger);
searchFinger('谢谢大家');
// searchFinger('12321321');



function activeFrame(sle) {
    var $pices = $(sle + '>.pice');
    var index = 1;
    var length = $pices.length;
    setInterval(function () {
        if(index>=length){ index = 0 }
        $pices.removeClass('active').eq(index).addClass('active')
        index++;
    },3000)
}

function activeFinger() {
    var $pices = $('.step');
    var index = 1;
    var length = $pices.length;
    setInterval(function () {
        if(index>=length){ index = 0 }
        $pices.removeClass('active').eq(index).addClass('active')
        index++;
    },1000)
}

function searchFinger(key) {
    if(typeof key !== 'string' || !key) {
        key = $searchInput.val();
    }
    searchBox.innerHTML = '转换中...';
    $.ajax({
        url: './check?k='+key,
        dataType:'json',
        contentType: "application/json",
        method:'GET',
        success: function (data) {
            searchBox.innerHTML = '';
            if(data.length>0){
                data.forEach(function (it,id) {
                    var item = document.createElement('div');
                    var word = document.createElement('span');
                    var desc = document.createElement('span');
                    var img = document.createElement('img');

                    item.className = id===0? 'step active': 'step';
                    word.className = 'word';
                    desc.className = 'desc';
                    img.className = 'img';

                    word.innerHTML = it.word;
                    desc.innerHTML = it.desc;
                    img.src = it.imgsrc;
                    item.appendChild(word);
                    item.appendChild(desc);
                    item.appendChild(img);
                    searchBox.appendChild(item);
                    wrapper.refresh()
                    activeFinger();
                })
            }else{
                alert('没有找到相关手语')
            }

        },
        completed: function () {
            console.log('completed')
        },
        error: function () {
            console.log('error')
        }
    })
}