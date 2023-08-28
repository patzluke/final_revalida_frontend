import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierState } from './supplier.reducer';

export const selectSupplierState =
  createFeatureSelector<SupplierState>('supplierList');

export const selectSuppliers = () =>
  createSelector(selectSupplierState, (state: SupplierState) =>
    state.suppliers.filter((suppliers) => suppliers)
  );

export const selectSupplier = (supplierId: number) =>
  createSelector(selectSupplierState, (state: SupplierState) =>
    state.suppliers.find((supplier) => {
      return supplier.supplierId == supplierId;
    })
  );
