export interface Presenter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  status: 'active' | 'inactive';
}

export interface PresenterFormData extends Omit<Presenter, 'id'> {}
