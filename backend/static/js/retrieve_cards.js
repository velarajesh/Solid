function filterSelection(cat, req) {
    const query_filter = `/get_cards?cat=${cat}&type=${req}`
    for (let x = 0; x < id_index; x++) {
        document.getElementById(x.toString()).remove()
    }
    render_cards(query_filter)
}

const row = document.getElementById("root")
let id_index = 0

function render_cards(query) {
    id_index = 0
    $.get(query, function (data, status) {
        if (status === 'success') {
            data.forEach(item => {

                const card = document.createElement('div')
                card.id = id_index.toString()
                id_index += 1
                card.setAttribute('class', 'card bg-secondary text-white mb-4')

                const card_header = document.createElement('div')
                card_header.setAttribute('class', 'card-header')
                card_header.setAttribute('style', "font-size:17px")
                card_header.textContent = `${item.name}- ${item.data.title}`


                const card_body = document.createElement('div')
                card_body.setAttribute('class', 'card-body')
                card_body.setAttribute('style', "font-size:15px")
                card_body.textContent = item.data.description

                const card_footer = document.createElement('div')
                card_footer.setAttribute('class', 'card-footer d-flex align-items-center justify-content-between')

                const link = document.createElement('a')
                link.setAttribute('class', "small text-white stretched-link")
                link.onclick = () => {
                    assign_card(item.uid, card.id)
                }
                link.textContent = `Accept`


                row.appendChild(card)
                card.appendChild(card_header)
                card.appendChild(card_body)
                card_footer.appendChild(link)
                card.appendChild(card_footer)


            })
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            row.appendChild(errorMessage);
        }
    })

    function assign_card(uid, id) {
        console.log(uid)
        $.ajax({
            type: "POST",
            url: "/take_card",
            data: JSON.stringify({uid: uid}),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (status === 'success') {
                    alert(`You have chosen to fulfill ${data.name}'s service!`)
                    setTimeout(() => {
                        document.getElementById(id).remove()
                    }, 2000)
                }
            }
        })

    }
}

