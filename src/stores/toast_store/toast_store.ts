import { MessageInstance } from "antd/lib/message/interface";
import { makeAutoObservable } from "mobx";

type ToastStyle = "success" | "warning" | "error";

export interface Toast {
  id: number;
  style: ToastStyle;
  message: string;
  created_at: number;
}

export class ToastStore {
  messageApi: MessageInstance | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  show(style: ToastStyle, message: string) {
    this.messageApi?.[style](message);
  }

  setMessageApi(messageApi: MessageInstance) {
    this.messageApi = messageApi;
  }
}
