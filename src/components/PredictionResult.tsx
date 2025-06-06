
import { Card, ProgressBar } from 'react-bootstrap';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface PredictionResultProps {
  result?: {
    disease: string;
    confidence: string;
    suggestion: string;
  } | null;
}

const PredictionResult = ({ result }: PredictionResultProps) => {
  if (!result) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔬</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Ready for Analysis
        </h3>
        <p className="text-gray-500">
          Upload a leaf image to get started with disease detection
        </p>
      </div>
    );
  }

  const confidenceNum = parseFloat(result.confidence.replace('%', ''));
  const isHealthy = result.disease.toLowerCase().includes('healthy');
  const confidenceColor = confidenceNum > 70 ? 'success' : confidenceNum > 40 ? 'warning' : 'danger';

  return (
    <div>
      <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <AlertTriangle className="mr-2" size={24} />
        Diagnosis Results
      </h3>

      <Card className="border-0 shadow-sm">
        <Card.Body className="space-y-4">
          <div className="flex items-start space-x-3">
            {isHealthy ? (
              <CheckCircle className="text-green-500 mt-1" size={24} />
            ) : (
              <AlertTriangle className="text-orange-500 mt-1" size={24} />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">
                {result.disease}
              </h4>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-600">Confidence</span>
                  <span className="text-sm font-bold text-gray-800">{result.confidence}</span>
                </div>
                <ProgressBar 
                  now={confidenceNum} 
                  variant={confidenceColor}
                  className="h-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
            <div className="flex items-start space-x-3">
              <Lightbulb className="text-blue-600 mt-1" size={20} />
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Treatment Recommendation</h5>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {result.suggestion}
                </p>
              </div>
            </div>
          </div>

          {!isHealthy && (
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-yellow-800 text-xs">
                <strong>Disclaimer:</strong> This AI diagnosis is for guidance only. 
                For critical decisions, consult with a local agricultural expert or extension service.
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PredictionResult;
