
export const setTimeFormLocal = (payload) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("startTime", JSON.stringify(payload));

  }
  else {
    return null
  }
}

export const getTimeFromLocal = () => {
  if (typeof window !== "undefined") {
    const startTimeValue =  JSON.parse(localStorage.getItem("startTime") || null);
    return startTimeValue
  }
  else {
    return null
  }
}

export const removeTimeFromLocal = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("startTime");
      }
      else {
        return null
      }
}