
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-4 mt-12">
      <Container>
        <div className="text-center">
          <p className="mb-2">
            Built with ❤️ for Agricultural Excellence
          </p>
          <p className="text-green-200 text-sm">
            <a 
              href="https://github.com/rohitkshirsagar19" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white text-decoration-none"
            >
              View on GitHub
            </a>
            {" | "}
            Powered by PlantVillage Dataset
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
