let alertboxbool = false;
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
let urlform = document.getElementById('urlform');
document.getElementById('urlInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        goBtn.click();
    }
});

goBtn.onclick = () =>{
    document.getElementById("urlform").action = document.getElementById('urlInput').value;
    document.getElementById('urlform').submit();
}





// goBtn.onclick = () =>{
//     site = document.getElementById('urlInput').value
//     sendajax(site)
// }
