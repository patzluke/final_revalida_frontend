import { createReducer, on } from '@ngrx/store';
import { Supplier } from '../../models/supplier';
import { setSupplierState, updateSupplierState } from './supplier.actions';

export interface SupplierState {
  suppliers: Supplier[];
}

export const initialState: SupplierState = {
  suppliers: [],
};

export const supplierReducer = createReducer(
  initialState,
  on(setSupplierState, (state, { suppliers }) => {
    return { ...state, suppliers: suppliers };
  }),
  on(updateSupplierState, (state, { supplier }) => {
    return {
      ...state,
      suppliers: state.suppliers.map((oldSupplier) =>
      oldSupplier.supplierId == supplier.supplierId ? supplier : oldSupplier
      ),
    };
  })
);
