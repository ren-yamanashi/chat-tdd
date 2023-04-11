type Result<T> = {
  data?: T;
  error?: unknown;
};

export const result = async <T>(
  asyncFunc: () => Promise<T>
): Promise<Result<T>> => {
  try {
    const data = await asyncFunc();
    return {
      data,
    };
  } catch (error: unknown) {
    return { error };
  }
};
