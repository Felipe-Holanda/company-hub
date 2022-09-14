export class Notify {

    static slideDown = [{ transform: 'translateY(-100em)' }, { transform: 'translateY(0em)' }]
    static slideUp = [{ transform: 'translateY(0em)' }, { transform: 'translateY(-100em)' }]

    static now(type, interval, message) {
        const body = document.querySelector('body')
        const span = document.createElement('span')

        span.id = 'notify'
        span.innerText = message

        if (type == true) {
            span.style.backgroundColor = 'green'
        } else if (type == false) {
            span.style.backgroundColor = 'red'
        } else {
            span.style.backgroundColor = 'orange'
        }

        body.append(span);
        span.animate(this.slideDown, { duration: 2300, iterations: 1 });
        setTimeout(() => {
            span.animate(this.slideUp, { duration: interval - 199 })
        }, interval + (interval / 2) - 200)

        setTimeout(() => {
            span.remove()
        }, interval + (interval / 2))
    }
}