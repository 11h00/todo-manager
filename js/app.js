let userdata = window.localStorage
let task_id = document.getElementById("task_id");
let task_name = document.getElementById("task_name");
let timeout_id = 0;
let interval_id = 0;
let [username, id] = ["", 0] //matashi username if he is logged
let confirm_snd = new Audio("sounds/confirm.ogg")
let already_donz = new Audio("sounds/alreadydonz.mp3")
let cursor_snd = new Audio("sounds/cursor.ogg");
let back_snd = new Audio("sounds/back.ogg");
let random_sound = new Audio("sounds/reandomization.mp3")
random_sound.preservesPitch = false;

if (userdata.getItem("is_donz") == "1"){
    el.setAttribute("inactive", "true")
    document.getElementById("task_choosing").removeAttribute("inactive")
    task_name.innerText = selected.task;
    task_id.innerText = selected.id
}

let [tasklist, selected] = [{}, {}];

let start_randomizing = () => {
    
    document.querySelectorAll("section").forEach(el => {
        el.setAttribute("inactive", "true")
    })
    timeout_id = setTimeout(() => {
        random_sound.play()
        document.getElementById("task_choosing").removeAttribute("inactive")
    }, 3000);
    interval_id = setInterval(() => {
        selected = tasklist.tasks[Math.floor(Math.random() * tasklist.tasks.length)];
        task_name.innerText = selected.task;
        task_id.innerText = selected.id
    }, 60);
    setTimeout(() => {
        document.querySelector("button[ac='back']").setAttribute("inactive", "true")
        if (selected.id == 0){
            random_sound.playbackRate = .82
            task_name.style.color = "darkgray"
            task_id.style.color = "darkgray"
        }
        if (selected.id == 9 || selected.id == 16 || selected.id == 17 || selected.id == 3 || selected.id == 2 || selected.id == -1 || selected.id == 1 || selected.id == 21){
            document.querySelector("button[ac='back']").removeAttribute("inactive")
            already_donz.cloneNode(true).play()
            task_id.style.color = "#00da39";
            task_name.style.color = "#00da39";
            setTimeout(() => {
                back_snd.play()
                main_screen.removeAttribute("inactive");
                task_choosing.setAttribute("inactive", "true")
                document.querySelector("button[ac='back']").setAttribute("inactive", "true")
                task_id.style.color = "gray";
                task_name.style.color = "gray";
            }, 5000)
        }
        clearInterval(interval_id)
    }, 12940);
    
}
let refresh_button = () => {
    document.querySelectorAll("button.main_button").forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor_snd.cloneNode(1).play()
        })
        el.addEventListener("click", (item) => {
            
            switch(item.currentTarget.attributes.ac.value){
                case "tsklst":
                    confirm_snd.cloneNode(true).play()
                    document.getElementById('main_screen').setAttribute("inactive", "true")
                    document.querySelector("button[ac='back']").removeAttribute("inactive")
                    create_screen.removeAttribute("inactive")
                    break;
                case "rand":
                    confirm_snd.cloneNode(true).play()
                    document.querySelector("button[ac='back']").removeAttribute("inactive")
                    start_randomizing();
                    break;
                case "back":
                    back_snd.cloneNode(true).play()
                    clearInterval(interval_id)
                    clearTimeout(timeout_id)
                    document.getElementById('create_screen').setAttribute("inactive", "true")
                    document.getElementById('task_choosing').setAttribute("inactive", "true")
                    main_screen.removeAttribute("inactive");
                    document.querySelector("button[ac='back']").setAttribute("inactive", "true")
                break;
                default: 
                    alert("Warning, this button is not bount to a existing function.");
                    break;
            }
        })
    })
}
document.onreadystatechange = function(){
    if (this.readyState == "complete"){
        refresh_button()
        fetch("task.json")
        .then(eh => eh.text())
        .then(data => {
            tasklist = JSON.parse(data)
        })
        .catch(rip => {
            alert("oops,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, an error ecuted")
        })
    }
}