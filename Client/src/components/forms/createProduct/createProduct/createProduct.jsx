import styles from "./createProduct.module.css"
import Input from "../../../inputs/input.jsx"
import {PiPencilSimpleLineFill} from "react-icons/pi";
import {IoMdPricetag, IoMdPricetags} from "react-icons/io";
import {BiSolidOffer} from "react-icons/bi";
import {FaPercentage} from "react-icons/fa";
import {FaBoxesStacked, FaBarcode} from "react-icons/fa6";
import {HiMinusCircle} from "react-icons/hi";
import {LiaFileInvoiceDollarSolid} from "react-icons/lia";
import CheckboxInput from "../../../inputs/checkboxInput/checkboxInput.jsx";
import {MdPlaylistAddCheck, MdGppGood} from "react-icons/md";
import {useState} from "react";
import axios from "axios";
import {useContext} from "react";
import {ModalContext} from "../../../modal/modal.jsx";

const CreateProductForm = () => {
    const InitialState = {
        name: '',
        category: '',
        cost: null,
        finalPrice: null,
        discount: null,
        profitPercentage: null,
        stock: 0,
        allowNegativeStock: true,
        trackStock: true,
        minimumStock: 0,
        enabled: true,
        notesDescription: '',
        taxes: null,
        barcode: '',
    };
    const [formData, setFormData] = useState(InitialState);

    const closeModal = useContext(ModalContext)

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/products", formData)
        if (res.status === 200) {
            window.alert(`se creo el producto ${res.data.name}`)
            setFormData(InitialState)
        }
        closeModal()
    };

    const inputProps = [
        {
            id: "productNameInput",
            name: "name",
            placeholder: "Nombre del producto",
            required: true,
            icon: <PiPencilSimpleLineFill className={styles.icon}/>
        },
        {
            id: "productCategoryInput",
            name: "category",
            placeholder: "Categoría",
            required: true,
            icon: <PiPencilSimpleLineFill className={styles.icon}/>
        },
        {
            id: "productBarCodeInput",
            name: "barcode",
            placeholder: "Código de barras",
            required: true,
            icon: <FaBarcode className={styles.icon}/>
        },
        {
            id: "productCostInput",
            name: "cost",
            placeholder: "Costo",
            required: true,
            icon: <IoMdPricetag className={styles.icon}/>
        },
        {
            id: "productFinalPriceInput",
            name: "finalPrice",
            placeholder: "Precio final",
            required: true,
            icon: <IoMdPricetags className={styles.icon}/>
        },
        {
            id: "productDiscountInput",
            name: "discount",
            placeholder: "Descuento fijo",
            required: true,
            icon: <BiSolidOffer className={styles.icon}/>
        },
        {
            id: "productProfitInput",
            name: "profitPercentage",
            placeholder: "Porcentaje de ganancia",
            required: true,
            icon: <FaPercentage className={styles.icon}/>
        },
        {
            id: "productStockInput",
            name: "stock",
            placeholder: "Cantidad de unidades (stock en unidades)",
            required: true,
            icon: <FaBoxesStacked className={styles.icon}/>
        },
        {
            id: "productCommentInput",
            name: "notesDescription",
            placeholder: "Anotaciones / Descripción",
            required: false,
            icon: <PiPencilSimpleLineFill className={styles.icon}/>
        },
        {
            id: "productTaxesInput",
            name: "taxes",
            placeholder: "Impuestos (porcentaje total sobre el costo)",
            required: false,
            icon: <LiaFileInvoiceDollarSolid className={styles.icon}/>
        },
    ];

    const checkboxProps = [
        {
            id: "allowNegativeStockInput",
            name: "allowNegativeStock",
            label: "Permitir stock negativo",
            value: formData.allowNegativeStock,
            icon: <HiMinusCircle className={styles.icon}/>
        },
        {
            id: "allowTrackStockInput",
            name: "trackStock",
            label: "Llevar registro del stock",
            value: formData.trackStock,
            icon: <MdPlaylistAddCheck className={styles.icon}/>
        },
        {
            id: "enableProductInput",
            name: "enabled",
            label: "Producto disponible para la venta",
            value: formData.enabled,
            icon: <MdGppGood className={styles.icon}/>
        },
    ];

    return (
        <div className={styles.createProductContainer}>
            <h2 className={styles.title}>Crear producto</h2>
            <form onSubmit={handleSubmit}>

                {inputProps.map((input, index) => (
                    <Input
                        key={index}
                        id={input.id}
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        required={input.required}
                        value={formData[input.name]}
                        handleChange={handleChange}
                    >
                        {input.icon}
                    </Input>
                ))}

                {checkboxProps.map((checkbox, index) => (
                    <CheckboxInput
                        key={index}
                        id={checkbox.id}
                        name={checkbox.name}
                        label={checkbox.label}
                        value={checkbox.value}
                        handleChange={handleChange}
                    >
                        {checkbox.icon}
                    </CheckboxInput>
                ))}

                <button type={"submit"}> crear producto</button>
            </form>
        </div>
    )
}
export default CreateProductForm