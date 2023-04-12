type SafeExecuteResult<T> = {
  response?: T;
  error?: unknown;
};

export const safeExecute = async <T>(
  asyncFunc: () => Promise<T>
): Promise<SafeExecuteResult<T>> => {
  try {
    const response = await asyncFunc();
    return {
      response,
    };
  } catch (error: unknown) {
    return { error };
  }
};
