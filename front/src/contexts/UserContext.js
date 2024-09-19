import React, { createContext, useState, useEffect } from "react";
import {
  getUserBookings,
  updateUserProfile,
  uploadPhoto,
} from "../services/Services";

export const UserContext = createContext();

export const UserProvider = ({ children, initialUserData, initialToken }) => {
  const [user, setUser] = useState(initialUserData || null);
  const [employee, setEmployee] = useState(null); // Stanje za zaposlenog
  const [token, setToken] = useState(initialToken || null);
  const [bookings, setBookings] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(null); // Dodajte stanje za greške

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedEmployeeId = localStorage.getItem("employeeId");
    const storedEmployeeRole = localStorage.getItem("employeeRole");

    if (storedToken) {
      setToken(storedToken);

      if (storedUserId) {
        // Ažuriraj stanje korisnika na osnovu sačuvanih podataka
        setUser({ id: storedUserId });
      }

      if (storedEmployeeId && storedEmployeeRole) {
        // Ažuriraj stanje zaposlenog
        setEmployee({ id: storedEmployeeId, role: storedEmployeeRole });
      }
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      const fetchBookings = async () => {
        const userBookings = await getUserBookings(token);
        setBookings(userBookings);
      };
      fetchBookings();
    }
  }, [user, token]);

  const login = async (credentials) => {
    try {
      const response = await fetch(
        "http://miellephotostudiobe.somee.com/api/Users/Login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );
      const result = await response.json();

      if (response.ok) {
        const { Token, $id } = result; // Prilagodite imena prema server odgovoru
        if (Token && $id) {
          setToken(Token);
          setUser({ id: $id });
          localStorage.setItem("token", Token);
          localStorage.setItem("userId", $id);

          // Fetch korisnički profil nakon prijavljivanja
          const profileResponse = await fetch(
            "http://miellephotostudiobe.somee.com/api/Users/Profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`, // Dodavanje tokena u zahteve
              },
            }
          );

          if (profileResponse.ok) {
            const userProfile = await profileResponse.json();
            // Ažuriranje korisnika sa profil informacijama
            setUser(userProfile);
            return true;
          } else {
            console.error(
              "Failed to fetch user profile:",
              profileResponse.status
            );
            return false;
          }
        }
      } else {
        setError("Login failed: Invalid email or password"); // Postavite poruku o grešci
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const employeeLogin = async (credentials) => {
    try {
      const response = await fetch(
        "http://miellephotostudiobe.somee.com/api/Employees/Login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        setError("Login failed: Invalid email or password");
        return false;
      }

      const result = await response.json();
      const { Token, Role, Id } = result; // Uzimamo potrebne vrednosti iz odgovora servera

      if (Token && Role && Id !== undefined) {
        setToken(Token);
        setEmployee({ id: Id, role: Role });
        localStorage.setItem("token", Token);
        localStorage.setItem("employeeId", Id);
        localStorage.setItem("employeeRole", Role);
        return true;
      } else {
        setError("Login failed: Invalid server response");
        return false;
      }
    } catch (error) {
      console.error("Error during employee login:", error);
      setError("An error occurred during login. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setEmployee(null); // Resetuje podatke zaposlenog
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("employeeId"); // Uklanja podatke zaposlenog iz storage-a
    localStorage.removeItem("employeeRole"); // Uklanja ulogu zaposlenog
  };

  return (
    <UserContext.Provider
      value={{
        user,
        employee,
        token,
        bookings,
        photo,
        uploadStatus,
        login,
        employeeLogin,
        logout,
        error,
      }}
    >
      {children}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
