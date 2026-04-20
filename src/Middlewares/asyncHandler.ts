export const asyncHandler = (fn: any) =>
  (request: any, response: any, next: any) =>
    Promise.resolve(fn(request, response, next)).catch(next);