import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { COURSES, INSTITUTES } from "../data/mockData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [savedCourses, setSavedCourses] = useState([]);
  const [savedInstitutes, setSavedInstitutes] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/");
      if (response.data) {
        const list = response.data.map(u => ({
          id: u.id,
          name: u.name || u.username.split("@")[0],
          email: u.email || u.username,
          role: u.role || 'Student'
        }));
        setUsersList(list);
        localStorage.setItem("usersList", JSON.stringify(list));
      }
    } catch (error) {
      console.warn("Backend offline. Using localStorage for usersList.");
    }
  };

  const deleteUser = async (userId, userEmail) => {
    if (userId && typeof userId === "number") {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}/`);
      } catch (error) {
        console.warn("Error deleting user from backend:", error);
      }
    }
    setUsersList(prev => {
      const updated = prev.filter(u => (userId ? u.id !== userId : u.email !== userEmail));
      localStorage.setItem("usersList", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    // Initial load: restore session from local storage or set mock student
    const storedUser = localStorage.getItem("user");
    const storedSavedCourses = localStorage.getItem("savedCourses");
    const storedSavedInstitutes = localStorage.getItem("savedInstitutes");
    const storedEnquiries = localStorage.getItem("enquiries");
    const storedUsers = localStorage.getItem("usersList");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedSavedCourses) {
      setSavedCourses(JSON.parse(storedSavedCourses));
    } else {
      setSavedCourses([]);
    }
    if (storedSavedInstitutes) {
      setSavedInstitutes(JSON.parse(storedSavedInstitutes));
    } else {
      setSavedInstitutes([]);
    }
    if (storedEnquiries) {
      setEnquiries(JSON.parse(storedEnquiries));
    } else {
      setEnquiries([]);
    }
    if (storedUsers) {
      setUsersList(JSON.parse(storedUsers));
    } else {
      setUsersList([]);
    }
    setLoading(false);
    fetchUsers();
  }, []);

  const login = async (email, password) => {
    // Check for mock login first
    if (email === "admin@testinghub.com" && password === "admin") {
      const adminUser = { email, role: "Admin", name: "System Admin" };
      setUser(adminUser);
      setToken("mock-jwt-admin-token");
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("token", "mock-jwt-admin-token");
      return { success: true, role: "Admin" };
    }

    if (email === "student@testinghub.com" && password === "student") {
      const studentUser = { email, role: "Student", name: "Pune Student", preferences: ["automation-testing", "api-testing"] };
      setUser(studentUser);
      setToken("mock-jwt-student-token");
      localStorage.setItem("user", JSON.stringify(studentUser));
      localStorage.setItem("token", "mock-jwt-student-token");
      setUsersList(prev => {
        if (!prev.some(u => u.email === email)) {
          const updated = [...prev, { name: "Pune Student", email, role: "Student" }];
          localStorage.setItem("usersList", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
      return { success: true, role: "Student" };
    }

    // Attempt real API login (graceful failover to registering a new mock user if backend is offline)
    try {
      const response = await axios.post("http://localhost:8000/api/token/", { email, password });
      if (response.data) {
        const decodedUser = { email, role: response.data.role || "Student", name: response.data.name || email };
        setUser(decodedUser);
        setToken(response.data.access);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        localStorage.setItem("token", response.data.access);
        if (decodedUser.role === "Student") {
          setUsersList(prev => {
            if (!prev.some(u => u.email === email)) {
              const updated = [...prev, { name: decodedUser.name, email, role: "Student" }];
              localStorage.setItem("usersList", JSON.stringify(updated));
              return updated;
            }
            return prev;
          });
        }
        return { success: true, role: decodedUser.role };
      }
    } catch (error) {
      console.warn("Backend offline. Fallback to mock session registration.");
      const guestUser = { email, role: "Student", name: email.split("@")[0] };
      setUser(guestUser);
      setToken("mock-jwt-guest-token");
      localStorage.setItem("user", JSON.stringify(guestUser));
      localStorage.setItem("token", "mock-jwt-guest-token");
      setUsersList(prev => {
        if (!prev.some(u => u.email === email)) {
          const updated = [...prev, { name: guestUser.name, email, role: "Student" }];
          localStorage.setItem("usersList", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
      return { success: true, role: "Student" };
    }
  };

  const register = async (name, email, password) => {
    const newUser = { name, email, role: "Student" };
    setUsersList(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem("usersList", JSON.stringify(updated));
      return updated;
    });
    try {
      await axios.post("http://localhost:8000/api/register/", { name, email, password });
      return login(email, password);
    } catch (error) {
      console.warn("Backend offline. Simulating registration.");
      setUser(newUser);
      setToken("mock-jwt-new-token");
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", "mock-jwt-new-token");
      return { success: true, role: "Student" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const toggleSaveCourse = (courseId) => {
    setSavedCourses(prev => {
      const updated = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      localStorage.setItem("savedCourses", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleSaveInstitute = (instituteId) => {
    setSavedInstitutes(prev => {
      const updated = prev.includes(instituteId)
        ? prev.filter(id => id !== instituteId)
        : [...prev, instituteId];
      localStorage.setItem("savedInstitutes", JSON.stringify(updated));
      return updated;
    });
  };

  const submitEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: Date.now(),
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      ...enquiryData
    };
    setEnquiries(prev => {
      const updated = [newEnquiry, ...prev];
      localStorage.setItem("enquiries", JSON.stringify(updated));
      return updated;
    });
    return newEnquiry;
  };

  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries(prev => {
      const updated = prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq);
      localStorage.setItem("enquiries", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      savedCourses,
      savedInstitutes,
      enquiries,
      loading,
      login,
      register,
      logout,
      toggleSaveCourse,
      toggleSaveInstitute,
      submitEnquiry,
      updateEnquiryStatus,
      usersList,
      fetchUsers,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
