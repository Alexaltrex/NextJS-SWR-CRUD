import style from "./ProductsPage.module.scss"
import {FormikHelpers} from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {ProductUpdateType} from "../../types/product.types";
import AddIcon from '@mui/icons-material/Add';
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import {productsAPI} from "../../api/products.api";
import useSWR from 'swr'
import Link from "next/link";
import {TitleBlock} from "../../Components/Title/Title";
import {ProductForm} from "../../Components/ProductForm/ProductForm";
import {useStore} from "../../hooks/useStore";
import {observer} from "mobx-react-lite";
import {FetchDataWrapper} from "../../Layouts/FetchDataWrapper/FetchDataWrapper";

const ProductsPage = observer(() => {
    const {setSnackbar} = useStore();

    const {data: products, error, mutate, isValidating} = useSWR(
        productsAPI.getAll.key,
        productsAPI.getAll.fetcher
    );

    const onCreateHandler = async (
        values: ProductUpdateType,
        formikHelpers: FormikHelpers<ProductUpdateType>
    ) => {
        try {
            const response = await productsAPI.create(values);
            await mutate();
            setSnackbar({open: true, message: response, severity: "success"});
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            setSnackbar({
                open: true,
                message: e?.response?.data?.message ?? e.message,
                severity: "error"
            });
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    const onDeleteHandler = async (id: string) => {
        try {
            const response = await productsAPI.delete(id);
            await mutate();
            setSnackbar({open: true, message: response, severity: "success"});
        } catch (e: any) {
            process.env.NODE_ENV === 'development' && console.log(e);
            setSnackbar({
                open: true,
                message: e?.response?.data?.message ?? e.message,
                severity: "error"
            });
        }
    }

    const loading = (!products && !error) || isValidating;

    return (
        <MainLayout headTitle="Products">
            <FetchDataWrapper error={error} loading={loading}>
                    <section className={style.productsPage}>
                        <div className={style.inner}>
                            <TitleBlock title="products"/>
                            {
                                products && (
                                    <>
                                        <div className={style.items}>
                                            {
                                                products.map(product => (
                                                    <div key={product.id}
                                                         className={style.item}
                                                    >
                                                        <Link href={`/product/${product.id}`}>
                                                            <a className={style.link}>{product.name}</a>
                                                        </Link>
                                                        <IconButton className={style.deleteBtn}
                                                                    onClick={() => onDeleteHandler(product.id)}
                                                                    disabled={loading}
                                                        >
                                                            <DeleteIcon sx={{color: "#FFF"}}/>
                                                        </IconButton>
                                                    </div>

                                                ))
                                            }
                                        </div>

                                        <ProductForm buttonLabel="Add product"
                                                     initialValues={{
                                                         name: "",
                                                         size: 1,
                                                         weight: 1,
                                                         description: "",
                                                     }}
                                                     onSubmitHandler={onCreateHandler}
                                                     topButtonIcon={<AddIcon/>}
                                                     className={style.form}
                                        />

                                    </>

                                )
                            }
                        </div>
                    </section>
            </FetchDataWrapper>
        </MainLayout>
    )
})
export default ProductsPage