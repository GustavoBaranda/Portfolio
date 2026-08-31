export interface ContactFormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
