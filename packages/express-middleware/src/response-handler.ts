export class ApiResponse {
  status: number;
  data: any;
  message: string;
  success: boolean;

  constructor(message = "Success", { status = 200, data = [] }) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = true;
  }
}
