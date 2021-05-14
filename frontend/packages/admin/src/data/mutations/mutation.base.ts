//@ts-nocheck
import { useMutation } from "react-query";
import { BaseError, BaseModelType } from "../models/model";

interface IFormVariables<T> {
  id?: string;
  payload: Partial<T>;
}

export interface IBaseMutation<M> {
  model: M;
}

/**
 * Base create mutation
 * @param model
 */
export function useCreateMutation<T, M extends BaseModelType>({
  model,
}: IBaseMutation<M>) {
  return useMutation<T, BaseError, IFormVariables<T>>(function ({
    payload,
  }): Promise<T> {
    return model.create<T>(payload);
  });
}

/**
 * Base update mutation
 * @param model
 */
export function useUpdateMutation<T, M extends BaseModelType>({
  model,
}: IBaseMutation<M>) {
  return useMutation<T, BaseError, IFormVariables<T>>(function ({
    id,
    payload,
  }) {
    return model.update<T>(id as string, payload);
  });
}

/**
 * Base destroy mutation
 * @param model
 */
export function useDestroyMutation<M extends BaseModelType>({ model }) {
  return useMutation<unknown, BaseError, IFormVariables<unknown>>(function ({
    id,
  }) {
    return model.destroy(id);
  });
}

/**
 * Base mutation
 * @param model
 */
export function useBaseMutation<T, M extends BaseModelType>({
  model,
}: IBaseMutation<M>) {
  const create = useCreateMutation<T, M>({ model });

  const update = useUpdateMutation<T, M>({ model });

  const destroy = useDestroyMutation<M>({ model });

  return {
    create,
    update,
    destroy,
    isLoading: create.isLoading || update.isLoading || destroy.isLoading,
    get error() {
      const error = [];
      if (this.create.error) error.push(...this.create.error);
      if (this.update.error) error.push(...this.create.error);
      if (this.destroy.error) error.push(...this.create.error);
      return error.length ? error : undefined;
    },
  };
}
