const userlabel = document.getElementById("username")
const solid_score_label = document.getElementById("solid_score")
$.get('/get_user', function (data, status) {
        if (status === 'success') {
            if(userlabel) {
                const name = document.createElement('div')
                name.setAttribute('style', "display:inline")
                name.textContent = "   " + data.name

                const usrimg = document.createElement('img')
                usrimg.setAttribute('src', data.img)
                usrimg.setAttribute('style', "display:inline")
                userlabel.appendChild(usrimg)
                userlabel.appendChild(name)
            }
            if(solid_score_label) {
                solid_score_label.textContent = data.solid_score
            }
        }
    }
)