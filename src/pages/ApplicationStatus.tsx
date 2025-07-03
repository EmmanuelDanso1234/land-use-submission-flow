
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ApplicationStatus = () => {
  const [submissionId, setSubmissionId] = useState("");
  const [email, setEmail] = useState("");
  const [statusData, setStatusData] = useState<any>(null);

  // Mock status data for demonstration
  const mockStatuses = {
    "SUB-2024-001": {
      id: "SUB-2024-001",
      permitType: "Commercial",
      applicantName: "John Smith",
      propertyAddress: "123 Business Ave, City, State 12345",
      submittedDate: "2024-01-15",
      status: "Under Review",
      currentStep: 2,
      estimatedCompletion: "2024-02-02",
      documents: [
        { name: "EPA Form XYZ", status: "approved", reviewDate: "2024-01-18" },
        { name: "Site Plan", status: "approved", reviewDate: "2024-01-18" },
        { name: "Traffic Impact Study", status: "under_review", reviewDate: null },
        { name: "Fire Safety Certificate", status: "corrections_needed", reviewDate: "2024-01-20", note: "Certificate expired. Please submit 2024 revision." },
        { name: "Parking Analysis", status: "pending", reviewDate: null }
      ],
      reviewNotes: [
        { date: "2024-01-18", note: "Initial document review completed for EPA Form and Site Plan." },
        { date: "2024-01-20", note: "Fire Safety Certificate requires update - expired version submitted." }
      ]
    }
  };

  const handleStatusCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mockStatuses[submissionId as keyof typeof mockStatuses]) {
      setStatusData(mockStatuses[submissionId as keyof typeof mockStatuses]);
    } else {
      setStatusData({ error: "Submission not found. Please check your submission ID and email address." });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "corrections_needed": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "under_review": return <Clock className="w-4 h-4 text-blue-500" />;
      case "corrections_needed": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "pending": return <FileText className="w-4 h-4 text-gray-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const steps = [
    { title: "Received", description: "Documents submitted successfully" },
    { title: "Under Review", description: "Administrative review in progress" },
    { title: "Corrections Needed", description: "Address any document issues" },
    { title: "Permit Ready for Pickup", description: "Review complete, permit available" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-blue-200 hover:text-white mb-2 inline-block">← Back to Portal</Link>
          <h1 className="text-3xl font-bold">Check Application Status</h1>
          <p className="text-blue-100">Track your document review progress</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Check Form */}
        {!statusData && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Check Your Status</CardTitle>
              <CardDescription>
                Enter your submission ID and email address to view your application status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStatusCheck} className="space-y-4">
                <div>
                  <Label htmlFor="submissionId">Submission ID</Label>
                  <Input
                    id="submissionId"
                    placeholder="e.g., SUB-2024-001"
                    value={submissionId}
                    onChange={(e) => setSubmissionId(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Check Status
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Demo:</strong> Try submission ID "SUB-2024-001" with any email address to see a sample status.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Results */}
        {statusData && !statusData.error && (
          <div className="space-y-6">
            {/* Application Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Application #{statusData.id}</CardTitle>
                    <CardDescription>{statusData.permitType} Development Permit</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {statusData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Applicant</p>
                    <p className="font-medium">{statusData.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Address</p>
                    <p className="font-medium">{statusData.propertyAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submitted</p>
                    <p className="font-medium">{new Date(statusData.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Completion</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(statusData.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Review Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < statusData.currentStep ? 'bg-green-500 text-white' :
                        index === statusData.currentStep ? 'bg-blue-500 text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {index < statusData.currentStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Document Status */}
            <Card>
              <CardHeader>
                <CardTitle>Document Review Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusData.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          {doc.reviewDate && (
                            <p className="text-xs text-gray-500">
                              Reviewed: {new Date(doc.reviewDate).toLocaleDateString()}
                            </p>
                          )}
                          {doc.note && (
                            <p className="text-sm text-red-600 mt-1">{doc.note}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Notes */}
            {statusData.reviewNotes && statusData.reviewNotes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statusData.reviewNotes.map((note: any, index: number) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button onClick={() => setStatusData(null)} variant="outline">
                Check Another Application
              </Button>
            </div>
          </div>
        )}

        {/* Error State */}
        {statusData && statusData.error && (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto" />
                <p className="text-red-600">{statusData.error}</p>
                <Button onClick={() => setStatusData(null)} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
