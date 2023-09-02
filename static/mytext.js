let btnbox = document.getElementsByClassName('tabBtns')
let totaltabs = 0;
let alertboxbool = false
let activepage;
let availability = document.getElementById('availability').getAttribute('availability');

function savePassCookie(url, password) {
    const sitepass = {
        site: url,
        pass: password
    };
    const jsonString = JSON.stringify(sitepass);
    document.cookie = `sitepass=${encodeURIComponent(jsonString)};  path=/`;

}
class passwordBox {
    constructor(data) {
        if (alertboxbool == false) {
            this.box = "<div id=\"alert1\" ><div class=\"alert-box border border-black bg-slate-100\"><div class=\"alert-message text-md font-bold text-center\" id =\"alert-message\">" + data + "</div><div class=\"inputPass\"><input id =\"inputPass\" class=\"  border border-black  \" type=\"password\"><div><div class=\"alert-buttons\"><a class=\"cursor-pointer\" id=\"alert-ok\" type=\"button\">Ok</</div><!-- .alert-buttons --></div></div>";
            $(".alerthere").append(this.box);
            let alertok = document.getElementById("alert-ok");
            let inputPass = document.getElementById("inputPass");
            alertboxbool = true;
            let textboxes = document.querySelectorAll(".text-area")
            let textlist = []
            textboxes.forEach(element => {
                textlist.push(element.value)
            })
            alertok.onclick = () => {
                let validator = document.getElementById('validator').value
                let password = inputPass.value
                var password_256 = calcMD5(password) //creating 256bit key from the password using md5
                let thispage = window.location.pathname;
                savePassCookie(thispage, password_256);
                var password_256Array = password_256.split(""); //makeing it an array
                password_256Array.forEach((element, index) => {
                    password_256Array[index] = element.charCodeAt(0)
                })

                var encryptedBytes = aesjs.utils.hex.toBytes(validator); //concerting back to bytes
                var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
                var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
                var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

                if (decryptedText == 'NamanSethi') {
                    textlist.forEach((element, index) => {
                        var encryptedBytes = aesjs.utils.hex.toBytes(element); //concerting back to bytes
                        var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
                        var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
                        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes); //coverting to text
                        textboxes[index].value = decryptedText
                    })
                    textboxesObjList.forEach(box => {

                        box.title = box.element.value == "" ? "tab " + box.tabno : box.element.value.slice(0, 5)
                        let btntextnew = box.title;
                        box.Ibutton.innerHTML = btntextnew
                    })

                    buttons = document.querySelectorAll('.iBtn');
                    buttons.forEach(element => {
                        element.classList.remove("hidden")
                    })
                    $(".alerthere").empty()
                    alertboxbool = false;
                }

                else {
                    $(".alert-box").addClass("shake");
                    setTimeout(function () {
                        $(".alert-box").removeClass("shake");
                    }, 200);


                    textlist.forEach((element, index) => {
                        var encryptedBytes = aesjs.utils.hex.toBytes(element); //concerting back to bytes
                        var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
                        var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
                        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes); //coverting to text
                        textboxes[index].value = decryptedText
                    })

                }
            }
            ////////////send data in ajax///////////////




        }


    }


}
function sendajax(thispage, data, validator, ajaxpage) {

    $.ajaxSetup({
        headers: {
            "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
        }
    });



    $.ajax({
        url: ajaxpage,
        method: 'POST',
        data: {
            'url': thispage,
            'data': data,
            'validator': validator
        },
        dataType: 'json',
        success: function (data) {
            if (data.site_available == "true") {
                window.location = window.location.href + data.site;

                getpass = new alertBox("This site is available. Enter a password");
            }

        },
        error: (error) => {
            console.log("this error")
            console.log(error);
        }
    });

}



class textbox {

