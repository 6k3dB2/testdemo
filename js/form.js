host1 = "https://form.globalso.com/";
// host="http://localhost:8087/";
key = "017c42188c8073bd49b43800b16aa404";

var timestamp = new Date().getTime();
var hg_special_domain_name_small_language = {}, hg_minor_languages = {};
hg_special_domain_name_small_language = {'en.hu-q.com': 'en.hu-q.com', 'en.sunleem.com': 'en.hu-q.com'};
hg_minor_languages = {
    'af': 'af',
    'am': 'am',
    'ar': 'ar',
    'az': 'az',
    'be': 'be',
    'bg': 'bg',
    'bn': 'bn',
    'bs': 'bs',
    'ca': 'ca',
    'ceb': 'ceb',
    'co': 'co',
    'cs': 'cs',
    'cy': 'cy',
    'da': 'da',
    'de': 'de',
    'el': 'el',
    'en': 'en',
    'eo': 'eo',
    'es': 'es',
    'et': 'et',
    'eu': 'eu',
    'fa': 'fa',
    'fi': 'fi',
    'fr': 'fr',
    'fy': 'fy',
    'ga': 'ga',
    'gd': 'gd',
    'gl': 'gl',
    'gu': 'gu',
    'ha': 'ha',
    'haw': 'haw',
    'hi': 'hi',
    'hmn': 'hmn',
    'hr': 'hr',
    'ht': 'ht',
    'hu': 'hu',
    'hy': 'hy',
    'id': 'id',
    'ig': 'ig',
    'is': 'is',
    'it': 'it',
    'iw': 'iw',
    'ja': 'ja',
    'jw': 'jw',
    'ka': 'ka',
    'kk': 'kk',
    'km': 'km',
    'kn': 'kn',
    'ko': 'ko',
    'ku': 'ku',
    'ky': 'ky',
    'la': 'la',
    'lb': 'lb',
    'lo': 'lo',
    'lt': 'lt',
    'lv': 'lv',
    'mg': 'mg',
    'mi': 'mi',
    'mk': 'mk',
    'ml': 'ml',
    'mn': 'mn',
    'mr': 'mr',
    'ms': 'ms',
    'mt': 'mt',
    'my': 'my',
    'ne': 'ne',
    'nl': 'nl',
    'no': 'no',
    'ny': 'ny',
    'or': 'or',
    'pa': 'pa',
    'pl': 'pl',
    'ps': 'ps',
    'pt': 'pt',
    'ro': 'ro',
    'ru': 'ru',
    'rw': 'rw',
    'sd': 'sd',
    'si': 'si',
    'sk': 'sk',
    'sl': 'sl',
    'sm': 'sm',
    'sn': 'sn',
    'so': 'so',
    'sq': 'sq',
    'sr': 'sr',
    'st': 'st',
    'su': 'su',
    'sv': 'sv',
    'sw': 'sw',
    'ta': 'ta',
    'te': 'te',
    'tg': 'tg',
    'th': 'th',
    'tk': 'tk',
    'tl': 'tl',
    'tr': 'tr',
    'tt': 'tt',
    'ug': 'ug',
    'uk': 'uk',
    'ur': 'ur',
    'uz': 'uz',
    'vi': 'vi',
    'xh': 'xh',
    'yi': 'yi',
    'yo': 'yo',
    'zh': 'zh',
    'zh-tw': 'zh-tw',
    'zu': 'zu',
    'q': 'q',
    'w': 'w',
    'e': 'e',
    'r': 'r',
    't': 't',
    'y': 'y',
    'u': 'u',
    'i': 'i',
    'o': 'o',
    'p': 'p',
    'a': 'a',
    's': 's',
    'd': 'd',
    'f': 'f',
    'g': 'g',
    'h': 'h',
    'j': 'j',
    'k': 'k',
    'l': 'l',
    'z': 'z',
    'x': 'x',
    'c': 'c',
    'v': 'v',
    'b': 'b',
    'n': 'n',
    'm': 'm'
};
var scr = {}, href = {}, source_address = {}, file = {}, scripts = {}, domain = {}, host = {}, html = {}, id_c = {},
    id_document = {};
