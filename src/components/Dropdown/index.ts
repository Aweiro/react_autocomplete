import { Person } from '../../types/Person';

export interface Props {
  users: Person[];
  setSelectedUser: (value: Person | null) => void;
}
