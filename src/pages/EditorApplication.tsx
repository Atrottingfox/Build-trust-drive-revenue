import React from 'react';
import { Container } from '../components/ui/Container';

export default function EditorApplication() {
  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <iframe 
            src="https://authorityengine.notion.site/ebd/1d70b2eb6dfb80569a89c547c12411fa" 
            width="100%" 
            height="800" 
            className="rounded-xl bg-white"
            style={{ border: 'none' }}
            title="Editor Application Form"
            allowFullScreen
          />
        </div>
      </Container>
    </div>
  );
}