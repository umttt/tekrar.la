function validate_url(url) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return url.match(regex);
}

function parse_url(url) {
    /**
     * Parse url function
     * @return object: { status: <status_number>, data: <parse_data>}
     *                  status:
     *                      0; All OK, No problem
     *                      1; Unknown problem
     *                      2; Unsupported domain
     *                      3; Unsupported url
     *                  data:
     *                      domain_type;
     *                          youtube = 0
     *                          vimeo   = 1
     *                      hostname; hostname of url
     *                      video_id;
     */

    var return_obj = {
        "status": 1,
        "data": {}
    };

    var a = document.createElement('a');
    a.href = url;

    // domain of url; www.youtube.com
    var hostname = a["hostname"];
    var domain_type = 0;
    var video_id = "";

    if (hostname == "www.youtube.com" || hostname == "youtube.com" || hostname == "m.youtube.com") {
        // For youtube
        // https://www.youtube.com/watch?v=AIIFefGVVy0
        var regex_for_youtube = /^.*\?v=([^&]+).*$/g;
        video_id = regex_for_youtube.exec(a.search);

        if (video_id && video_id.length > 1) {
            // ["?v=VirrBI8bmHEasdasd&asdasd", "VirrBI8bmHEasdasd", index: 0, input: "?v=VirrBI8bmHEasdasd&asdasd"]
            video_id = video_id[1];
        }
        else {
            // Unsupported url
            return_obj["status"] = 3;
            return return_obj;
        }

        // Set domain type
        domain_type = 0;
    }
    else if (hostname == "vimeo.com" || hostname == "www.vimeo.com" || hostname == "m.vimeo.com") {
        // For vimeo
        // http://vimeo.com/47327253

        var regex_for_vimeo = /^.*\/([0-9]+).*$/g;
        video_id = regex_for_vimeo.exec(a.pathname);
        if (video_id && video_id.length > 1) {
            // ["?v=VirrBI8bmHEasdasd&asdasd", "VirrBI8bmHEasdasd", index: 0, input: "?v=VirrBI8bmHEasdasd&asdasd"]
            video_id = video_id[1];
        }
        else {
            // Unsupported url
            return_obj["status"] = 3;
            return return_obj;
        }

        // Set domain type
        domain_type = 1;
    }

    else{
        // Unsupported domain
        return_obj["status"] = 2;
        return return_obj;
    }

    return_obj["status"] = 0;
    return_obj["data"]["domain_type"] = domain_type;
    return_obj["data"]["hostname"] = hostname;
    return_obj["data"]["video_id"] = video_id;
    return return_obj
}

function create_video_iframe(url_obj) {
    var iframe_html = "";
    if(url_obj["domain_type"] == 0) {
        iframe_html = '<iframe width="60%" height="315" ' +
                      'src="http://www.youtube.com/embed/' + url_obj["video_id"] +
                      '?autoplay=1&loop=1&playlist=' + url_obj["video_id"] + '"' +
                      'frameborder="0" allowfullscreen></iframe>​';
    }
    else if (url_obj["domain_type"] == 1) {
        iframe_html = '<iframe width="70%" height="315" ' +
                      'src="http://player.vimeo.com/video/' + url_obj["video_id"] +
                      '?title=0&amp;byline=0&amp;portrait=0&amp;' +
                      'autoplay=1&amp;loop=1&amp;autopause=0&amp;color=fdea2e"></iframe>';
    }
    $("#video-part").html(iframe_html);
}

function tekrarla() {var url = $("#video-url").val();

    if( validate_url(url) ) {
        var url_obj = parse_url(url);
        console.log(url_obj["data"]);
        if (url_obj["status"] == 0) {
            create_video_iframe(url_obj["data"]);
            getVideo(url_obj["data"]["video_id"]);
        }
        else if (url_obj["status"] == 1) {
            alert(getText("Unknown problem"));
        }
        else if (url_obj["status"] == 2) {
            alert(getText("Unsupported domain"));
        }
        else if (url_obj["status"] == 3) {
            alert(getText("Unsupported url"));
        }
    }
    else {
        alert(getText("It is not a valid url"));
    }
}

jQuery(document).ready(function($) {
    $("#repeat-button").click(function () {
        tekrarla();
    });

    $("#video-url").keydown(function (e){
        if(e.keyCode == 13){
            tekrarla();
        }
    });
});