import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { api } from '../../services/api';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true); // true until first onAuthStateChanged fires
	const [idToken, setIdToken] = useState(null);

		useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
				try {
					if (firebaseUser) {
									const token = await firebaseUser.getIdToken();
									setIdToken(token);
									api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
									// Debug: remove or comment out in production
									if (import.meta.env.DEV) {
										console.debug('[Auth] Token set, length:', token.length);
									}
						try {
							const response = await api.get('/auth/me');
							// Support both {data:{...}} and {...}
							const data = response.data?.data || response.data;
							setUser(data);
						} catch (err) {
							console.error('Error fetching user data:', err);
							// still set a minimal user from firebase to allow UI
							setUser({
								email: firebaseUser.email,
								displayName: firebaseUser.displayName,
								photoUrl: firebaseUser.photoURL,
								firebaseUid: firebaseUser.uid
							});
						}
					} else {
						setUser(null);
						setIdToken(null);
						delete api.defaults.headers.common['Authorization'];
					}
				} finally {
					setLoading(false);
				}
			});
			return () => unsubscribe();
		}, []);

		const value = { user, loading, ready: !loading, idToken };

		return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
	
	export const useAuth = () => {
		return useContext(AuthContext);
	};