import { UserData } from "../components/Types/types";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const uD = localStorage.getItem('userDataToken');
    const uT = localStorage.getItem('userTypeToken');
    
    if (uD) {
      setUserData(JSON.parse(uD as string));
    } else {
      navigate('/login');
    }
    if (uT) {
      setUserType(uT as string);
    }
  }, [navigate]);

  return { userData, userType };
};

export default useAuth;
