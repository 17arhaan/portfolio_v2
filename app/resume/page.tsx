'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>My Resume</CardTitle>
          <CardDescription>View or download my resume in PDF format</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open('/Arhaan_Resume.pdf', '_blank')}
            >
              <Eye className="h-4 w-4" />
              View Resume
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Arhaan_Resume.pdf';
                link.download = 'Arhaan_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 