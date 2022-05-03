// Create a context
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [auth, setAuthState] = useState();

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    console.log('run get auth state in useauth.js');
    try {
      const authDataString = await AsyncStorage.getItem('accountData');
      const authData = JSON.parse(authDataString || {});
      // Configure axios headers
      //configureAxiosHeaders(authData.token, authData.phone);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async auth => {
    try {
      await AsyncStorage.setItem('accountData', JSON.stringify(auth));
      // Configure axios headers
      // configureAxiosHeaders(auth.token, auth.phone);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  // useEffect(() => {
  //   getAuthState();
  // }, []);

  const valueMemo = useMemo(
    () => ({
      auth,
      setAuth,
      getAuthState,
    }),
    [auth],
  );

  return (
    <AuthContext.Provider value={valueMemo}>{children}</AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
export default function useAuth() {
  return useContext(AuthContext);
}
