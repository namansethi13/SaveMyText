let btnbox = document.getElementsByClassName('tabBtns')
let totaltabs = 0;
let alertboxbool = false
let activepage;

let availability = document.getElementById('availability').getAttribute('availability');

class passwordBox {
    constructor(data) {
        if (alertboxbool == false) {

            this.box = "<div id=\"alert1\" ><div class=\"alert-box\"><div class=\"alert-message\" id =\"alert-message\">" + data + "</div><div class=\"inputPass\"><input id =\"inputPass\" type=\"password\"><div><div class=\"alert-buttons\"><a id=\"alert-ok\" class=\"cursor-pointer\" type=\"button\">Ok</</div><!-- .alert-buttons --></div></div>";
            $(".alerthere").append(this.box);
            // console.log($(".alerthere"))
            let alertok = document.getElementById("alert-ok");
            let inputPass = document.getElementById("inputPass");     
            alertboxbool = true;
            let textboxes =document.querySelectorAll(".text-area")
            let textlist = []
            textboxes.forEach(element =>{
                textlist.push(element.value)
            })
            console.log(textlist)
            alertok.onclick = () => {
                let validator = document.getElementById('validator').value
                let password = inputPass.value
                var password_256 = calcMD5(password) //creating 256bit key from the password using md5
                var password_256Array = password_256.split(""); //makeing it an array
                password_256Array.forEach((element,index) =>
                    {
                        password_256Array[index] = element.charCodeAt(0)
                    })

                    var encryptedBytes = aesjs.utils.hex.toBytes(validator); //concerting back to bytes
                    var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
                    var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
                    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

                    if(decryptedText == 'NamanSethi'){
                        console.log(true);
                        textlist.forEach((element,index) =>{
                            var encryptedBytes = aesjs.utils.hex.toBytes(element); //concerting back to bytes
                    var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5));
                    var decryptedBytes = aesCtr.decrypt(encryptedBytes); //decrypting
                    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes); //coverting to text
                    textboxes[index].value = decryptedText
                })
                textboxesObjList.forEach(box =>{
                    
                    box.title = box.element.value=="" ? "tab " +box.tabno :box.element.value.slice(0,5)
                    let btntextnew = box.title;
                    // console.log(this.title)
                    box.Ibutton.innerHTML = btntextnew
                })
                
                buttons = document.querySelectorAll('.iBtn');
                buttons.forEach(element => {
                    element.classList.remove("hide")
                })
                $(".alerthere").empty()
                alertboxbool = false;
            }

            else{
                $( ".alert-box" ).effect( "shake" );
            }
            }
                ////////////send data in ajax///////////////

             
              

            }


        }


    }

console.log(availability)

    function sendajax(thispage,data,validator,ajaxpage){
        console.log(data)
        
        
        $.ajaxSetup({
        headers: {
            "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
        }
    });
    $.ajax({
        url: ajaxpage,
        method: 'POST',
        data: {
            'url' : thispage,
            'data': data,
            'validator' : validator
        },
        dataType: 'json',
        success: function (data) {
            if(data.site_available == "true"){
                console.log("site is available")
                window.location = window.location.href+data.site;

                getpass= new alertBox("This site is available. Enter a password");
            }

        },
        error: (error) => {
            console.log("this error")
            console.log(error);
          }
    });

}
class textbox{

    constructor(element){
        this.element = element
        this.title = element.value
        this.text = element.value
        let btntext = document.createTextNode(this.title);
        element.classList.add("hide");
        let btn = document.createElement("button");
        // console.log(btn)
        btn.classList.add("iBtn");
        btn.setAttribute("type","button");
        btn.appendChild(btntext);
        this.Ibutton = btn;
        this.tabno = totaltabs
        $(element).on("change", function() {
            this.title = element.value=="" ? "tab " +totaltabs :element.value.slice(0,5)
            let btntextnew = this.title;
            // console.log(this.title)
            btn.innerHTML = btntextnew
        });
        
        btn.onclick = () =>{
            let textboxesall = document.querySelectorAll(".text-area")  
            textboxesall.forEach(e =>{
                e.classList.add("hide");
            })
            activepage = this
            element.classList.remove("hide")

        }

       btnbox[0].appendChild(btn)

    }

}

let textboxes = document.querySelectorAll(".text-area")

