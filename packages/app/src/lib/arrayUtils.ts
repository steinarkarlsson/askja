import { PaginationPayload, SortPayload as RaSortPayload } from 'react-admin';
import get from 'lodash/get';
import { QuickScore, quickScore } from 'quick-score';

type Query = string | string[];
export type Filter<T> = {
    [K in keyof T]: Query;
};

export type SortPayload<T> = {
    field: keyof T;
    order?: 'ASC' | 'DESC';
};
export type FilterEntry<T> = [keyof T, Query];

export const sortArray = <T>(array: T[], params: SortPayload<T>): T[] => {
    const { field, order } = params;
    return (array || []).sort((a, b) => {
        const rawA = get(a, field);
        const rawB = get(b, field);

        const isNumberField = Number.isFinite(rawA) && Number.isFinite(rawB);
        if (isNumberField) {
            return basicSort(rawA, rawB, order);
        }
        const isStringField = typeof rawA === 'string' && typeof rawB === 'string';
        if (isStringField) {
            const aParsed = rawA.toLowerCase();
            const bParsed = rawB.toLowerCase();
            return basicSort(aParsed, bParsed, order);
        }
        const isDateField = rawA instanceof Date && rawB instanceof Date;
        if (isDateField) {
            return basicSort(rawA, rawB, order);
        }
        return basicSort(!!rawA, !!rawB, order);
    });
};

const basicSort = <T>(aValue: T, bValue: T, order: 'ASC' | 'DESC' = 'DESC') => {
    const isAsc = order === 'ASC';
    if (aValue > bValue) {
        return isAsc ? 1 : -1;
    }
    if (aValue < bValue) {
        return isAsc ? -1 : 1;
    }
    return 0;
};

const fulltextThreshold = 0.2;
export const filterArray = <T extends object>(array: T[], params: Filter<T>): T[] => {
    for (const [field, query] of Object.entries(params) as FilterEntry<T>[]) {
        array = array.filter((row) => {
            const rowValue: string = row[field] as unknown as string;

            if (!rowValue && field === 'q') {
                const stringValues = Object.values(row).filter((v) => v && typeof v === 'string');
                const qs = new QuickScore(stringValues, {} as never);
                const result = qs.search(query as string);
                return result.some((r) => r.score >= fulltextThreshold);
            }
            if (Array.isArray(query)) {
                return query.some((q) => {
                    if (Array.isArray(q)) {
                        return q.some((x) => quickScore(rowValue, x) >= fulltextThreshold);
                    } else {
                        return quickScore(rowValue, q) >= fulltextThreshold;
                    }
                });
            }
            if ((typeof query as string) !== 'string') {
                return (row[field] as unknown) === query;
            }
            return quickScore(rowValue, query) >= fulltextThreshold;
        });
    }
    return array;
};

export const paginateArray = <T>(array: T[], params: PaginationPayload): T[] => {
    const { page, perPage } = params;
    return array.slice((page - 1) * perPage, page * perPage);
};

const sortFilterPaginate = <T extends object>(
    array?: T[],
    params?: { pagination?: PaginationPayload; sort?: RaSortPayload; filter?: Filter<T> }
): { data: T[]; total: number } => {
    let data = [...(array || [])];
    let total = data.length;
    if (params && data.length) {
        if (params.sort) {
            data = sortArray(data, params.sort as SortPayload<T>);
        }
        if (params.filter && typeof params.filter === 'object') {
            data = filterArray(data, params.filter);
            total = data.length;
        }
        if (params.pagination) {
            data = paginateArray(data, params.pagination);
        }
    }
    return { data, total };
};

export default sortFilterPaginate;
