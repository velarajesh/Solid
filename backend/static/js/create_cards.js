const row = document.getElementById('newrow')


request_json = {
    "name": "Bilbo Baggins",
    "type": "active",
    "taken": false
}
$.get("/get_cards?cat=food&type=serv", function (data, status) {
    if (status === 'success') {
        data.forEach(item => {
            const box = document.createElement("div")
            box.setAttribute('class', 'col-xl-3 col-md-6')


            const card = document.createElement('div')
            card.setAttribute('class', 'bg-primary text-white mb-4')


            const card_body = document.createElement('div')
            card_body.setAttribute('class', 'card-body')
            card_body.textContent = item.name

            const card_footer = document.createElement('div')
            card_footer.setAttribute('class', 'card-footer d-flex align-items-center justify-content-between')

            const link = document.createElement('a')
            link.setAttribute('class', "small text-white stretched-link")
            link.onclick = function () {
                assign_card(item.uid)
            }
            link.textContent = "Fulfill Request!"


            row.appendChild(box)
            box.appendChild(card)
            card.appendChild(card_body)
            card.appendChild(card_footer)
            card_footer.appendChild(link)


        })
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        row.appendChild(errorMessage);
    }
})

function assign_card(uid) {
    console.log(uid)
}