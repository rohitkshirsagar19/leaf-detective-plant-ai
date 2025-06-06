
import { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { predictDisease } from '../services/api';

interface ImageUploadProps {
  onPredict: (result: any) => void;
}

const ImageUpload = ({ onPredict }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      toast.error('Please upload a JPG or PNG image.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.');
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image.');
      return;
    }
    
    setLoading(true);
    try {
      const result = await predictDisease(file);
      // Parse confidence (handle string percentage or float)
      const confidence = typeof result.confidence === 'string'
        ? parseFloat(result.confidence.replace('%', '')) / 100
        : result.confidence;
      
      onPredict({
        disease: result.disease,
        confidence: (confidence * 100).toFixed(2) + '%',
        suggestion: result.suggestion
      });
      toast.success('Prediction successful!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
        <Upload className="mr-2" size={24} />
        Upload Leaf Image
      </h3>
      
      <Form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-green-300 hover:border-green-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            className="hidden"
          />
          
          {preview ? (
            <div className="space-y-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-green-600">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-4">
              <ImageIcon size={48} className="mx-auto text-green-400" />
              <div>
                <p className="text-lg font-medium text-green-700">
                  Drop your leaf image here
                </p>
                <p className="text-sm text-green-600">
                  or click to browse (JPG/PNG, max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-green-600 border-green-600 hover:bg-green-700 py-3 text-lg font-medium rounded-lg"
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="mr-2" size={20} />
              Predict Disease
            </>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default ImageUpload;
