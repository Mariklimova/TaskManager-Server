interface iUser {
    readonly id?: number;
    name?: string;
    surname?: string;
    email?: string;
    pwd?: string;
  }
  
  interface iTask {
    readonly id?: number;
    task?: string;
    user_id?: number;
  }
  
  export { iUser, iTask };