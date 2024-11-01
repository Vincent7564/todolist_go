export interface Task {
    id: number;
    title: string;
    description: string;
    is_active: boolean;
  }
  
  export interface Result {
    tasks: Task[];
    total: number;
  }
  
  export interface ResponseData {
    ResponseCode: string;
    ResponseMessage: string;
    Result: Result;
  }
  
  export interface APIResponse {
    data: ResponseData;
  }