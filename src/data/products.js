import turmeric from '../assets/turmeric.png'
import chili from '../assets/chili.png'
import cumin from '../assets/cumin.png'


export const products = [
    {
        id: 'turmeric-powder',
        name: 'Premium Turmeric Powder',
        category: 'Ground Spices',
        shortDesc: 'High curcumin content turmeric powder sourced directly from the finest farms in India.',
        description: 'Our Premium Turmeric Powder is known for its deep golden color and high curcuminoid content. It is processed under hygienic conditions to preserve its natural aroma and medicinal properties.',
        image: turmeric,
        specs: {
            'HS Code': '09103020',
            'Purity': '99% Min',
            'Curcumin Content': '3% - 5% (Customizable)',
            'Moisture': '10% Max',
            'Starch Content': 'Negative',
            'Total Ash': '7% Max',
            'Salmonella': 'Absent in 25g'
        },
        packaging: ['25kg PP Bags', '50kg Jute Bags', 'Custom Consumer Packaging']
    },
    {
        id: 'red-chili-powder',
        name: 'Stemless Red Chili Powder',
        category: 'Ground Spices',
        shortDesc: 'Vibrant red, spicy and aromatic chili powder made from sun-dried premium chilies.',
        description: 'Sourced from the heart of Guntur, our Red Chili Powder is characterized by its intense heat and brilliant red color. We offer various heat levels (SHU) to meet different global requirements.',
        image: chili,
        specs: {
            'HS Code': '09042211',
            'Purity': '98% Min',
            'Pungency (Heat)': '25,000 - 45,000 SHU',
            'Color Value': '100 - 150 ASTA',
            'Moisture': '11% Max',
            'Total Ash': '8% Max',
            'Aflatoxin': 'Negative/B1+B2+G1+G2 < 5ppb'
        },
        packaging: ['10kg Cartons', '25kg Kraft Paper Bags', 'Vaccum Packing']
    },
    {
        id: 'cumin-seeds',
        name: 'Bold Cumin Seeds',
        category: 'Whole Spices',
        shortDesc: 'Bold and aromatic cumin seeds, meticulously cleaned and processed for global standards.',
        description: 'Our Cumin Seeds are selected for their high volatile oil content and bold size. We use Singapore Quality (99%) and Europe Quality (99.5% Machine Cleaned) standards.',
        image: cumin,
        specs: {
            'HS Code': '09093129',
            'Purity': '99% / 99.5% / 99.9% Min',
            'Admixture': '1% / 0.5% Max',
            'Volatile Oil': '2.5% Min',
            'Moisture': '9% Max',
            'Total Ash': '9.5% Max',
            'Color': 'Uniform Brownish Grey'
        },
        packaging: ['25kg Multi-wall Paper Bags', '50kg PP Bags']
    }
]

export const categories = ['All', 'Whole Spices', 'Ground Spices', 'Seeds', 'Dehydrated']
