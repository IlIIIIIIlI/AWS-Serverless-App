import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Amplify } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { generateClient } from "aws-amplify/api";

// Import your GraphQL operations
import { listDocuments } from "./graphql/queries";
import { createDocument } from "./graphql/mutations";

// Configure Amplify
Amplify.configure(awsconfig);
const client = generateClient();

const App = ({ signOut }) => {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState({ name: "", sender: "" });

  async function fetchDocs() {
    try {
      const docData = await client.graphql({
        query: listDocuments,
      });
      setDocuments(docData.data.listDocuments.items);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  }

  async function handleCreateDoc() {
    try {
      if (!newDoc.name || !newDoc.sender) return;
      await client.graphql({
        query: createDocument,
        variables: { input: newDoc },
      });
      setNewDoc({ name: "", sender: "" }); // Reset form
      // 注意：这里不自动调用fetchDocs，让用户选择何时更新列表
    } catch (err) {
      console.error("Error creating document:", err);
    }
  }

  // Update form state
  function updateFormState(key, value) {
    setNewDoc({ ...newDoc, [key]: value });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          onChange={(e) => updateFormState("name", e.target.value)}
          placeholder="Document Name"
          value={newDoc.name}
        />
        <input
          onChange={(e) => updateFormState("sender", e.target.value)}
          placeholder="Sender"
          value={newDoc.sender}
        />
        <Button onClick={handleCreateDoc}>Create Document</Button>
        <Button onClick={fetchDocs}>List Documents</Button>
        <Button onClick={signOut}>Log Out</Button>
        <Heading level={6}>Documents</Heading>
        {documents.map((doc, index) => (
          <div key={doc.id || index}>
            <p>{doc.name}</p>
            <p>{doc.sender}</p>
          </div>
        ))}
      </header>
    </div>
  );
};

export default withAuthenticator(App);
