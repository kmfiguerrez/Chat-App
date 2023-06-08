import UserPayload from "./src/types/userPayload"; // Replace './types' with the path to your user payload interface

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
