import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`[ERROR] ${req.method} ${req.url} ->`, err);

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: "Validation error",
        issues: err.errors,
      },
    });
    return;
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
};

// import { Request, Response, NextFunction } from "express";
// import { ZodError } from "zod";

// export function errorHandler(
//   err: any,
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Response {
//   console.error(`[ERROR] ${req.method} ${req.url} ->`, err);

//   if (err instanceof ZodError) {
//     return res.status(400).json({
//       success: false,
//       error: {
//         message: "Validation error",
//         issues: err.errors,
//       },
//     });
//   }

//   const status = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   return res.status(status).json({
//     success: false,
//     error: {
//       message,
//       ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
//     },
//   });
// }
