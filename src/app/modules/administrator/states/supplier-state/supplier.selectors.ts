import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierState } from './supplier.reducer';

export const selectSupplierState =
  createFeatureSelector<SupplierState>('supplierList');

  export const selectSuppliersValidated = () =>
  createSelector(selectSupplierState, (state: SupplierState) =>
    state.suppliers.filter((supplier) => supplier.user?.isValidated)
  );

export const selectSuppliersNotValidated = () =>
  createSelector(selectSupplierState, (state: SupplierState) =>
    state.suppliers.filter((supplier) => !supplier.user?.isValidated)
  );

export const selectSupplier = (supplierId: number) =>
  createSelector(selectSupplierState, (state: SupplierState) =>
    state.suppliers.find((supplier) => {
      return supplier.supplierId == supplierId;
    })
  );
