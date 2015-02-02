# tekrar.la
Clientside Youtube,Vimeo Infinite Looper


This is one page site for infinite video looper for youtube and vimeo.
"tekrar.la" means "repeat it" in Turkish.


Bootstrap template Legend (http://dzyngiri.com/demo/legend/) is used for visuality.


Video loops is created with video id in youtube link like;

    https://www.youtube.com/watch?v=MZS5EYAidrQ ; MZS5EYAidrQ is video id.

    http://vimeo.com/79916216 ; 79916216 is video id.

After that I created an iframe with playlist. You can look tekrarla.js for details of it.


I implement my own localization method named getText in language.js. It get all dom object which has class named "text-div" and translate it with languages object in languages.js. Browser language is used for this operation.