
import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ImageUpload from '../components/ImageUpload';
import PredictionResult from '../components/PredictionResult';
import { checkApiHealth } from '../services/api';

const Index = () => {
  const [apiHealthy, setApiHealthy] = useState<boolean | null>(null);
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await checkApiHealth();
        setApiHealthy(true);
      } catch (error) {
        setApiHealthy(false);
        toast.error('Backend API is unavailable. Please try again later.');
      }
    };
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Container className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🌱 Plant Disease Detector
          </h1>
          <p className="text-lg text-green-700 mb-6">
            Upload an image of a tomato or potato leaf to diagnose potential diseases using AI
          </p>
        </div>

        {apiHealthy === false && (
          <Alert variant="danger" className="mb-6 rounded-lg border-0 shadow-md">
            <div className="flex items-center">
              <span className="mr-3">⚠️</span>
              <div>
                <strong>Backend API Unavailable</strong>
                <p className="mb-0 mt-1">The prediction service is currently offline. Please try again later.</p>
              </div>
            </div>
          </Alert>
        )}

        {apiHealthy === null && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-green-700">Checking API status...</p>
          </div>
        )}

        {apiHealthy && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ImageUpload onPredict={setPrediction} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <PredictionResult result={prediction} />
            </div>
          </div>
        )}

        <div className="text-center mt-12 text-green-600">
          <p className="text-sm">
            Powered by AI • Trained on PlantVillage Dataset • Built for Agricultural Excellence
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Index;
