import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import '../css/SocialLogin.css'

const SocialLogin = () => {
  return (
    <div className="social-login-container">
      <button className="social-btn">
        <FaGoogle />
      </button>
      <button className="social-btn">
        <FaFacebookF />
      </button>
      <button className="social-btn">
        <FaGithub />
      </button>
      <button className="social-btn">
        <FaLinkedinIn />
      </button>
    </div>
  );
};

export default SocialLogin;
