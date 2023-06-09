import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { type RootState, type AppDispatch } from '../state';

type DispatchFunc = () => AppDispatch;
export const useTypedDispatch: DispatchFunc = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
