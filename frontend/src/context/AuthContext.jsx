import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { api } from '../../services/api';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const [idToken, setidToken] = useState(null);

    useEffect(() => {
      	const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        	if(firebaseUser) {
				const token = await firebaseUser.getIdToken();
				setidToken(token);

				api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

				try{
					const response = await api.get('/auth/me');
					setUser(response.data);
				} catch (error) {
					console.error('Error fetching user data:', error);	
				}
			} else {
				setUser(null);
				setidToken(null);
				delete api.defaults.headers.common['Authorization'];
			}
			setLoading(false);
    	});

			return () => unsubscribe();
		}, []);

		const value = { user, loading, idToken };
	
		return (
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		);
	};
	
	export const useAuth = () => {
		return useContext(AuthContext);
	};