    constructor(element) {
        this.element = element
        this.title = element.value
        this.text = element.value
        let btntext = document.createTextNode(this.title);
        element.classList.add("hidden");
        let btn = document.createElement("button");
        this.btnbody = btn;
        btn.classList.add('rounded-lg', 'text-black', 'border', 'border-black', 'px-4', 'inline-block', 'shadow-xl', 'lg:px-6', 'active', 'iBtn')

        let pTag = document.createElement('p')
        pTag.classList.add('text-md', 'font-extrabold')
        // pTag.textContent = null
        btn.appendChild(pTag)
        this.Ibutton = pTag;
        this.tabno = totaltabs
        $(element).on("change", function () {
            this.title = element.value == "" ? "tab " + totaltabs : element.value.slice(0, 5)
            let btntextnew = this.title;
            pTag.innerHTML = btntextnew
        });

        btn.onclick = () => {
            let textboxesall = document.querySelectorAll(".text-area")
            textboxesall.forEach(e => {
                e.classList.add("hidden");
            })
            activepage = this
            element.classList.remove("hidden")

        }
        btnbox[0].appendChild(btn)

    }

}

let textboxes = document.querySelectorAll(".text-area")

textboxesObjList = []
textboxes.forEach(element => {
    let box = new textbox(element)
    textboxesObjList.push(box)
    box.title = box.element.value == "" ? "tab " + box.tabno : box.element.value.slice(0, 5)
    let btntextnew = box.title;
    box.Ibutton.innerHTML = btntextnew
    totaltabs++;


});

if (availability == 'false') {
    buttons = document.querySelectorAll('.iBtn');
    buttons.forEach(element => {
        element.classList.add("hidden")
    })
    const cookies = document.cookie;
    console.log(cookies);
    const siteCookie = cookies.split(";").map(cookie => cookie.trim()).find(cookie => cookie.startsWith("sitepass="));
    if (siteCookie) {
        const jsonString = decodeURIComponent(siteCookie.split("=")[1]);
        const sitepass = JSON.parse(jsonString);
        let textboxes = document.querySelectorAll(".text-area")
        let textlist = []
        textboxes.forEach(element => {
            textlist.push(element.value)
        })
        let thispage = window.location.pathname;
        if (sitepass.site === thispage) {
            let validator = document.getElementById('validator').value
            var password_256Array = sitepass.pass.split(""); //makeing it an array
            password_256Array.forEach((element, index) => {
                password_256Array[index] = element.charCodeAt(0)
            })

            var encryptedBytes = aesjs.utils.hex.toBytes(validator); //concerting back to bytes
            var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
            var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
            var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

            if (decryptedText == 'NamanSethi') {
                textlist.forEach((element, index) => {
                    var encryptedBytes = aesjs.utils.hex.toBytes(element); //concerting back to bytes
                    var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
                    var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
                    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes); //coverting to text
                    textboxes[index].value = decryptedText
                })
                textboxesObjList.forEach(box => {

                    box.title = box.element.value == "" ? "tab " + box.tabno : box.element.value.slice(0, 5)
                    let btntextnew = box.title;
                    box.Ibutton.innerHTML = btntextnew
                })

                buttons = document.querySelectorAll('.iBtn');
                buttons.forEach(element => {
                    element.classList.remove("hidden")
                })
                $(".alerthere").empty()
                alertboxbool = false;
            }

            else {
                passwordBox = new passwordBox("Please enter password to access the data")

            }
            ///////////////////////////
        }

    }
    else {

        passwordBox = new passwordBox("Please enter password to access the data")
    }

}

// textboxesObjList.forEach(element => {

// })

// let addpage = document.getElementById('addpage')

addpage.onclick = () => {


    let boxes = document.getElementsByClassName("text-area");
    texthere = document.getElementsByClassName("text")
    let element = document.createElement("textarea");
    element.classList.add("text-black", "ml-1", "mr-1", "h-full", "w-11/12", "text-area")
    element.setAttribute("rows", "20")
    texthere[0].appendChild(element)
    let box = new textbox(element)
    box.title = "new tab"
    let btntextnew = box.title;
    box.Ibutton.innerHTML = btntextnew
    totaltabs++;
    textboxesObjList.push(box)
    totaltabs++;
}

deletepage.onclick = () => {
    const index = textboxesObjList.indexOf(activepage);
    activepage.element.remove()
    activepage.Ibutton.remove()
    activepage.btnbody.remove();

    delete activepage.btnbody;
    delete activepage.element;
    delete activepage.title
    delete activepage.Ibutton
    activepage = null;
    totaltabs--;

    if (index > -1) { // only splice array when item is found
        textboxesObjList.splice(index, 1); // 2nd parameter means remove one item only
    }
}


////////Text encryptin////////////

