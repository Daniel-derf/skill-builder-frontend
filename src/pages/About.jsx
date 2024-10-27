import withAuth from "../components/withAuth";
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Skill Builder</h1>
      <p>
        This is a application created to help you improve your skills in various areas. 
        Here, you can engage in a variety of challenges that will not only test your abilities but also 
        provide opportunities for learning and personal growth. 
      </p>
      <p>
        Whether you are looking to enhance your technical skills, expand your knowledge in creative areas, 
        or simply have fun, we have challenges for you! 
      </p>
      <p>
        Join us and start your journey of self-discovery and development!
      </p>
    </div>
  );
}

export default withAuth(About);
