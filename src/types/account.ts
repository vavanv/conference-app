export interface AccountFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  accountType: 'admin' | 'presenter' | 'attendee';
}

export interface AccountState {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  accountType: 'admin' | 'presenter' | 'attendee';
}
