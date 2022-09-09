export class Notify {
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
        span.animate(slideDown, { duration: 199 });
        setTimeout(() => {
            span.animate(slideUp, { duration: interval - 199 })
        }, interval - 200)

        setTimeout(() => {
            span.remove()
        }, interval)
    }
}