    let modal = document.querySelectorAll('.modal')
    let forms = document.querySelectorAll('.needs-validation')
    let closebtn = document.querySelectorAll('.close')
    let fieldBoyName = document.querySelector('#boy_name')
    let fieldBoyInfor = document.querySelector("#boy_infor")
    let fieldGirlName = document.querySelector('#girl_name')
    let fieldGirlInfor = document.querySelector("#girl_infor")
    let dayItem = document.querySelector('.dayItem')
    let imgBoy = document.querySelector('.img_boy')
    let imgGirl = document.querySelector('.img_girl')
    let heart = document.querySelector(".heart")
    let personInfor
    if(!localStorage.getItem("personInfor")) {
        heart.click()
    }
    else render()
    forms.forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
        }
        else {
            let inputs = form.querySelectorAll('.form-group>input')
            let boyname = inputs[0].value
            let boyinfor = inputs[1].value
            let girlname = inputs[2].value
            let girlinfor = inputs[3].value
            let date1 = new Date()
            let date2 = new Date(document.querySelector('.inputDay').value)
            date2.setDate(date2.getDate() + 1)
            let days = Math.ceil(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)))
            updateTextClient(boyname,boyinfor,girlname,girlinfor,days,date2)

            closebtn.forEach(function(btn) {
                btn.click()
            })
        }
        form.classList.add('was-validated');
      });
    });

    function count(val) {
        let i = 0
        let interval = setInterval(function(){
            dayItem.innerText = `${i}`
            i++;
            if(i == val) {
                clearInterval(interval)
                dayItem.innerText = `${i} days`
            }
        },0.01)
    }

    function updateImageClient(className,e) {
        if (e.files && e.files[0]) {
            var reader = new FileReader();
            reader.onload = function(x) {
                document.querySelector(className).src = x.target.result;
                localStorage.setItem(className,x.target.result);
            };
            reader.readAsDataURL(e.files[0]);
        }
    }

    function updateTextClient(boyname,boyinfor,girlname,girlinfor,days,thisDay) {
        fieldBoyName.innerText = boyname
        fieldBoyInfor.innerText = boyinfor
        fieldGirlName.innerText = girlname
        fieldGirlInfor.innerText = girlinfor
        count(days)
        let personInfor = [boyname,boyinfor,girlname,girlinfor,days]
        localStorage.setItem("personInfor",JSON.stringify(personInfor))
        localStorage.setItem("thisDay",JSON.stringify(thisDay))
    }

    function render() {
        personInfor = JSON.parse(localStorage.getItem("personInfor"))
        fieldBoyName.innerText = personInfor[0]
        fieldBoyInfor.innerText = personInfor[1]
        fieldGirlName.innerText = personInfor[2]
        fieldGirlInfor.innerText = personInfor[3]
        dayItem.innerText = personInfor[4] + " days"
        let img1 = localStorage.getItem('.img_boy')
        let img2 = localStorage.getItem('.img_girl')
        if(img1) {
            imgBoy.src = img1
        }
        if(img2) {
            imgGirl.src = img2
        }
    }

    function autoUpdateDay() {
        let thisDay = localStorage.getItem("thisDay")
        console.log(thisDay)
        if(thisDay) {
            let date1 = new Date(JSON.parse(thisDay))
            let date2 = new Date()
            let newDays = Math.ceil(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)))
            if(newDays > 0) {
                let boyname = fieldBoyName.innerText
                let boyinfor = fieldBoyInfor.innerText
                let girlname = fieldGirlName.innerText
                let girlinfor = fieldGirlInfor.innerText
                dayItem.innerText = newDays + " days"
                personInfor = [boyname,boyinfor,girlname,girlinfor,newDays]
                localStorage.setItem("personInfor",JSON.stringify(personInfor))
            }
        }
    }
    autoUpdateDay()