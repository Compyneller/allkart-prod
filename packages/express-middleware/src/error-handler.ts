export class ApiError extends Error {
  status: number;
  code: string;
  isOperational: boolean;
  success: boolean;
  errors: any;

  constructor(
    message: string,
    {
      status = 500,
      code = "BAD_REQUEST",
      isOperational = true,
      stack = "",
      errors = {},
    }
  ) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    this.code = code;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// export class BadRequestError extends ApiError {
//   constructor(message: string = "Bad request") {
//     super(message, { status: 400, code: "BAD_REQUEST" });
//   }
// }

// export class UnauthorizedError extends ApiError {
//   constructor(message: string = "Unauthorized") {
//     super(message, { status: 401, code: "UNAUTHORIZED" });
//   }
// }

// export class ForbiddenError extends ApiError {
//   constructor(message: string = "Forbidden") {
//     super(message, { status: 403, code: "FORBIDDEN" });
//   }
// }

// export class NotFoundError extends ApiError {
//   constructor(message: string = "Not Found") {
//     super(message, { status: 404, code: "NOT_FOUND" });
//   }
// }
// export class FormValidationError extends ApiError {
//   constructor(message: string = "Form validation error") {
//     super(message, { status: 422, code: "FORM_ERROR" });
//   }
// }
