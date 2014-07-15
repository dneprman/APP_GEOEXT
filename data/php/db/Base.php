<?php
/**
 * Created by PhpStorm.
 * User: Dmitry
 * Date: 19.06.14
 * Time: 20:54
 */

require_once 'Connection.php';

abstract class Base {

    protected $id = null;
    protected  $database = null;
    protected  $table = null;

    public function __construct(array $options=null, PDO $database = null) {
    if (count($options))
        $this->setOptions($options);

    $this->config['adapter'] = "pgsql";
    $this->config['hostname'] = "192.168.72.135";
    $this->config['dbname'] = "agro_new";
    $this->config['user'] = "postgres";
    $this->config['password'] = "postgres";

    $connection = new Connection();

    $this->database = $connection->getConnection($this->config);

    if(method_exists($this, $_GET['action'])){
        call_user_func(array($this,$_GET['action']));
    }
}

    public function setOptions(array $options) {
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods))
                $this->$method($value);
        }
        return $this;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        if (!is_null($this->id))
            throw new \Exception('ID nao pode ser alterado');
        $this->id = (int) $id;
    }

    public function getTable() {
        return $this->table;
    }

    public function getDb() {
        return $this->database;
    }

    public function save() {
        if ($this->id)
            return $this->update();
        else
            return $this->insert();
    }

    public function find($id) {
        $db = $this->getDb();
        $stm = $db->prepare("SELECT * FROM " . $this->getTable() . ' WHERE id=:id');
        $stm->bindValue(':id', $id);
        $stm->execute();
        return $stm->fetch(PDO::FETCH_ASSOC);
    }

    public function fetchAll() {

        $start = $_POST['start'];
        $limit = $_POST['limit'];

        //$sort = $_POST['sort'] ? $_POST['sort'] : 'name';
        //$dir = $_POST['dir']? $_POST['dir'] : 'ASC';
        $sort = $_POST['sort'];
        $dir = $_POST['dir'];
        $order = $sort . ' ' . $dir;

        //echo "sort = " . $sort. " dir = " . $dir. " order = ". $order . "  ";

        $db = $this->getDb();

        //$sql = "SELECT * FROM " . $this->getTable();
        //$sql = "SELECT * FROM " . $this->getTable() . " ORDER BY :order";
        $sql = "SELECT * FROM " . $this->getTable() . " ORDER BY cadnum ASC"; //Сортировка прописана жестко

        if($start !== null && $start !== '' && $limit !== null && $limit !== ''){
            //$sql .= " LIMIT " . $start . " , " . $limit; //MSSQL
            $sql .= " LIMIT " . $limit . " OFFSET " . $start; //PGSQL
        }

        $stm = $db->prepare($sql);
        //$stm->bindValue(":order", $order);
        $stm->execute();

        $sql = "SELECT COUNT(*) AS total FROM " . $this->getTable();
        $total = $db->query($sql)->fetch();

        echo json_encode(array(
            "data" => $stm->fetchAll(\PDO::FETCH_ASSOC),
            "success" => true,
            "total" => $total['total']
        ));
    }

    public function delete() {

        $arrUsuarios = json_decode($_POST['data']);

        if (is_array($arrUsuarios)) {

            foreach ($arrUsuarios as $usuario) {

                $id = $usuario->id;

                $db = $this->getDb();
                $stm = $db->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
                $stm->bindValue(":id", $id);
                $usuarioExcluido = $stm->execute();

                if (!$usuarioExcluido)
                    break;
            }
        }else {

            $id = $arrUsuarios->id;

            $db = $this->getDb();
            $stm = $db->prepare("DELETE FROM " . $this->table . " WHERE id=:id");
            $stm->bindValue(":id", $id);
            $usuarioExcluido = $stm->execute();
        }

        $msg = $usuarioExcluido ? 'Registro(s) excluído(s) com sucesso' : 'Erro ao excluir, tente novamente.';

        echo json_encode(array(
            "success" => $usuarioExcluido,
            "message" => $msg
        ));
    }
}

?>