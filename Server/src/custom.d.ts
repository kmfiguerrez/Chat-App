import UserPayload from "./types/userPayload"; // Replace './types' with the path to your user payload interface

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
