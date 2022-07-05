import React, {FC, useState} from "react";
import {ILocation} from "../../types/locations.types";
import {TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import visuallyHidden from "@mui/utils/visuallyHidden";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import style from "./LocationsTable.module.scss";
import Link from "next/link";
import DirectionsIcon from '@mui/icons-material/Directions';

// типизация данных таблицы
interface IData {
    id: number
    name: string
    dimension: string
    type: string
}

// функция сравнения для сортировки
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// тип сортировки - по возроастанию или по убыванию
type OrderType = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: OrderType,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// интерфейс ячейки заголовка таблицы
interface IHeadCell {
    disablePadding: boolean
    id: keyof IData // тип данных
    label: string // название столбца в заголовке таблицы
    numeric: boolean // тип данных - числовой или нет
}

// данные ячеек заголовка
const headCells: readonly IHeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'dimension',
        numeric: false,
        disablePadding: false,
        label: 'Dimension',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
];

//============ КОМПОНЕНТ - ЗАГОЛОВОК ТАБЛИЦЫ ======================//
interface CustomTableHead {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void
    order: OrderType
    orderBy: string
}

const CustomTableHead: FC<CustomTableHead> = ({
                                                  order,
                                                  orderBy,
                                                  onRequestSort
                                              }) => {

    const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className={style.tableHeadRow}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                        className={style.tableCell}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className={style.tableSortLabel}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

//================================= ТАБЛИЦА ======================================//
interface ILocationsTable {
    locations: ILocation[]
}
export const LocationsTable: FC<ILocationsTable> = ({locations}) => {
    const rows: IData[] = locations.map(({id, name, dimension, type}) => ({
        id,
        name,
        dimension,
        type
    }));

    const [order, setOrder] = useState<OrderType>('asc');
    const [orderBy, setOrderBy] = useState<keyof IData>('name');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <TableContainer className={style.locationsTable}>
            <Table aria-labelledby="tableTitle"
                   size='small'
            >
                <CustomTableHead order={order}
                                 orderBy={orderBy}
                                 onRequestSort={handleRequestSort}
                />
                <TableBody >
                    {
                        rows
                            .sort(getComparator(order, orderBy))
                            .map((row, index) => (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.name}
                                        className={style.tableRow}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            className={style.tableCell}
                                        >
                                            <Link href={`/location/${row.id}`}>
                                                <a className={style.name}>
                                                    <p>{row.name}</p>
                                                    <DirectionsIcon className={style.icon}/>
                                                </a>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left"
                                                   className={style.tableCell}
                                        >
                                            {row.dimension}
                                        </TableCell>
                                        <TableCell align="left"
                                                   className={style.tableCell}
                                        >
                                            {row.type}
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}