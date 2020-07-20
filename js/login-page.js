// --- VALIDATION FORM --- //

jQuery(function ($) {
    $('.myform').on('submit', function (event) {
        event.preventDefault(); // отменяем событие по умолчанию
        if (validateForm()) { // если есть ошибки возвращает true
            return false; // прерываем выполнение скрипта
        }
    });

    function validateForm() {
        var backsay1 = document.getElementById('id6');
        var activeLanguage = document.querySelector('.dropdown_value').innerText;
        backsay1.innerText = '';

        // Проверка логина    
        var el_l = $('[name="login"]');
        var v_login = el_l.val() ? false : true;
        if (el_l.val().length < 4) {
            var v_login = true;
            var backsay1 = document.getElementById('id6');
            backsay1.innerText = eval("dict" + activeLanguage).id6;
            backsay1.style.opacity = '1'
        }
        $('[name="login"]').toggleClass('error', v_login);

        //Проверка пароля
        var el_p = $('[name="password"]');
        var v_password = el_p.val() ? false : true;
        if (el_p.val().length < 4) {
            var v_password = true;
            var backsay1 = document.getElementById('id6');
            backsay1.innerText = eval("dict" + activeLanguage).id6;
            backsay1.style.opacity = '1'
        }
        $('[name="password"]').toggleClass('error', v_password);
        return (v_login || v_password);
    }
});

//--- SLIDER ---//

var slideIndex = 1;
//showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

var slideIndex = 0;
showSlides();

function pause(ms) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    }
    while (curDate - date < ms);
}

function checkActive(elAct,elBlock){
    if(elAct.classList.contains('active')){
        elBlock.style.visibility = "visible";
        setTimeout(showSlides, 5000);
    }else{
    }

}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.visibility = "hidden";
        slides[i].childNodes[1].classList.remove("active");
        slides[i].childNodes[7].classList.remove("show");
        
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].childNodes[1].classList.add("active");
    slides[slideIndex - 1].childNodes[7].classList.add("show");

    checkActive(slides[slideIndex - 1].childNodes[1], slides[slideIndex - 1]);
}



// --- CHANGE LANGUAGE --- //

var dictEnglish = {
    id1: "Login",
    id2: "Password",
    id3: "sign in",
    id4: "All right is reserved",
    id5: "Terms and Conditions",
    id6: "Login and password must be more than 3 characters",
    id7: "Cloud-based digital surface management platform",
    id8: "The most affordable Digital Signage solution for media screens",
};
var dictРусский = {
    id1: "Логин",
    id2: "Пароль",
    id3: "Войти",
    id4: "Все права защищены",
    id5: "Договор оферты",
    id6: "Логин и пароль должны быть больше 3 символов",
    id7: "Облачная платформа для управления цифровыми поверхностями",
    id8: "Самое доступное решение в области Digital Signage для экранов"
};

var dictEspaña = {
    id1: "el login",
    id2: "contraseña",
    id3: "registrarse",
    id4: "Todos los derechos estan reservados",
    id5: "Términos y Condiciones",
    id6: "El inicio de sesión y la contraseña deben tener más de 3 caracteres",
    id7: "Plataforma de gestión de superficie digital basada en la nube",
    id8: "La solución de señalización digital más asequible para pantallas",
};

var dict中文 = {
    id1: "登錄",
    id2: "密碼",
    id3: "登入",
    id4: "保留所有權利",
    id5: "條款和條件",
    id6: "登錄名和密碼必須超過3個字符",
    id7: "基於雲的數字表面管理平台",
    id8: "最實惠的屏幕數字標牌解決方案",
};

var dictFrance = {
    id1: "S'identifier",
    id2: "Mot de passe",
    id3: "Entrer",
    id4: "Tous les droits sont réservés",
    id5: "Offre de contrat",
    id6: "Le nom d'utilisateur et le mot de passe doivent comporter plus de 3 caractères",
    id7: "Plateforme de gestion de surface numérique basée sur le cloud",
    id8: "La solution d'affichage numérique la plus abordable pour les écrans"
};

function changeLanguage(language) {
    var allTranslate = document.getElementsByClassName('translation');
    for (translate of allTranslate) {
        if(language==="中文") {
            var slideH3 = document.getElementsByClassName('text slide');
            for(elem of slideH3){
                elem.style.textIndent = "7em";
            }
        };
        var whatDict = eval("dict" + language)
        var newWord = whatDict[translate.id];
        if (translate.id === "id1" || translate.id === "id2") {
            translate.placeholder = newWord;
        } else {
            translate.innerText = newWord;
        }
    }
};

// --- DROPDOWN --- //

// step1
function Dropdown(o) {
    this.options = o;

    // step3
    window.getdd = function (elem) {
        var id = elem.closest('.dropdown').parentElement.id;
        return window.dropdowns[id];
    }

    // step1 - show val
    this.init = function () {
        this.elem = document.getElementById(this.options.id);

        //step1 + step2
        var html =
            `<div class='dropdown'>
    			<div class='dropdown_value'></div>
		          <div class='dropdown_arrow'>▾</div>
		          <div class='dropdown_panel'>
		          	<div class='dropdown_items'></div>
		          </div>
		    </div>`;

        //step4 - misc
        var self = this;
        document.addEventListener("mousedown", function () {
            if (self.isVisible) self.hide();
        });

        //step4 - misc
        if (!window.dropdowns) window.dropdowns = {};
        window.dropdowns[this.options.id] = this;

        //step4 - misc
        this.elem.style.display = 'inline-block';

        //step1
        this.elem.innerHTML = html;
        var elem = this.elem;
        this.items = elem.querySelector(".dropdown_items");
        this.value = elem.querySelector(".dropdown_value");

        //step2
        this.panel = elem.querySelector(".dropdown_panel");
        this.arrow = elem.querySelector(".dropdown_arrow");

        //step1
        var self = this;
        this.value.innerHTML = this.options.val;

        //step2
        var data = this.options.data;
        var html = "";
        data.forEach(function (elem) {
            html += `<div class='dropdown_item' onmousedown='var self=getdd(this);self.clicked(this)'>${elem}</div>`;
        });
        this.items.innerHTML = html;

        //step2
        this.elem.addEventListener('mousedown', function () {
            event.stopPropagation();

            if (self.isVisible)
                self.hide();
            else
                self.show();
        });
    }

    // step3
    this.clicked = function (elem) {
        event.stopPropagation();
        this.hide();

        var newval = elem.innerHTML;
        this.value.innerHTML = newval;
        changeLanguage(newval);

        if (this.options.cb)
            this.options.cb(newval);
    }

    // step2
    this.show = function () {
        for (var dd in window.dropdowns)
            window.dropdowns[dd].hide();

        this.isVisible = true;
        this.items.style.transform = 'translate(0px,0px)';
        this.arrow.style.transform = 'rotate(180deg)';
    }

    // step2b.
    this.hide = function () {
        if (!this.items) return;

        this.isVisible = false;
        this.items.style.transform = 'translate(0px,-255px)';
        this.arrow.style.transform = 'rotate(0deg)';
    }

    this.init();
    return this;
}

// step1 - just show val
var dd = new Dropdown({
    id: 'dd1',
    val: 'Русский',
    // step2 show items
    data: ['Русский', 'English', 'España', '中文', 'France'],
    cb: function (newval) {
        //alert(newval);
    }
});