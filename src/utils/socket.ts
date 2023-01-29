import io, { Socket } from 'socket.io-client';
import { URL_ORIGIN } from './env';

let socket: Socket;

export const newSocket = () => {
  socket = io(URL_ORIGIN);
  return socket;
}

export const socketIo = () => {
  return socket;
};