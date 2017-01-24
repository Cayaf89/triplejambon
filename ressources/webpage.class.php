<?php

class WebPage {
    /**
     * @var string Texte compris entre <head> et </head>
     */
    private $head  = null ;
    /**
     * @var string Texte compris entre <title> et </title>
     */
    private $title = null ;
    /**
     * @var string Texte compris entre <body> et </body>
     */
    private $body  = null ;

    private $css = null;

    private static $BASICCSSALL = <<<CSS

        *{
            margin:0;
            padding: 0;
            box-sizing: border-box;
            font-size: 10px;
        }

CSS
    ;


    /**
     * Constructeur
     * @param string $title Titre de la page
     */
    public function __construct($title=null) {
        $this->title = $title;
    }

    /**
     * Protéger les caractères spéciaux pouvant dégrader la page Web
     * @param string $string La chaîne à protéger
     * @return string La chaîne protégée
     */
    public function escapeString($string) {
        return htmlentities($string);
    }

    /**
     * Affecter le titre de la page
     * @param string $title Le titre
     */
    public function setTitle($title) {
        $this->title = $title;
    }

    /**
     * Ajouter un contenu dans head
     * @param string $content Le contenu à ajouter
     * @return void
     */
    public function appendToHead($content) {
        $this->head .= $content;
    }


    public function addBasicCss(){
        $this->css .= self::$BASICCSSALL;
    }

    /**
     * Ajouter un contenu CSS dans head
     * @param string $css Le contenu CSS à ajouter
     * @return void
     */
    public function appendCss($cssA){
        $this->css.= $cssA;
    }

    /**
     * Ajouter l'URL d'un script CSS dans head
     * @param string $url L'URL du script CSS
     * @return void
     */
    public function appendCssUrl($url){
        $this->appendToHead(<<<HTML
    <link rel ="stylesheet" href="$url"/>

HTML
        );
    }

    /**
     * Ajouter un contenu JavaScript dans head
     * @param string $js Le contenu JavaScript à ajouter
     * @return void
     */
    public function appendJs($js) {
        $this->appendToHead(<<<HTML
    <script type='text/javascript'>
    {$js}
    </script>
HTML
        );
    }

    /**
     * Ajouter l'URL d'un script JavaScript dans head
     * @param string $url L'URL du script JavaScript
     * @return void
     */
    public function appendJsUrl($url) {
        $this->appendToHead(<<<js
        <script src="$url"></script>
        
js
        );
    }

    /**
     * Ajouter un contenu dans body
     * @param string $content Le contenu à ajouter
     * @return void
     */
    public function appendContent($content) {
        $this->body .= $content;
    }

    private function buildCss(){
        return <<<css
        <style type="text/css">
            {$this->css}
        </style>

css
        ;
    }


    /**
     * Produire la page Web complète
     * @return string
     */
    public function toHTML() {
        $this->appendToHead(self::buildCss());

        $html = <<<html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta author="Victor Ledoux">
        <title>$this->title</title>
        $this->head
    </head>
    <body>
        $this->body
    </body>
</html>
html;
        return $html;
    }
}
