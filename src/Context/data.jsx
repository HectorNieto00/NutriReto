import Pizza from './img/pizza.png';
import Manzana from './img/manzana.png';
import Hamburguesa from './img/hamburguesa.png';
import Ensalada from './img/ensalada.png';
import Sandwich from './img/sandwich.png';
import HotDog from './img/hot-dog.png';
import Pasta from './img/pasta.png';
import Pescado from './img/pescado.png';
import Papas from './img/fries.png';
import Yogur from './img/yogurt.png';

const useData = () => {
    const food = [
        {
            name: "Pizza",
            description: "La pizza es un alimento NO saludable",
            img: {Pizza},
            calories: 266,
            value: false
        },
        {
            name: "Manzana",
            description: "La manzana es un alimento saludable",
            img: {Manzana},
            calories: 52,
            value: true
        },
        {
            name: "Hamburguesa",
            description: "La hamburguesa es un alimento NO saludable",
            img: {Hamburguesa},
            calories: 354,
            value: false
        },
        {
            name: "Ensalada",
            description: "La ensalada es un alimento saludable",
            img: {Ensalada},
            calories: 120,
            value: true
        },
        {
            name: "Sandwich",
            description: "El sándwich de pollo es un alimento saludable",
            img: {Sandwich},
            calories: 280,
            value: true
        },
        {
            name: "HotDog",
            description: "El hot dog es un alimento NO saludable",
            img: {HotDog},
            calories: 320,
            value: false
        },
        {
            name: "Papas",
            description: "Las papas fritas son un alimento NO saludable",
            img: {Papas},
            calories: 365,
            value: false
        },
        {
            name: "Yogur",
            description: "El yogur natural es un alimento saludable",
            img: {Yogur},
            calories: 150,
            value: true
        },
        {
            name: "Pasta",
            description: "La pasta es un alimento NO saludable",
            img: {Pasta},
            calories: 420,
            value: false
        },
        {
            name: "Pescado",
            description: "El pescado es un alimento saludable",
            img: {Pescado},
            calories: 200,
            value: true
        },
    ]
    return { food };
}

export {useData};