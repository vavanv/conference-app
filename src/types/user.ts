export interface User {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: 'admin' | 'presenter' | 'attendee';
      status: 'active' | 'inactive';
    }
    
    export interface UserFormData extends Omit<User, 'id'> {}
