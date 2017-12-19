let segundosAnteriores = 61
const reloj = document.getElementById('reloj')
requestAnimationFrame(animaReloj)

function animaReloj(): void {
    const ahora: Date = new Date()
    const segundos = ahora.getSeconds()
    if (segundosAnteriores !== segundos) {
        segundosAnteriores = segundos
        const minutos = ahora.getMinutes() + segundos / 60
        const horas = ahora.getHours() % 12 + minutos / 60
        reloj.style.setProperty('--segundoAng', (6 * segundos + 270) % 360 + 'deg')
        reloj.style.setProperty('--minutoAng', (6 * minutos + 270) % 360 + 'deg')
        reloj.style.setProperty('--horaAng', (30 * horas + 270) % 360 + 'deg')
    }
    requestAnimationFrame(animaReloj)
}
