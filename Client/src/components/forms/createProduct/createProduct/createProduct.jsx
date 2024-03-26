import styles from "./createProduct.module.css"
import Input from "../../../inputs/input.jsx"
import {PiPencilSimpleLineFill} from "react-icons/pi";
import {IoMdPricetag, IoMdPricetags} from "react-icons/io";
import {BiSolidOffer} from "react-icons/bi";
import {FaPercentage} from "react-icons/fa";
import {FaBoxesStacked} from "react-icons/fa6";
import {HiMinusCircle} from "react-icons/hi";
import {LiaFileInvoiceDollarSolid} from "react-icons/lia";
import {FaBarcode} from "react-icons/fa6";
import CheckboxInput from "../../../inputs/checkboxInput/checkboxInput.jsx";
import {MdPlaylistAddCheck} from "react-icons/md";
import {MdGppGood} from "react-icons/md";
import {useState, useEffect} from "react";

const CreateProductForm = () => {
    const InitialState = {
        name: '',
        category: '',
        cost: '',
        finalPrice: '',
        discount: '',
        profitPercentage: '',
        stock: '',
        allowNegativeStock: true,
        trackStock: true,
        minimumStock: 0,
        enabled: false,
        notesDescription: '',
        taxes: '',
        barcode: '',
    };
    const [formData, setFormData] = useState(InitialState);

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        console.log(e.target.name)
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        console.log(formData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar el formData al backend o realizar cualquier otra acción con él
    };

    return (
        <div className={styles.createProductContainer}>
            <h2 className={styles.title}>Crear producto</h2>
            <form onSubmit={handleSubmit}>

                <Input id={"productNameInput"}
                       type={"string"}
                       name={"name"}
                       placeholder={"Nombre del producto"}
                       required={true}
                       value={formData.name}
                       handleChange={handleChange}>
                    <PiPencilSimpleLineFill height={30} width={30}/>
                </Input>

                <Input id={"productCategoryInput"}
                       type={"string"}
                       name={"category"}
                       placeholder={"Categoria"}
                       required={true}
                       value={formData.category}
                       handleChange={handleChange}>

                    <PiPencilSimpleLineFill height={30} width={30}/>
                </Input>


                <Input id={"productBarCodeInput"}
                       type={"string"}
                       name={"barcode"}
                       placeholder={"Codigo de barras"}
                       required={true}
                       value={formData.barcode}
                       handleChange={handleChange}>
                    <FaBarcode height={30} width={30}/>
                </Input>

                <Input id={"productCostInput"}
                       type={"number"}
                       name={"cost"}
                       placeholder={"Costo"}
                       required={true}
                       value={formData.cost}
                       handleChange={handleChange}>
                    <IoMdPricetag height={30} width={30}/>
                </Input>

                <Input id={"productFinalPriceInput"}
                       type={"number"}
                       name={"finalPrice"}
                       placeholder={"Precio final"}
                       required={true}
                       value={formData.finalPrice}
                       handleChange={handleChange}>
                    <IoMdPricetags height={20} width={20}/>
                </Input>

                <Input id={"productDiscountInput"}
                       type={"number"}
                       name={"discount"}
                       placeholder={"Descuento fijo"}
                       required={true}
                       value={formData.discount}
                       handleChange={handleChange}>
                    <BiSolidOffer height={20} width={20}/>

                </Input>

                <Input id={"productProfitInput"}
                       type={"number"}
                       name={"profitPercentage"}
                       placeholder={"Porcentaje de ganancia"}
                       required={true}
                       value={formData.profitPercentage}
                       handleChange={handleChange}>
                    <FaPercentage height={20} width={20}/>
                </Input>

                <Input id={"productStockInput"}
                       type={"number"}
                       name={"stock"}
                       placeholder={"Cantidad de unidades (stock en unidades)"}
                       required={true}
                       value={formData.stock}
                       handleChange={handleChange}>
                    <FaBoxesStacked height={20} width={20}/>
                </Input>

                <Input id={"productCommentInput"}
                       type={"string"}
                       name={"notesDescription"}
                       placeholder={"Anotaciones / Descripcion"}
                       required={false}
                       value={formData.notesDescription}
                       handleChange={handleChange}>
                    <PiPencilSimpleLineFill height={30} width={30}/>
                </Input>

                <Input id={"productTaxesInput"}
                       type={"number"}
                       name={"taxes"}
                       placeholder={"Impuestos (porcentaje total sobre el costo)"}
                       required={false}
                       value={formData.taxes}
                       handleChange={handleChange}>
                    <LiaFileInvoiceDollarSolid height={20} width={20}/>
                </Input>

                <CheckboxInput id={"allowNegativeStockInput"}
                               name={"allowNegativeStock"}
                               required={false}
                               label={"Permitir stock negativo"}
                               value={formData.allowNegativeStock}
                               handleChange={handleChange}>
                    <HiMinusCircle/>
                </CheckboxInput>

                <CheckboxInput id={"allowTrackStockInput"}
                               name={"trackStock"}
                               required={false}
                               label={"Llevar registro del stock"}
                               value={formData.trackStock}
                               handleChange={handleChange}>
                    <MdPlaylistAddCheck/>
                </CheckboxInput>

                <CheckboxInput id={"enableProductInput"}
                               label={"Producto disponible para la venta"}
                               name={"enabled"}
                               required={false}
                               value={formData.enabled}
                               handleChange={handleChange}>
                    <MdGppGood/>
                </CheckboxInput>

                <button type={"submit"}> crear producto</button>
            </form>

        </div>
    )
}
export default CreateProductForm