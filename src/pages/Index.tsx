
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const permitTypes = [
    {
      type: "Residential",
      description: "Single-family homes, duplexes, residential developments",
      documents: ["Site Plan", "Environmental Impact Assessment", "Zoning Compliance Form", "Utility Connection Plan"]
    },
    {
      type: "Commercial",
      description: "Retail, office buildings, industrial facilities",
      documents: ["EPA Form XYZ", "Site Plan", "Traffic Impact Study", "Fire Safety Certificate", "Parking Analysis"]
    },
    {
      type: "Agricultural",
      description: "Farming operations, agricultural structures",
      documents: ["Agricultural Use Plan", "Water Rights Documentation", "Soil Analysis Report", "Environmental Compliance Form"]
    }
  ];

  const processSteps = [
    {
      icon: FileText,
      title: "Select Permit Type",
      description: "Choose your permit category to see required documents"
    },
    {
      icon: Upload,
      title: "Submit Documents",
      description: "Upload all required pre-approval documents"
    },
    {
      icon: Clock,
      title: "Review Process",
      description: "Documents reviewed within 14 business days"
    },
    {
      icon: CheckCircle,
      title: "Next Steps",
      description: "Receive notification about permit readiness"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Land Use Document Submission Portal</h1>
          <p className="text-xl text-blue-100">Start Your Permit Journey: Submit Required Documents Online</p>
        </div>
      </header>

      {/* Important Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
        <div className="container mx-auto px-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> This portal is for submitting pre-approval documents only. 
                Permit issuance depends on document compliance and meeting all regulatory criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Process Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Document Submission Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Permit Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Select Your Permit Type</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {permitTypes.map((permit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">{permit.type} Development</CardTitle>
                  <CardDescription>{permit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-700">Required Documents:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {permit.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={`/submit/${permit.type.toLowerCase()}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Submit {permit.type} Documents
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-700">Q: Is my permit guaranteed after document submission?</h3>
              <p className="text-gray-600">A: No. This portal reviews your documents for compliance. Permit issuance depends on meeting all regulatory criteria and successful document review.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-700">Q: What is the document processing fee?</h3>
              <p className="text-gray-600">A: The processing fee covers administrative review of your submitted documents. This fee does not guarantee permit approval.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-700">Q: How long does document review take?</h3>
              <p className="text-gray-600">A: Document review typically takes 14 business days. You'll receive notification about next steps for permit issuance upon completion.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-700">Q: What file formats are accepted?</h3>
              <p className="text-gray-600">A: We accept PDF files only, with a maximum size of 25MB per document. Ensure all documents are clear and legible.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Land Use Document Submission Portal. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">For technical assistance, contact support@landuse.gov</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
