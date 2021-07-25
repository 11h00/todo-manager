<?php
    if (isset($_POST)){
        if (isset($_POST["taskname"])){
            $task = json_decode(file_get_contents("task.json"), true);
            array_push($task["tasks"], ["name" => $_POST["taskname"], "id" => count($task["tasks"] + 1)]);
            $task = json_encode($task);
            file_put_contents("task.json", $task);
        }
    }
?>