id_c[timestamp] = "fromIframes" + timestamp;
host[timestamp] = host1;
scr[timestamp] = document.currentScript;
scripts[timestamp] = document.getElementsByTagName("script");
var durl = /(\/\/([^\/]+)\/)([\w\W]*)(form.js|widget-init-inline.js)/i;
for (var i = scripts[timestamp].length - 1; i >= 0; i--) {
    file[timestamp] = scripts[timestamp][i].getAttribute("src");
    domain[timestamp] = durl.exec(file[timestamp]);
    if (domain[timestamp] && domain[timestamp] != undefined) {
        if (domain[timestamp].length == 5 && (domain[timestamp][4] == 'form.js' || domain[timestamp][4] == 'widget-init-inline.js')) {
            host[timestamp] = domain[timestamp][1];
            source_address[timestamp] = domain[timestamp][2];
            href[timestamp] = scripts[timestamp][i].getAttribute("href");
            break;
        }
    }
}
//------------按钮绑定----------------
var domain_host_url = window.location.href;
var reg_url = /^(http|https):\/\/([^\/]+)\//i;
var domain_name = reg_url.exec(domain_host_url);
var reg = /\\|\/|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\||\./g;
temp = '';
if (domain_name) temp = domain_name[0].replace(reg, "");
else if (domain_host) var temp = domain_host.replace(reg, "");
var input_btn_id = '', len = '';
if (temp) {
    input_btn_id = "mauticform_input_" + temp + "_submit";
    len = document.getElementById(input_btn_id);
    if (!len) {
        var targetElement = document.createElement("input"); // 创建一个元素节点
        targetElement.type = 'button';//submit  button
        targetElement.value = 'google统计';
        targetElement.id = input_btn_id;
        targetElement.class = "google-submit-sum form_" + input_btn_id;
        targetElement.style.display = "none";
        targetElement.addEventListener('click', function (e) {
            console.log('gool统计');
        });
        document.body.insertAdjacentElement("beforeend", targetElement);
        window.addEventListener('message', function (e) {
            var Date = e.data;
            if (Date.num == 3) {
                var sub = document.getElementById(Date.id_c);
                if (/msie/i.test(navigator.userAgent)) //IE
                {
                    sub.fireEvent("onclick");
                } else {
                    var e = document.createEvent('MouseEvent');
                    e.initEvent('click', false, false);
                    sub.dispatchEvent(e);
                }
            }
        }, false);
    }
    document.getElementById(input_btn_id).className = "google-form-submit-sum form_" + input_btn_id;
}
var myDate = new Date;
var year = myDate.getUTCFullYear(); //获取当前年
var mon = myDate.getUTCMonth() + 1; //获取当前月
var date = myDate.getUTCDate(); //获取当前日
var dates = year + "-" + mon + "-" + date;
var windowlocationhost = window.location.host;
// var windowlocationhost = "m.sdgsdg.com";
if(!arrayPrototype(hg_special_domain_name_small_language,windowlocationhost)){
    host_arr=windowlocationhost.split('.');
    if(arrayPrototype(hg_minor_languages,host_arr[0])){
        host_arr[0]='www';
        windowlocationhost=host_arr.join('.');
    }
}
// console.log(myDate.getUTCFullYear()+"-"+(myDate.getUTCMonth()+1)+"-"+myDate.getUTCDate()+" "+myDate.getUTCHours()+":"+myDate.getUTCMinutes()+":"+myDate.getUTCSeconds())
// console.log(myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds())
var html_url = year + '' + mon + '' + date + "_inquiry_form_" + windowlocationhost.replace(/\.|\:/g, "");
html[timestamp] = "<iframe src='" + host[timestamp] + "api/form/" + html_url + "?domain=" + windowlocationhost + "&key=" + key + "&date=" + dates + "&source_address=" + source_address[timestamp] + "' id='" + id_c[timestamp] + "' name='" + id_c[timestamp] + "' class='from_iframe' style='min-width:280px;min-height:420px;width:100%;height:100%;background:transparent;border:none;outline:none;margin:0;padding:0;box-shadow: 0 0 10px rgb(0,0,0,.1);'></iframe>"
if (scr[timestamp] !== undefined) {
    scr[timestamp].insertAdjacentHTML("afterend", html[timestamp]);
    var domain_ = document.domain;
    var domain_host = windowlocationhost;
    var domain_host_url = window.location.href;
    var winWidth = 0;
    var winHeight = 0;
    id_document[timestamp] = document.getElementById(id_c[timestamp]);
    // setTimeout(function () {
    iframe(id_document[timestamp], domain_, domain_host_url, domain_host, host[timestamp], key, winHeight, winWidth, source_address[timestamp], timestamp, input_btn_id, href[timestamp])
    // }, 1000);
}

function iframe(id_document, domain, domain_host_url, domain_host, host, key, winHeight, winWidth, source_address, timestamp, input_btn_id, href) {
    id_document.onload = function () {
        id_document.contentWindow.postMessage({
            domain: domain,
            domain_host_url: domain_host_url,
            domain_host: domain_host,
            host: host,
            key: key,
            winHeight: winHeight,
            winWidth: winWidth,
            source_address: source_address,
            input_btn_id: input_btn_id,
            timestamp: timestamp,
            href: href
        }, '*');
    }
}
function arrayPrototype(array,string) {
    for (var i in array){
        if(i==string)return true;
    }
    return false;
}

window.addEventListener('message', function (e) {
    var Date = e.data;
    if(Date.num == 4){
        if(Date.id_c=='0')window.location.reload();
        else if(!isNaN(Date.id_c))window.history.go(Date.id_c);
        else window.location.href=Date.id_c;
    }
}, false);
