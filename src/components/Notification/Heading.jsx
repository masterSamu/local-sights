import {
  BsExclamationTriangle,
  BsInfoCircle,
  BsExclamationOctagon,
  BsCheckCircle,
} from "react-icons/bs";

/**
 * Get heading element for each type
 * @param  {"success" | "error" | "warning" | "info"} type string
 */
const Heading = ({ type }) => {
  switch (type) {
    case "success":
      return (
        <>
          <BsCheckCircle /> Success
        </>
      );
    case "error":
      return (
        <>
          <BsExclamationOctagon /> Error
        </>
      );
    case "warning":
      return (
        <>
          <BsExclamationTriangle /> Warning
        </>
      );
    case "info":
      return (
        <>
          <BsInfoCircle /> Info
        </>
      );
    default:
      return null;
  }
};

export default Heading;
