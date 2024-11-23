// utils/response.ts
export function standardResponse(status: number, msg: string, data: any = null) {
  return {
    status,
    msg,
    data,
  }
}
