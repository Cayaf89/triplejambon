<?php
require_once '../ressources/mypdo.include.php' ;



class Image{

	private $id = null;
	private $name = null;
	private $author = null;
	private $content = null;
	private $type = null;





    public static function createFromId($id) {
        try{
            $pdo = myPDO::GetInstance();
            $stmt = $pdo->prepare(<<<SQL
                SELECT *
                FROM image
                WHERE id = ?
SQL
            );

            $stmt->bindValue(1,$id);
            $stmt->execute();

            $stmt->setFetchMode(PDO::FETCH_CLASS, 'Image');
            if(($res = $stmt->fetch())!== false){

                return $res;
            }else{
                throw new Exception("ID Inexistant");
            }                  
        }catch(Exception $e){
            echo $e->getMessage();
        }
    
	}

	 public static function createFromName($name) {
        try{
            $pdo = myPDO::GetInstance();
            $stmt = $pdo->prepare(<<<SQL
                SELECT *
                FROM image
                WHERE name = ?
SQL
            );

            $stmt->bindValue(1,$name);
            $stmt->execute();

            $stmt->setFetchMode(PDO::FETCH_CLASS, 'Image');
            if(($res = $stmt->fetch())!== false){
                return $res;
            }else{
                throw new Exception("Nom Image Inexistant");
            }                  
        }catch(Exception $e){
            echo $e->getMessage();
        }
    
	}

	public function getName(){
		return $this->name;
	}

	public function getAuthor(){
		return $this->author;
	}

	public function getContent(){

		return $this->content;
	}


	public function getType(){
		return $this->type;
	}

	public function getId(){
		return $this->id;
	}


	public function toHTML(){

		return (<<<HTML
		<img src="/imageTest/img.show.php?id={$this->id}" title="$this->name " alt="img from  $this->author ">
HTML
); 

	}



}