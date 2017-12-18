function animaReloj(): void {
    let ahora: Date = new Date()
    let segundos = ahora.getSeconds()
    if (segundosAnteriores !== segundos) {
        segundosAnteriores = segundos
        let minutos = ahora.getMinutes()
        let horas = ahora.getHours() % 12
        reloj.style.setProperty('--segundoAng', (6 * segundos + 270) % 360 + 'deg')
        minutos += segundos / 60
        reloj.style.setProperty('--minutoAng', (6 * minutos + 270) % 360 + 'deg')
        horas += minutos / 60
        reloj.style.setProperty('--horaAng', (30 * horas + 270) % 360 + 'deg')
    }
    requestAnimationFrame(animaReloj)
}

let segundosAnteriores = 61
let reloj = document.getElementById('reloj')
requestAnimationFrame(animaReloj)
