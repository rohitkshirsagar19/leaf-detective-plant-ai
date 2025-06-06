
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Leaf, Brain, Shield, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="text-blue-500" size={40} />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning model trained on thousands of plant images for accurate disease identification."
    },
    {
      icon: <Leaf className="text-green-500" size={40} />,
      title: "Crop Support", 
      description: "Specialized detection for tomato and potato crops, covering 12+ disease types and healthy states."
    },
    {
      icon: <Shield className="text-purple-500" size={40} />,
      title: "Treatment Guidance",
      description: "Receive specific treatment recommendations and preventive measures for detected diseases."
    },
    {
      icon: <Users className="text-orange-500" size={40} />,
      title: "Farmer Friendly",
      description: "Designed for easy use by farmers, gardeners, and agricultural professionals in the field."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Container className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            About Plant Disease Detector
          </h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Empowering farmers and agricultural professionals with AI-driven plant disease detection 
            technology to protect crops and improve harvest yields.
          </p>
        </div>

        <Row className="mb-12">
          {features.map((feature, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm hover:shadow-md transition-shadow">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">{feature.icon}</div>
                  <h5 className="font-semibold text-gray-800 mb-3">{feature.title}</h5>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-2 mt-1">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">Upload Image</h5>
                      <p className="text-gray-600">Take or upload a clear photo of the affected leaf using your device.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-2 mt-1">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">AI Analysis</h5>
                      <p className="text-gray-600">Our trained model analyzes the image and identifies potential diseases.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-full p-2 mt-1">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800">Get Results</h5>
                      <p className="text-gray-600">Receive diagnosis, confidence score, and treatment recommendations.</p>
                    </div>
                  </div>
                </div>

                <hr className="my-6" />

                <h3 className="text-2xl font-bold text-green-800 mb-4">Dataset & Training</h3>
                <p className="text-gray-600 mb-4">
                  Our model is trained on the renowned <strong>PlantVillage Dataset</strong>, containing over 50,000 
                  images of healthy and diseased plant leaves. The dataset covers:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Tomato diseases:</strong> Early blight, Late blight, Leaf mold, Septoria leaf spot, 
                      Spider mites, Target spot, Yellow leaf curl virus, Mosaic virus, and Bacterial spot</li>
                  <li>• <strong>Potato diseases:</strong> Early blight, Late blight</li>
                  <li>• <strong>Healthy states:</strong> For both tomato and potato plants</li>
                </ul>

                <hr className="my-6" />

                <h3 className="text-2xl font-bold text-green-800 mb-4">Important Limitations</h3>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <ul className="text-yellow-800 space-y-2 mb-0">
                    <li>• This tool is designed specifically for tomato and potato leaves</li>
                    <li>• Results should be used as guidance only, not definitive diagnosis</li>
                    <li>• For critical agricultural decisions, consult with local extension services</li>
                    <li>• Image quality and lighting conditions can affect accuracy</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
