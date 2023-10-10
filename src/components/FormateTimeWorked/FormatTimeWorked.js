const FormatTimeWorked = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

   return {seconds,hours,minutes,remainingSeconds}
  };

  export default FormatTimeWorked;