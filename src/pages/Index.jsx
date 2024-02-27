import React, { useState } from "react";
import { Box, Button, Center, Container, FormControl, FormLabel, Input, VStack, Text, Textarea, useToast } from "@chakra-ui/react";
import { FaPaperclip, FaRobot, FaArrowRight } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleSendMessage = () => {
    const newMessage = { text: message, sender: "user" };
    setMessages([...messages, newMessage]);
    // Replace this comment with your code to connect to Rasa and send the message.
    // For example, you might use Fetch API or Axios to make an HTTP request to your Rasa endpoint.
    // After sending the message, you can handle the bot's response and update the messages state accordingly.
    setMessage(""); // reset current message input
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleUploadFile = () => {
    // TODO: implement file upload logic to the server or Rasa
    toast({
      title: "Document uploaded.",
      description: "We've received your document and will process it shortly.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFile(null); // reset file after upload
  };

  return (
    <Center h="100vh" bg="gray.50">
      <Container>
        <VStack spacing={4}>
          <Box p={5} shadow="md" borderWidth="1px" bg="white" borderRadius="md" w="100%" h="500px" overflowY="auto">
            <VStack spacing={4}>
              {messages.map((msg, index) => (
                <Box key={index} alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}>
                  <Text fontSize="sm" color={msg.sender === "user" ? "blue.500" : "green.500"}>
                    {msg.sender === "user" ? "You" : "Bot"}
                  </Text>
                  <Text p={2} bg={msg.sender === "user" ? "blue.100" : "green.100"} borderRadius="md">
                    {msg.text}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
          <FormControl>
            <FormLabel htmlFor="message">Your Message</FormLabel>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />
          </FormControl>
          {/* Document upload feature has been removed from the main UI and will be handled as part of the conversation flow */}
          <Button rightIcon={<FaArrowRight />} colorScheme="blue" onClick={handleSendMessage} disabled={!message.trim()}>
            Send Message
          </Button>
        </VStack>
      </Container>
    </Center>
  );
};

export default Index;
