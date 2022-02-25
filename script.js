/**
 * Explicar conversión de cualquier base a decimal usando JavaScript
 * Hecho con Vue.JS 2 + Bulma CSS
 * @author parzibyte
 */

const BINARIO = 2, OCTAL = 8, HEXADECIMAL = 16;
Vue.use(Toasted);
const app = new Vue({
    el: '#app',
    data: () => ({
        bases: [BINARIO, OCTAL, HEXADECIMAL],
        baseSeleccionada: BINARIO,
        numeroParaConvertir: null,
        operaciones: [
            [],
            [],
            [],
            [],
        ],
        numeroDecimal: null,
    }),
    mounted() {
        this.enfocarInput();
    },
    methods: {
        enfocarInput() {
            this.$refs.inputPrincipal.focus();
        },
        obtenerEquivalencia(digito) {
            if (this.baseSeleccionada === BINARIO || this.baseSeleccionada === OCTAL) {
                return parseInt(digito);
            }
            if (this.baseSeleccionada === HEXADECIMAL) {
                return {
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
                }[digito];
            };
        },
        resetear() {
            this.operaciones = [
                [],
                [],
                [],
                [],
            ];
            this.numeroDecimal = null;
        },
        esNumeroValido(numero) {
            if (this.baseSeleccionada === BINARIO) {
                return numero.split("").every(digito => "01".includes(digito));
            }

            if (this.baseSeleccionada === OCTAL) {
                return numero.split("").every(digito => "01234567".includes(digito));
            }
            if (this.baseSeleccionada === HEXADECIMAL) {
                return numero.split("").every(digito => "0123456789ABCDEF".includes(digito));
            }
        },
        calcular() {
            this.resetear();
            if (!this.numeroParaConvertir) {
                return;
            }
            let numeroParaConvertir = this.numeroParaConvertir.toUpperCase();
            if (!this.esNumeroValido(numeroParaConvertir)) {
                return this.$toasted.show("Número inválido", {
                    duration: 1500,
                    theme: "bubble",
                    position: "bottom-center",
                });
            }
            const longitudDeLaCadena = numeroParaConvertir.length;
            let potencia = 0;
            let decimal = 0;
            for (let indice = longitudDeLaCadena - 1; indice >= 0; indice--) {

                let digitoActual = numeroParaConvertir.charAt(indice).toUpperCase();


                let equivalencia = this.obtenerEquivalencia(digitoActual);
                // Elevar la base seleccionada a la potencia 0, luego a la 1 y así
                // (este valor es dado por la potencia que vamos incrementando en el ciclo)
                let multiplicador = Math.pow(this.baseSeleccionada, potencia);


                this.operaciones[0].push(`${digitoActual} x (${this.baseSeleccionada} ^ ${potencia})`);
                this.operaciones[1].push(`${equivalencia} x (${this.baseSeleccionada} ^ ${potencia})`);
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
        numeroParaConvertir() {
            this.calcular();
        },
        baseSeleccionada() {
            this.enfocarInput();
        }
    },
});