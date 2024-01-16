import { persisted } from 'svelte-persisted-store';

export const usrData = persisted('usrData', {
    email: '',
    firstName: '',
    lastName: ''
})