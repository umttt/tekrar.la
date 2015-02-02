/**
 * Created by umttt on 1/31/15.
 */
userLang = navigator.language || navigator.userLanguage;

function getText(text) {
    if(userLang.indexOf("en") > -1){
        return text;
    }
    else {
        if ( userLang in languages && text in languages[userLang]) {
            return languages[userLang][text];
        }
        else {
            return text;
        }
    }
}

languages = {
    "tr": {
        "It is not a valid url": "Uygun bir url değil",
        "Unknown problem": "Bilinmeyen bir problem oluştu",
        "Unsupported domain": "Desteklenmeyen domain",
        "Unsupported url": "Desteklenmeyen url tipi",
        "Contact": "İletişim",
        "Play infinite video": "Sonsuz video oynat",
        "All rights reserved": "Tüm hakları saklıdır",
        "Contact with:": "İletişim için:"
    }
};

jQuery(document).ready(function($) {
    $(".text-div").each(function () {
        var text = $(this).html();
        $(this).html(getText(text));
    });
});