// console.log(textboxes)
textboxesObjList = []
textboxes.forEach(element => {
   let box =  new textbox(element)   
   textboxesObjList.push(box) 
   box.title = box.element.value=="" ? "tab " +box.tabno :box.element.value.slice(0,5)
    let btntextnew = box.title;
            // console.log(this.title)
    box.Ibutton.innerHTML = btntextnew
    totaltabs++;


});

if(availability == 'false'){
    buttons = document.querySelectorAll('.iBtn');
    buttons.forEach(element => {
        element.classList.add("hide")
    })
    passwordBox = new passwordBox("enter password to access the data")
    
   }

textboxesObjList.forEach(element => {
            
})

// let addpage = document.getElementById('addpage')

addpage.onclick = () =>{


    let boxes = document.getElementsByClassName("text-area");

    if (boxes.length>33){
        alert("can't add more tabs")
        return;
    } 
    texthere = document.getElementsByClassName("text")
    let element = document.createElement("textarea");
    element.setAttribute("class","text-area")
    texthere[0].appendChild(element)
    let box =  new textbox(element) 
    box.title = box.element.value=="" ? "tab " +box.tabno :box.element.value.slice(0,5)
    let btntextnew = box.title;
            // console.log(this.title)
    box.Ibutton.innerHTML = btntextnew
    totaltabs++; 
   textboxesObjList.push(box) 
   totaltabs++;
}

deletepage.onclick = () =>{
    // console.log(activepage)
    const index = textboxesObjList.indexOf(activepage);
    activepage.element.remove()
    activepage.Ibutton.remove()

    delete activepage.element;
    delete activepage.title
    delete activepage.Ibutton
    activepage = null;
    totaltabs--;

    console.log(textboxesObjList)
if (index > -1) { // only splice array when item is found
  textboxesObjList.splice(index, 1); // 2nd parameter means remove one item only
}
}


////////Text encryptin////////////

class alertBox {
    constructor(data) {
        if (alertboxbool == false) {

            this.box = "<div id=\"alert1\" ><div class=\"alert-box\"><div class=\"alert-message\" id =\"alert-message\">" + data + "</div><div class=\"inputPass\"><input id =\"inputPass\" type=\"password\"><div><div class=\"alert-buttons\"><a class=\"cursor-pointer\" id=\"alert-ok\" type=\"button\">Ok</</div><!-- .alert-buttons --></div></div>";
            $(".alerthere").append(this.box);
            // console.log($(".alerthere"))
            let alertok = document.getElementById("alert-ok");
            let inputPass = document.getElementById("inputPass");
            
            alertboxbool = true;
            alertok.onclick = () => {
                let validator = "NamanSethi"
                let textlist = []
                let password =inputPass.value;
                var password_256 = calcMD5(password) //creating 256bit key from the password using md5
                var password_256Array = password_256.split(""); //makeing it an array
                password_256Array.forEach((element,index) =>
                    {
                        password_256Array[index] = element.charCodeAt(0)
                    })//changing it to ascii values
                textboxesObjList.forEach(element => {
                    var text = element.element.value;
                    var textBytes = aesjs.utils.utf8.toBytes(text); // converting text to bytes
                    var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5)); // ctr to improve efficiency
                    console.log("h")
                    var encryptedBytes = aesCtr.encrypt(textBytes); //encrypting 
                    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes); //converting to hex
                    textlist.push(encryptedHex)
                })
                    var text = validator;
                    var textBytes = aesjs.utils.utf8.toBytes(text); // converting text to bytes
                    var aesCtr = new aesjs.ModeOfOperation.ctr(password_256Array, new aesjs.Counter(5)); // ctr to improve efficiency
                    console.log("h")
                    var encryptedBytes = aesCtr.encrypt(textBytes); //encrypting 
                    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
                    validator = encryptedHex
                console.log(textlist)


                ////////////send data in ajax///////////////
                let ajaxpage = document.getElementById("ajaxpage").getAttribute("pageurl")
                let thispage = window.location.pathname;
                sendajax(thispage,textlist,validator,ajaxpage);


             
                $(".alerthere").empty()
                alertboxbool = false;

            }


        }


    }
}

savebtn = document.getElementById('savetext');

savebtn.onclick = () =>{

    new alertBox("enter password for this page")
}

refreshbtn = document.getElementById('refreshpage')
refreshbtn.onclick = () =>{

    location.reload(); 
}
//decrypting



//date the model for validator
//and made a hidden field