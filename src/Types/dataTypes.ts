import { ReactComponentElement, ReactElement, ReactNode } from "react"

type DataType = {
    id: number,
    name: string,
    date: string,
    title: string,
    field: string,
    old_value: number,
    new_value: number
}

export type HeadType = {
    title: string,
    id: string,
    columnComponent?: {
        component: ReactNode,
        onClick: (id: string) => void
    },
    sort?: {
        handleSort: (id: string) => void,
        sortComponent: ReactNode
    }
}

export type DataListType = {
    data: DataType[],
}