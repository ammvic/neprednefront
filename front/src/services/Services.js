import axios from "axios";

const API_URL = "http://miellephotostudiobe.somee.com/api";
//"https://localhost:7098/api"; // change to your actual API URL

export const loginUser = (email, password, userType = "user") => {
  const endpoint = userType === "employee" ? "Employees/Login" : "Users/Login";
  return axios
    .post(`${API_URL}/${endpoint}`, { email, password })
    .then((response) => response.data) // Capture API response
    .catch((error) => {
      console.error("Login error", error);
      throw error;
    });
};

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/Users/Register`, userData);
};

export const verifyUser = (email, verificationCode) => {
  return axios.post(`${API_URL}/Users/Verify`, {
    email: email,
    verificationCode: verificationCode,
  });
};

export const getUserBookings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/Users/MyBookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};
// Mock function to check availability
export const checkAvailability = async (formData) => {
  return {
    available: true,
    price: 100,
  };
};

// Mock function to create a payment intent
export const createPaymentIntent = async (price) => {
  return {
    clientSecret: "test-client-secret",
  };
};

// Funkcija za dobijanje podataka o korisniku
//export const getUserData = async () => {
//return axios.get(`${API_URL}/user`)
//.then(response => response.data)
//.catch(error => {
//  console.error('Error fetching user data:', error);
// throw error;
// });
//};

// Funkcija za ažuriranje profila korisnika
export const updateUserProfile = async (userData) => {
  return axios
    .put(`${API_URL}/user`, userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating user profile:", error);
      throw error;
    });
};

export const getEmployeeData = async (employeeId) => {
  return {
    id: employeeId,
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
  };
};

export const getEmployeeSessions = async () => {
  return [
    {
      id: 1,
      type: "Wedding",
      date: "2024-09-15",
      location: "Central Park",
      status: "Confirmed",
    },
    {
      id: 2,
      type: "Graduation",
      date: "2024-10-22",
      location: "Harvard University",
      status: "Pending",
    },
  ];
};

// Mock function to get all employees
export const getAllEmployees = async () => {
  return [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      role: "Photographer",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      role: "Editor",
    },
  ];
};

// Mock function to get statistics
export const getStatistics = async () => {
  return {
    totalSessions: 20,
    totalRevenue: 5000,
  };
};

// Funkcija za upload fotografija
export const uploadPhoto = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload-photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading photos:", error);
    throw error;
  }
};

// Funkcija za preuzimanje fotografija
export const getPhotos = async () => {
  try {
    // Ovdje bi trebala biti pravi URL za API preuzimanje
    const response = await axios.get(`${API_URL}/photos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  // API call to add employee
  return axios
    .post(`${API_URL}/employees`, employeeData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error adding employee:", error);
      throw error;
    });
};

export const deleteEmployee = async (employeeId) => {
  // API call to delete employee
  return axios
    .delete(`${API_URL}/employees/${employeeId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting employee:", error);
      throw error;
    });
};

export const manageSessions = async () => {
  // Logic to manage sessions
  console.log("Managing sessions...");
};

export const getEmployeeTasks = async () => {
  return [
    { id: 1, description: "Upload photos from wedding", status: "Pending" },
    { id: 2, description: "Update graduation album", status: "Completed" },
  ];
};

export const getPhotosByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/photos`, {
      params: { date },
    });
    return response.data; // Pretpostavljam da backend vraća niz sa podacima o slikama
  } catch (error) {
    console.error("There was an error fetching photos:", error);
    throw error;
  }
};

// Mock function to get user's credits
export const getUserCredits = async () => {
  return 100; // Replace with an API call to get actual user credits
};

// Function to download photo if the user has enough credits
export const downloadPhoto = async (photoId, userCredits) => {
  const costPerPhoto = 10; // Assuming each photo costs 10 credits
  if (userCredits >= costPerPhoto) {
    // API call to deduct credits and allow download
    const response = await axios.post(`${API_URL}/download-photo`, { photoId });
    if (response.data.success) {
      return {
        downloadUrl: response.data.downloadUrl,
        remainingCredits: userCredits - costPerPhoto,
      };
    }
  } else {
    throw new Error("Not enough credits to download the photo.");
  }
};

// Mock function to schedule photo printing
export const schedulePhotoPrinting = async (photoIds, userId) => {
  // API call to schedule printing
  const response = await axios.post(`${API_URL}/schedule-printing`, {
    photoIds,
    userId,
  });
  return response.data;
};
