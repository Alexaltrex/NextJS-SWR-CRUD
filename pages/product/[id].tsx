import React, {useState} from "react";
import style from "./ProductItemPage.module.scss";
import {FormikHelpers} from "formik";
import {ProductUpdateType} from "../../types/product.types";
import EditIcon from '@mui/icons-material/Edit';
import {NextPage} from "next";
import {useRouter} from "next/router";
import useSWR from "swr";
import {productsAPI} from "../../api/products.api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../hooks/useStore";
import {FetchDataWrapper} from "../../Layouts/FetchDataWrapper/FetchDataWrapper";
import {MainLayout} from "../../Layouts/MainLayout/MainLayout";
import Link from "next/link";
import {ProductForm} from "../../Components/ProductForm/ProductForm";

const ProductItemPage: NextPage = observer(() => {
    const router = useRouter();
    const {id} = router.query;

    const {setSnackbar} = useStore();

    const {data: product, error, mutate} = useSWR(
        productsAPI.getById.key(id as string),
        productsAPI.getById.fetcher
    );

    const onUpdateHandler = async (
        values: ProductUpdateType,
        formikHelpers: FormikHelpers<ProductUpdateType>
    ) => {
        try {
            await mutate(
                productsAPI.update({updateProduct: values, id: id as string}),
                {
                    optimisticData: { ...values, id: (new Date()).toString() },
                    rollbackOnError: true,
                    populateCache: true,
                    revalidate: false,
                }
            )
            setSnackbar({open: true, message: "Product successfully updated", severity: "success"})
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

    const loading = !product && !error;

    return (
        <MainLayout headTitle={`Product | ${product?.name || "loading..."}`}>
            <FetchDataWrapper error={error} loading={loading}>
                <div className={style.productItemPage}>
                    <div className={style.inner}>
                        {
                            product && id && (
                                <>
                                    <div className={style.titleWrapper}>
                                        <Link href="/products">
                                            <a className={style.link}>{"Products / "}</a>
                                        </Link>
                                        <h1 className={style.title}>
                                            {product.name}
                                        </h1>
                                    </div>

                                    <div className={style.properties}>
                                        {
                                            [
                                                {label: "ID", value: product.id},
                                                {label: "Size", value: product.size},
                                                {label: "Weight", value: product.weight},
                                                {label: "Description", value: product.description},
                                            ].map(({label, value}, index) => (
                                                <div key={index}
                                                    className={style.row}
                                                >
                                                    <p>{label}</p>
                                                    <p>{value}</p>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <ProductForm buttonLabel="Edit product (optimistic update)"
                                                 initialValues={{
                                                     name: product.name,
                                                     size: product.size,
                                                     weight: product.weight,
                                                     description: product.description,
                                                 }}
                                                 onSubmitHandler={onUpdateHandler}
                                                 topButtonIcon={<EditIcon/>}
                                                 className={style.form}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </FetchDataWrapper>
        </MainLayout>
    )
})
export default ProductItemPage