class alertBox {
    constructor(data) {
        if (alertboxbool == false) {

            this.box = "<div id=\"alert1\" ><div class=\"alert-box border border-black bg-slate-100	\"><div class=\"alert-message text-md font-bold text-center\" id =\"alert-message\">" + data + "</div><div class=\"inputPass\"><input id =\"inputPass\" class=\"  border border-black  \" type=\"password\"><div><div class=\"alert-buttons\"><a class=\"cursor-pointer\" id=\"alert-ok\" type=\"button\">Ok</</div><!-- .alert-buttons --></div></div>";
            $(".alerthere").append(this.box);
            let alertok = document.getElementById("alert-ok");
            let inputPass = document.getElementById("inputPass");

            alertboxbool = true;
            alertok.onclick = () => {
                let validator = "NamanSethi"
                let textlist = []
                let password = inputPass.value;
                var password_256 = calcMD5(password) //creating 256bit key from the password using md5
                var password_256Array = password_256.split(""); //makeing it an array
                password_256Array.forEach((element, index) => {
                    password_256Array[index] = element.charCodeAt(0)
                })//changing it to ascii values
                textboxesObjList.forEach(element => {
                    var text = element.element.value;
                    var textBytes = aesjs.utils.utf8.toBytes(text); // converting text to bytes
                    var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5)); // ctr to improve efficiency
                    var encryptedBytes = aesCtr.encrypt(textBytes); //encrypting 
                    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes); //converting to hex
                    textlist.push(encryptedHex)
                })
                var text = validator;
                var textBytes = aesjs.utils.utf8.toBytes(text); // converting text to bytes
                var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5)); // ctr to improve efficiency
                var encryptedBytes = aesCtr.encrypt(textBytes); //encrypting 
                var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
                validator = encryptedHex


                ////////////send data in ajax///////////////
                let ajaxpage = document.getElementById("ajaxpage").getAttribute("pageurl")
                let thispage = window.location.pathname;
                sendajax(thispage, textlist, validator, ajaxpage);



                $(".alerthere").empty()
                alertboxbool = false;

            }


        }


    }
}

savebtn = document.getElementById('savetext');

savebtn.onclick = () => {
    const cookies = document.cookie;
    const siteCookie = cookies.split(";").map(cookie => cookie.trim()).find(cookie => cookie.startsWith("sitepass="));
    if (siteCookie ) {
        const jsonString = decodeURIComponent(siteCookie.split("=")[1]);
        const sitepass = JSON.parse(jsonString);
        console.log(jsonString);
        console.log(sitepass.url);
        console.log(window.location.pathname);
        if(sitepass.url ===  window.location.pathname){
        let validator = "NamanSethi"
        let textlist = []
        var password_256Array = sitepass.pass.split(""); //makeing it an array
        password_256Array.forEach((element, index) => {
            password_256Array[index] = element.charCodeAt(0)
        })//changing it to ascii values
        textboxesObjList.forEach(element => {
            var text = element.element.value;
            var textBytes = aesjs.utils.utf8.toBytes(text); // converting text to bytes
            var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5)); // ctr to improve efficiency
            var encryptedBytes = aesCtr.encrypt(textBytes); //encrypting 
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes); //converting to hex
            textlist.push(encryptedHex)
        })
        var text = validator;
        var textBytes = aesjs.utils.utf8.toBytes(text); // converting text to bytes
        var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5)); // ctr to improve efficiency
        var encryptedBytes = aesCtr.encrypt(textBytes); //encrypting 
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        validator = encryptedHex


        ////////////send data in ajax///////////////
        let ajaxpage = document.getElementById("ajaxpage").getAttribute("pageurl")
        let thispage = window.location.pathname;
        sendajax(thispage, textlist, validator, ajaxpage);



        $(".alerthere").empty()
        alertboxbool = false;

    } 

    else{

        new alertBox("Please enter password for this page")
    }

}

    else{

        new alertBox("Please enter password for this page")
    }

}

let changepassword = document.getElementById('changepassword');

changepassword.onclick = () => {

    new alertBox("Enter new password")

}

refreshbtn = document.getElementById('refreshpage')
refreshbtn.onclick = () => {

    location.reload();
}
//decrypting



//date the model for validator
//and made a hidden field