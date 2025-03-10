import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AddContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  //Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
  //Function to calculate average rating of course
  const calculateRatings = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRatings,
    isEducator,
    setIsEducator,
  };
  return (
    <AddContext.Provider value={value}>{props.children}</AddContext.Provider>
  );
};
