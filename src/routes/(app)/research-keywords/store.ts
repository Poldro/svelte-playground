import { writable } from 'svelte/store';
import type { ActionData } from './$types';

export const inputTextChat = writable('');
export const chatData= writable<{question:string,answer:string}[] >([]);
