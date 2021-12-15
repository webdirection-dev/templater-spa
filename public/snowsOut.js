window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btn = document.getElementById('stopAnimation')
    const garland = document.getElementById('garland')
    const newYear = document.getElementById('newYear')

    console.log(newYear)

    let arr = null;
    let flagGarland = true;

    window.addEventListener('mouseover', () => {
        const elemsSnow = document.getElementsByClassName('withSnow')

        arr = elemsSnow
    });

    btn.addEventListener('click', () => {
        flagGarland = !flagGarland;

        for (let i of arr) {
            if (i.classList.contains('hide')) {
                i.classList.remove('hide');
                i.classList.add('showSnow');
            } else {
                i.classList.remove('showSnow');
                i.classList.add('hide');
            }
        }

        if (flagGarland) {
            garland.style.display = 'block'
            newYear.style.display = 'block'
        } else {
            garland.style.display = 'none'
            newYear.style.display = 'none'
        }
    })

})