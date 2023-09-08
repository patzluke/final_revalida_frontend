import { createAction, props } from '@ngrx/store';
import { Supplier } from '../../models/supplier';

export enum SupplierActions {
  SET_SUPPLIER = '[supplier] Set List of supplier',
  GET_SUPPLIER = '[supplier] Get List of supplier Success',

  UPDATE_SUPPLIER = '[supplier] Update supplier',
  UPDATE_SUPPLIER_SUCCESS = '[supplier] Update supplier Success',
  UPDATE_SUPPLIER_FAILED = '[supplier] Update supplier Failed',

  UPDATE_SUPPLIER_STATUS = '[supplier] Update supplier status',
  UPDATE_SUPPLIER_STATUS_SUCCESS = '[supplier] Update supplier status Success',
  UPDATE_SUPPLIER_STATUS_FAILED = '[supplier] Update supplier status Failed',

  UPDATE_SUPPLIER_ACTIVE_STATUS = '[supplier] Update supplier active status',
  UPDATE_SUPPLIER_ACTIVE_STATUS_SUCCESS = '[supplier] Update supplier active status Success',
  UPDATE_SUPPLIER_ACTIVE_STATUS_FAILED = '[supplier] Update supplier active status Failed',
}

export const setSupplierState = createAction(
  SupplierActions.SET_SUPPLIER,
  props<{ suppliers: Supplier[] }>()
);
//--------------------------------------------------------------------
export const updateSupplierState = createAction(
  SupplierActions.UPDATE_SUPPLIER_SUCCESS,
  props<{ supplier: Supplier }>()
);
