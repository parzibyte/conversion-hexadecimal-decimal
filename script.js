/**
 * Explicar conversión hexadecimal a decimal usando JavaScript
 * Hecho con Vue.JS 2 + Bulma CSS
 * @author parzibyte
 */
const equivalencias = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
};
const BASE = 16;
/**
 * 
 * Comprobar si una cadena es un número hexadecimal usando
 * expresiones regulares
 * @author parzibyte
 * Visita: parzibyte.me
 */

const esHexadecimal = numeroHexadecimal => /^[0-9A-F]+$/ig.test(numeroHexadecimal);
const app = new Vue({
    el: '#app',
    data: () => ({
        operaciones: [
            [],
            [],
            [],
            [],
        ],
        numeroHexadecimal: "",
        numeroDecimal: null,
    }),
    mounted() {
        this.$refs.inputPrincipal.focus();
    },
    methods: {
        resetear() {
            this.operaciones = [
                [],
                [],
                [],
                [],
            ];
            this.numeroDecimal = null;
        },
        calcular() {
            this.resetear();
            let numeroHexadecimal = this.numeroHexadecimal;
            if (!esHexadecimal(numeroHexadecimal)) return;
            const longitudDeLaCadena = numeroHexadecimal.length;
            let potencia = 0;
            let decimal = 0;
            for (let indice = longitudDeLaCadena - 1; indice >= 0; indice--) {

                let letra = numeroHexadecimal.charAt(indice).toUpperCase();


                // Tomar el valor entero de la letra. Por ejemplo A=10
                let equivalencia = equivalencias[letra];
                // Elevar el 16 a la potencia 0, luego a la 1 y así
                // (este valor es dado por la potencia que vamos incrementando en el ciclo)
                let multiplicador = Math.pow(BASE, potencia);


                this.operaciones[0].push(`${letra} x (${BASE} ^ ${potencia})`);
                this.operaciones[1].push(`${equivalencia} x (${BASE} ^ ${potencia})`);
                this.operaciones[2].push(`${equivalencia} x ${multiplicador}`);


                potencia++;

                let valor = multiplicador * equivalencia

                // Y el resultado lo sumamos
                decimal += valor;
                this.operaciones[3].push(valor.toString());
            }
            // Al final girar los arreglos, únicamente para simular las operaciones de izquierda a derecha
            this.operaciones.forEach(operaciones => operaciones.reverse());
            this.numeroDecimal = decimal;
        }
    },
    watch: {
        numeroHexadecimal() {
            this.calcular();
        }
    },
});