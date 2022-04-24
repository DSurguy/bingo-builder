import { User, UserInfo } from 'firebase/auth';

export const getUserInfoFromUser = (user: User): UserInfo => ({
  displayName: user.displayName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  providerId: user.providerId,
  uid: user.uid
});