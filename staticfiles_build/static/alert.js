let alertboxbool = false;
// console.log('hello');
// let ajaxpage = document.getElementById('ajax_page').getAttribute("ajaxpage")
// console.log("pk")
// console.log(ajaxpage)
class alertBox {
    constructor(data) {
        if (alertboxbool == false) {

            this.box = "<div id=\"alert1\" ><div class=\"alert-box\"><div class=\"alert-message\" id =\"alert-message\">" + data + "</div><div class=\"inputPass\"><input type=\"password\"><div><div class=\"alert-buttons\"><a id=\"alert-ok\" type=\"button\">Ok</</div><!-- .alert-buttons --></div></div>";
            $(".alerthere").append(this.box);
            console.log($(".alerthere"))
            let alertok = document.getElementById("alert-ok");
            alertboxbool = true;

            alertok.onclick = () => {

                $(".alerthere").empty()
                alertboxbool = false;

            }


        }


    }
}

let goBtn = document.getElementById('goBtn');
(function() {
    var urlform = document.getElementById('urlform');
    urlform.addEventListener('keypress', function(event) {
        if (event.key == 'enter') {
            event.preventDefault();
           goBtn.click
        }
    });
}());

goBtn.onclick = () =>{
    // console.log("hello")
    document.getElementById("urlform").action = document.getElementById('urlInput').value;
    document.getElementById('urlform').submit();
}

// document.addEventListener("keyup", function(event) {
//     if (event.code === 'Enter') {
//         site = document.getElementById('urlInput').value
//         sendajax(site)
//     }
// });
// goBtn.onclick = () =>{
//     site = document.getElementById('urlInput').value
//     sendajax(site)
// }

    
//     function sendajax(data){
//         console.log(data)
        
        
//         $.ajaxSetup({
//         headers: {
//             "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
//         }
//     });
//     $.ajax({
//         url: ajaxpage,
//         method: 'GET',
//         data: {
//             'data': data
//         },
//         dataType: 'json',
//         success: function (data) {
//             if(data.site_available == "true"){
//                 console.log("site is available")
//                 window.location = window.location.href+data.site;

//                 getpass= new alertBox("This site is available. Enter a password");
//             }

//         },
//         error: (error) => {
//             console.log("this error")
//             console.log(error);
//           }
//     });

// }
    

// const alertqwert= new alertBox("This site is available. Enter a password");
