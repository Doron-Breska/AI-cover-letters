import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="home-bg">
      <section className="top-stripe"></section>
      <div className="custom-shape-divider-top-1697621189">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            // className="shape-fill"
            className="wave"
          ></path>
        </svg>
      </div>
      <div>
        <p className="home-header">
          Use my AI cover letter creator to get your writing to flow, not just
          impress, but steal the show!
        </p>
        <p className="text-center contact-header">
          Doron Breska
          <br />
          Contact
        </p>
        <p className="text-center">
          <a className="con-link" href="mailto:doronbreska@gmail.com">
            <FontAwesomeIcon
              className="faIcon"
              href="mailto:doronbreska@gmail.com"
              icon={faEnvelope}
              size="2xl"
            />
          </a>
          <a
            className="con-link"
            href="https://www.linkedin.com/in/doron-breska"
          >
            <FontAwesomeIcon className="faIcon" icon={faLinkedin} size="2xl" />
          </a>
          <a className="con-link" href="https://github.com/Doron-Breska">
            <FontAwesomeIcon className="faIcon" icon={faGithub} size="2xl" />
          </a>
        </p>
      </div>
      <div className="custom-shape-divider-bottom-1697624270">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="wave"
          ></path>
        </svg>
      </div>
      <section className="bottom-stripe"></section>
    </div>
  );
};

export default Home;
