
import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, AlertTriangle, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubmitDocuments = () => {
  const { permitType } = useParams();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({});
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    projectDescription: "",
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

  const permitRequirements = {
    residential: [
      { name: "Site Plan", required: true, description: "Detailed site layout and boundaries" },
      { name: "Environmental Impact Assessment", required: true, description: "EPA-approved environmental study" },
      { name: "Zoning Compliance Form", required: true, description: "Current zoning verification document" },
      { name: "Utility Connection Plan", required: true, description: "Water, sewer, and electrical connection plans" }
    ],
    commercial: [
      { name: "EPA Form XYZ", required: true, description: "Environmental Protection Agency compliance form" },
      { name: "Site Plan", required: true, description: "Detailed commercial site layout" },
      { name: "Traffic Impact Study", required: true, description: "Professional traffic analysis report" },
      { name: "Fire Safety Certificate", required: true, description: "Fire department pre-approval certificate" },
      { name: "Parking Analysis", required: true, description: "Parking capacity and compliance study" }
    ],
    agricultural: [
      { name: "Agricultural Use Plan", required: true, description: "Detailed farming operation plan" },
      { name: "Water Rights Documentation", required: true, description: "Legal water usage rights verification" },
      { name: "Soil Analysis Report", required: true, description: "Professional soil composition study" },
      { name: "Environmental Compliance Form", required: true, description: "Agricultural environmental impact form" }
    ]
  };

  const currentRequirements = permitRequirements[permitType as keyof typeof permitRequirements] || [];
  const processingFee = permitType === 'commercial' ? 350 : permitType === 'residential' ? 250 : 200;

  const handleFileUpload = (documentName: string, file: File) => {
    // Validate file type and size
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF files only.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 25 * 1024 * 1024) { // 25MB limit
      toast({
        title: "File too large",
        description: "Please upload files smaller than 25MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFiles(prev => ({
      ...prev,
      [documentName]: file
    }));

    toast({
      title: "File uploaded successfully",
      description: `${documentName} has been uploaded.`
    });
  };

  const removeFile = (documentName: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[documentName];
      return newFiles;
    });

    // Clear the file input
    if (fileInputRefs.current[documentName]) {
      fileInputRefs.current[documentName]!.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if all required documents are uploaded
    const missingDocs = currentRequirements
      .filter(req => req.required)
      .filter(req => !uploadedFiles[req.name]);

    if (missingDocs.length > 0) {
      toast({
        title: "Missing required documents",
        description: `Please upload: ${missingDocs.map(doc => doc.name).join(', ')}`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms and conditions required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Documents submitted successfully",
        description: "Your submission is being processed. You'll receive confirmation within 24 hours."
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const completedDocuments = currentRequirements.filter(req => uploadedFiles[req.name]).length;
  const totalRequired = currentRequirements.filter(req => req.required).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-blue-200 hover:text-white mb-2 inline-block">← Back to Portal</Link>
          <h1 className="text-3xl font-bold">Submit Pre-Approval Documents</h1>
          <p className="text-blue-100 capitalize">{permitType} Development Permit</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Document Upload Progress</span>
              <span className="text-sm text-gray-600">{completedDocuments} of {totalRequired} required</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(completedDocuments / totalRequired) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Document Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Upload all required documents in PDF format (max 25MB each)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentRequirements.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                          {doc.required && <span className="text-red-500 text-sm">*Required</span>}
                          {uploadedFiles[doc.name] && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                      </div>
                    </div>

                    {uploadedFiles[doc.name] ? (
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded border">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700">{uploadedFiles[doc.name].name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(doc.name)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF only, max 25MB</p>
                        <Input
                          ref={el => fileInputRefs.current[doc.name] = el}
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.name, file);
                          }}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Applicant Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.applicantName}
                        onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Property Address *</Label>
                      <Input
                        id="address"
                        value={formData.propertyAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.projectDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary & Payment Section */}
          <div className="space-y-6">
            {/* Document Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentRequirements.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {uploadedFiles[doc.name] ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      )}
                      <span className={`text-sm ${uploadedFiles[doc.name] ? 'text-green-700' : 'text-gray-600'}`}>
                        {doc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fee Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Processing Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span className="font-semibold">${processingFee}</span>
                  </div>
                  <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    This fee covers administrative review of your documents. 
                    Permit approval is subject to document compliance.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                      I understand that this submission is for document review only and does not guarantee permit approval. 
                      I agree to the terms and conditions of the review process.
                    </Label>
                  </div>
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || completedDocuments < totalRequired || !formData.agreeToTerms}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Processing..." : `Submit Documents & Pay $${processingFee}`}
                  </Button>

                  {completedDocuments < totalRequired && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        ⚠️ Your submission is incomplete. Please upload all required documents before proceeding.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitDocuments;
