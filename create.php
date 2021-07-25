<?php
    if (isset($_POST)){
        if (isset($_POST["taskname"])){
            $task = json_decode(file_get_contents("task.json"), true);
            print_r($task);
        }
    }
?>